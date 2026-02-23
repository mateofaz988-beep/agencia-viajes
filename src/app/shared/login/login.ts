import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // ✅ Inyección de dependencias
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // ✅ Propiedades del formulario
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  // ✅ Estados de UI
  loading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  // ✅ Validaciones simples
  get isEmailValid(): boolean {
    return this.email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  get isPasswordValid(): boolean {
    return this.password.length === 0 || this.password.length >= 6;
  }

  get formIsValid(): boolean {
    return this.email.trim().length > 0 &&
      this.password.length >= 6 &&
      this.isEmailValid;
  }

  // ✅ Método principal de login - SIN async/await
  iniciarsecion(): void {
    // 1. Validación previa
    if (!this.formIsValid) {
      this.errorMessage = this.getValidationError();
      this.shakeForm();
      return;
    }

    // 2. Resetear estados
    this.loading = true;
    this.errorMessage = '';

    // 3. Ejecutar login con tu AuthService
    // ✅ SIN async/await - solo subscribe
    this.authService.login(this.email.trim(), this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.handleLoginSuccess();
        } else {
          this.handleLoginFailed();
        }
      },
      error: (error: any) => {
        this.handleLoginError(error);
      }
      // ✅ No necesitamos 'complete' porque ya manejamos loading en cada caso
    });
  }

  // ✅ Handler para respuesta exitosa - AHORA SÍ resetea loading
  private handleLoginSuccess(): void {
    // Feedback visual
    this.showNotification('¡Bienvenido! 🎉', 'success');

    // Obtener datos del usuario
    const usuario = this.authService.getUsuarioActual();

    // Persistencia según preferencia
    this.persistSession(usuario);

    // ✅ IMPORTANTE: Resetear loading ANTES de redirigir
    this.loading = false;

    // ✅ Redirección por rol - SIN setTimeout
    this.redirectByRole(usuario?.rol);
  }

  // ✅ Handler para credenciales incorrectas
  private handleLoginFailed(): void {
    this.errorMessage = 'Credenciales incorrectas. Verifica tu email y contraseña.';
    this.password = '';
    this.loading = false; // ✅ Resetear loading
    this.shakeForm();
  }

  // ✅ Handler para errores de servidor/red
  private handleLoginError(error: any): void {
    console.error('Login error:', error);

    if (error?.status === 0) {
      this.errorMessage = 'No hay conexión con el servidor. Verifica tu internet.';
    } else if (error?.status === 401) {
      this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
    } else if (error?.status === 403) {
      this.errorMessage = 'Cuenta no verificada. Revisa tu correo.';
    } else {
      this.errorMessage = 'Error al iniciar sesión. Intenta más tarde.';
    }

    this.loading = false; // ✅ Resetear loading
    this.shakeForm();
  }

  // ✅ Persistencia de sesión
  private persistSession(usuario: any): void {
    const userData = {
      email: usuario?.email || this.email,
      rol: usuario?.rol,
      lastLogin: new Date().toISOString()
    };

    if (this.rememberMe) {
      localStorage.setItem('usuario', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('usuario', JSON.stringify(userData));
    }
  }

  // ✅ Redirección por roles - SIN setTimeout
  private redirectByRole(rol?: string): void {
    if (rol === 'ADMIN') {
      this.router.navigateByUrl('/admin', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/gestion', { replaceUrl: true });
    }
  }

  // ✅ Toggle visibilidad de contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ✅ Mensajes de validación
  private getValidationError(): string {
    if (!this.email.trim()) return 'El correo es obligatorio';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) return 'Ingresa un correo válido';
    if (this.password.length < 6) return 'Mínimo 6 caracteres';
    return '';
  }

  // ✅ Notificación personalizada
  private showNotification(message: string, type: 'success' | 'error' = 'error'): void {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg transform transition-all duration-300 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${
            type === 'success' 
              ? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' 
              : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          }" />
        </svg>
        <span class="font-medium">${message}</span>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // ✅ Efecto visual de "shake" para errores
  private shakeForm(): void {
    const form = document.querySelector('form');
    if (form) {
      form.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(-10px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0)' }
      ], { duration: 300, easing: 'ease-in-out' });
    }
  }

  // ✅ Cerrar sesión (para usar en navbar)
  cerrarSesion(): void {
    this.authService.logout();
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/login'], { replaceUrl: true });
    this.showNotification('Sesión cerrada correctamente', 'success');
  }
}