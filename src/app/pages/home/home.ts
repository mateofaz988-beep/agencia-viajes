import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroComponent } from '../../shared/hero/hero';
import { PortafolioComponent } from '../../shared/portafolio/portafolio'; // 👈 Nombre correcto

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    HeroComponent, 
    PortafolioComponent  // 👈 Debe coincidir con la clase exportada
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  
  // Viajes Destacados
  viajesDestacados = [
    {
      nombre: 'Maldivas Paradise',
      descripcion: 'Disfruta de aguas cristalinas y resorts de lujo en el corazón del océano.',
      precio: 1200,
      imagen: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
      categoria: 'Playa',
      duracion: '7 días',
      rating: 4.9
    },
    {
      nombre: 'Aventura en los Alpes',
      descripcion: 'Esquí y senderismo en los paisajes nevados más impresionantes de Europa.',
      precio: 850,
      imagen: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=500&q=80',
      categoria: 'Montaña',
      duracion: '5 días',
      rating: 4.8
    },
    {
      nombre: 'Tokio Moderno',
      descripcion: 'Descubre la mezcla perfecta entre tradición milenaria y tecnología futurista.',
      precio: 1500,
      imagen: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=500&q=80',
      categoria: 'Ciudad',
      duracion: '10 días',
      rating: 4.9
    }
  ];

  // Servicios de la Agencia
  servicios = [
    {
      icono: '✈️',
      titulo: 'Vuelos Internacionales',
      descripcion: 'Conexiones con las mejores aerolíneas del mundo al mejor precio.'
    },
    {
      icono: '🏨',
      titulo: 'Hoteles de Lujo',
      descripcion: 'Alianzas con hoteles 5 estrellas para tu máximo confort.'
    },
    {
      icono: '🎯',
      titulo: 'Tours Guiados',
      descripcion: 'Experiencias únicas con guías locales expertos.'
    },
    {
      icono: '🛡️',
      titulo: 'Seguro de Viaje',
      descripcion: 'Protección completa para que viajes sin preocupaciones.'
    }
  ];

  // Estadísticas
  estadisticas = [
    { numero: '+150', etiqueta: 'Destinos' },
    { numero: '+5000', etiqueta: 'Clientes Felices' },
    { numero: '+10', etiqueta: 'Años de Experiencia' },
    { numero: '24/7', etiqueta: 'Soporte' }
  ];
}