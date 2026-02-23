import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioServicio } from '../../services/usuario-servicio/usuario-servicio';
import { Usuario } from '../../models/usuario/usuario';

@Component({
  selector: 'app-formulario-cuenta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-cuenta.html',
  styleUrl: './formulario-cuenta.css',
})
export class FormularioCuenta {

  // ✅ Inyección moderna con inject()
  private readonly fb = inject(FormBuilder);
  private readonly usuarioServicio = inject(UsuarioServicio);
  private readonly router = inject(Router);

  // ✅ Estados de UI
  registroExitoso = false;
  loading = false;
  errorMessage = '';
  showPassword = false;

  // ✅ Reglas de validación
  private readonly reglaEmail = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  private readonly reglaPassword = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';

  // ✅ Formulario con más campos (nombre, términos)
  formCuenta = this.fb.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(this.reglaEmail)]],
      password: ['', [Validators.required, Validators.pattern(this.reglaPassword)]],
      repeatPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    },
    { validators: this.validarClaves }
  );

  // ✅ Validador personalizado: contraseñas coinciden
  validarClaves(control: AbstractControl): ValidationErrors | null {
    const clave1 = control.get('password')?.value;
    const clave2 = control.get('repeatPassword')?.value;
    return clave1 === clave2 ? null : { noCoinciden: true };
  }

  // ✅ Toggle visibilidad de contraseña
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ✅ Calcula fuerza de contraseña (para UI)
  get passwordStrength(): 'weak' | 'medium' | 'strong' | null {
    const password = this.formCuenta.get('password')?.value || '';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) return 'strong';
    return 'medium';
  }

  // ✅ Método de registro mejorado
  registrar(): void {
    console.log("Entró al método");

    // 1. Marcar todos los campos como tocados para mostrar validaciones
    if (this.formCuenta.invalid) {
      console.log("Formulario inválido");
      this.formCuenta.markAllAsTouched();
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.shakeForm();
      return;
    }

    // 2. Resetear estados
    this.loading = true;
    this.errorMessage = '';

    // 3. Crear usuario con todos los datos
    const nuevoUsuario: Usuario = {

      email: this.formCuenta.value.email ?? '',
      password: this.formCuenta.value.password ?? '',
      rol: 'CLIENTE',
  

    };

    console.log('Usuario a registrar:', nuevoUsuario);

    // 4. Llamar al servicio
    this.usuarioServicio.postUsuario(nuevoUsuario)
      .subscribe({
        next: (resp) => {
          console.log('Guardado en Firebase:', resp);
          
          // 5. Éxito
          this.registroExitoso = true;
          this.formCuenta.reset();
          
          // 6. Redirigir al login después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/login'], { 
              queryParams: { registered: 'true' },
              replaceUrl: true
            });
          }, 3000);
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          
          // 7. Manejo de errores específico
          if (err?.code === 'auth/email-already-in-use') {
            this.errorMessage = 'Este correo ya está registrado. Intenta iniciar sesión.';
          } else if (err?.code === 'auth/invalid-email') {
            this.errorMessage = 'El correo no es válido.';
          } else if (err?.code === 'auth/weak-password') {
            this.errorMessage = 'La contraseña es muy débil.';
          } else {
            this.errorMessage = 'Error al registrar. Intenta más tarde.';
          }
          
          this.shakeForm();
          this.loading = false;
        },
        complete: () => {
          if (!this.registroExitoso) {
            this.loading = false;
          }
        }
      });
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

  // ✅ Helper para obtener errores del formulario
  getCampoError(campo: string): string {
    const control = this.formCuenta.get(campo);
    if (!control?.errors || !control?.touched) return '';
    
    if (control.errors['required']) return 'Este campo es obligatorio';
    if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
    if (control.errors['pattern']) {
      if (campo === 'email') return 'Ingresa un correo válido';
      if (campo === 'password') return 'Mínimo 8 caracteres, 1 letra y 1 número';
    }
    
    return '';
  }

  // ✅ Verificar si hay error en un campo
  tieneError(campo: string): boolean {
    const control = this.formCuenta.get(campo);
    return !!(control?.invalid && control?.touched);
  }
}