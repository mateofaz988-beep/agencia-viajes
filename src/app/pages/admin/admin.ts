import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth-service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private authService = inject(AuthService); 
  private router = inject(Router); usuario = this.authService.getUsuarioActual(); 
  cerrarSesion() { this.authService.logout(); this.router.navigate(['/login']); } }

