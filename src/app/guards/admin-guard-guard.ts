import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

export const adminGuard: CanMatchFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔒 Si no está autenticado → login
  if (!authService.estaAutenticado()) {
    return router.createUrlTree(['/login']);
  }

  // 🚫 Si es admin → redirigir al panel admin
  if (authService.esAdmin()) {
    return router.createUrlTree(['/admin']);
  }

  // ✅ Si es cliente → permitir acceso
  return true;
};