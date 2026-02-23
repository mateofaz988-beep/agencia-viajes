import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth-service';

export const sesionActivaGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.getUsuarioActual();

  if (usuario) {
    return true; 
  }

  return router.createUrlTree(['/login']); 
};