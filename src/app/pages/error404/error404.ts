import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './error404.html',
  styleUrl: './error404.css'
})
export class Error404Component {
  // Lógica adicional si la necesitas
}