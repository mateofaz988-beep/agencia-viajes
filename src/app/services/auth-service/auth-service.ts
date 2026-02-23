import { Injectable, inject, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UsuarioServicio } from '../usuario-servicio/usuario-servicio';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private servicioUsuario = inject(UsuarioServicio);

  // Signals para estado reactivo
  sesioniniciada = signal<boolean>(localStorage.getItem('sesioniniciada') === 'true');
  rolActual = signal<string | null>(localStorage.getItem('rol'));

  // ✅ Login con manejo de errores
  login(email: string, password: string): Observable<boolean> {
    return this.servicioUsuario.getUsuarios().pipe(
      map((usuarios: any[]) => {
        const usuarioCoincide = usuarios.find(
          u => u.email === email && u.password === password
        );

        if (usuarioCoincide) {
          localStorage.setItem('sesioniniciada', 'true');
          localStorage.setItem('usuario', JSON.stringify(usuarioCoincide));
          localStorage.setItem('rol', usuarioCoincide.rol);
          
          this.rolActual.set(usuarioCoincide.rol);
          this.sesioniniciada.set(true);
          
          console.log('✅ Login exitoso:', usuarioCoincide.email);
          return true;
        }

        console.log('❌ Credenciales incorrectas');
        return false;
      }),
      // ✅ CRÍTICO: Si hay error, retornar false en lugar de lanzar error
      catchError((error: any) => {
        console.error('❌ Error en login:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('sesioniniciada');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    
    this.rolActual.set(null);
    this.sesioniniciada.set(false);
    
    console.log('👋 Sesión cerrada');
  }

  getUsuarioActual(): any {
    const usuarioStr = localStorage.getItem('usuario');
    return usuarioStr ? JSON.parse(usuarioStr) : null;
  }

  esAdmin(): boolean {
    return this.rolActual()?.toUpperCase() === 'ADMIN';
  }

  estaAutenticado(): boolean {
    return this.sesioniniciada();
  }
}