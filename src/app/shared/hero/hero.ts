import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {
  
  // ✅ @Input() permite que el padre personalice estos valores
  @Input() titulo: string = 'Descubre el Mundo con';
  @Input() resaltado: string = 'AIR593';
  @Input() imagenUrl: string = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80';
  @Input() subtitulo?: string;  // 👈 Opcional: texto adicional
  @Input() ctaText?: string = 'Empezar Aventura';  // 👈 Opcional: texto del botón
  @Input() ctaLink?: string = '/catalogo';  // 👈 Opcional: enlace del botón
  
  // Imágenes de respaldo
  readonly imagenes: string[] = [
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80',
    'https://baobabnature.com/wp-content/uploads/2023/06/grupo-1.jpg',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=207'
  ];
}