import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

export const clienteSoloLoginGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuarioActual();

  if (usuario && usuario.rol === 'CLIENTE') {
    router.navigate(['/']); // 👈 tu home real
    return false;
  }

  return true;
};