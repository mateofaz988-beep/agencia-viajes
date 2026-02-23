import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importaciones cruciales:
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // Agrégalos aquí para que Angular los reconozca
  imports: [RouterOutlet, NavbarComponent, FooterComponent], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'agencia-viajes';
}