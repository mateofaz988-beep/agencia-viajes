import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';  // ✅ Agrega RouterLink

interface DestinoEspecial {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  precio: number;
  duracion: string;
  rating: number;
  tags: string[];
  badge?: 'Popular' | 'Nuevo' | 'Oferta';
  incluye: string[];
}

interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  count: number;
}

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],  // ✅ Agrega RouterLink
  templateUrl: './portafolio.html',
  styleUrl: './portafolio.css'
})
export class PortafolioComponent {
  
  private readonly router = inject(Router);
  
  // Search & Filters
  searchQuery: string = '';
  selectedCategory: string = 'all';
  maxPrice: number = 5000;
  sortBy: string = 'popular';
  
  // State
  loadingMore: boolean = false;
  
  // Categories config
  readonly categorias: Categoria[] = [
    { id: 'all', nombre: 'Todos', icono: '🌍', count: 24 },
    { id: 'playa', nombre: 'Playas', icono: '🏖️', count: 8 },
    { id: 'montana', nombre: 'Montaña', icono: '🏔️', count: 6 },
    { id: 'ciudad', nombre: 'Ciudades', icono: '🏙️', count: 7 },
    { id: 'aventura', nombre: 'Aventura', icono: '🧗', count: 3 }
  ];

  // Destinos especiales (Portafolio de la agencia)
  destinosEspeciales: DestinoEspecial[] = [
    {
      id: '1',
      titulo: 'Maldivas - Paquete Premium',
      descripcion: '7 días en resort 5 estrellas con todo incluido',
      imagen: 'https://cdn.prod.website-files.com/66c59bb6ecf662630baf4355/66fdc3cfba1e583f7c709221_Consejos-para-viajar-a-Maldivas-y-disfrutar-de-verdad.jpeg',
      categoria: 'playa',
      precio: 2499,
      duracion: '7 días',
      rating: 4.9,
      tags: ['Todo Incluido', 'Luna de Miel', 'Snorkel'],
      badge: 'Popular',
      incluye: ['Vuelos', 'Hotel', 'Comidas', 'Tours']
    },
    {
      id: '2',
      titulo: 'Alpes Suizos - Aventura de Nieve',
      descripcion: '5 días de esquí en las mejores pistas de Europa',
      imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      categoria: 'montana',
      precio: 1899,
      duracion: '5 días',
      rating: 4.8,
      tags: ['Esquí', 'Senderismo', 'Vistas'],
      badge: 'Oferta',
      incluye: ['Hotel', 'Equipo', 'Clases', 'Desayuno']
    },
    {
      id: '3',
      titulo: 'Tokio - Cultura y Modernidad',
      descripcion: '10 días explorando la capital japonesa',
      imagen: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
      categoria: 'ciudad',
      precio: 2199,
      duracion: '10 días',
      rating: 4.9,
      tags: ['Templos', 'Gastronomía', 'Historia'],
      incluye: ['Vuelos', 'Hotel', 'JR Pass', 'Tour Guiado']
    },
    {
      id: '4',
      titulo: 'Patagonia - Fin del Mundo',
      descripcion: '8 días de trekking en glaciares argentinos',
      imagen: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=800&q=80',
      categoria: 'aventura',
      precio: 1699,
      duracion: '8 días',
      rating: 4.7,
      tags: ['Glaciares', 'Trekking', 'Fotografía'],
      badge: 'Nuevo',
      incluye: ['Guía', 'Equipo', 'Comidas', 'Transporte']
    },
    {
      id: '5',
      titulo: 'Santorini - Atardeceres Únicos',
      descripcion: '6 días en la isla griega más romántica',
      imagen: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      categoria: 'playa',
      precio: 1599,
      duracion: '6 días',
      rating: 4.8,
      tags: ['Romántico', 'Fotografía', 'Gastronomía'],
      incluye: ['Hotel', 'Desayuno', 'Tour en Barco']
    },
    {
      id: '6',
      titulo: 'París - Ciudad del Amor',
      descripcion: '5 días en la ciudad más romántica del mundo',
      imagen: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      categoria: 'ciudad',
      precio: 1399,
      duracion: '5 días',
      rating: 4.8,
      tags: ['Romántico', 'Arte', 'Gastronomía'],
      incluye: ['Vuelos', 'Hotel', 'Tour Eiffel', 'Museos']
    }
  ];

  // Computed
  get destinosFiltrados(): DestinoEspecial[] {
    let result = [...this.destinosEspeciales];

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      result = result.filter(d => 
        d.titulo.toLowerCase().includes(query) ||
        d.descripcion.toLowerCase().includes(query) ||
        d.tags.some(t => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (this.selectedCategory !== 'all') {
      result = result.filter(d => d.categoria === this.selectedCategory);
    }

    // Price filter
    result = result.filter(d => d.precio <= this.maxPrice);

    // Sort
    switch (this.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.precio - b.precio);
        break;
      case 'price-high':
        result.sort((a, b) => b.precio - a.precio);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  // Methods
  toggleCategory(categoriaId: string): void {
    this.selectedCategory = this.selectedCategory === categoriaId ? 'all' : categoriaId;
  }

  filtrarDestinos(): void {
    // Trigger re-evaluation of computed property
  }

  verDetalles(destino: DestinoEspecial): void {
    this.router.navigate(['/catalogo', destino.id]);
  }

  reservar(destino: DestinoEspecial): void {
    this.router.navigate(['/reservar', destino.id]);
  }

  getBadgeClass(badge: string): string {
    const classes: Record<string, string> = {
      'Popular': 'bg-yellow-400/90 text-yellow-900',
      'Nuevo': 'bg-green-500/90 text-white',
      'Oferta': 'bg-red-500/90 text-white'
    };
    return classes[badge] || 'bg-blue-500/90 text-white';
  }

  // ✅ MÉTODO ACTUALIZADO: Redirige a página 404
  loadMore(): void {
    // Redirige a una ruta que no existe para activar el 404
    this.router.navigate(['/pagina-no-existe']);
  }
}