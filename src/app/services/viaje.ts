import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la estructura de un Viaje para evitar el uso de 'any'
export interface Viaje {
  id: number;
  destino: string;
  precio: number;
  categoria: string;
  oferta: boolean;
  estrellas: number;
  imagen: string;
}

@Injectable({ providedIn: 'root' })
export class ViajeService {
  
  // Inyección del cliente HTTP para realizar peticiones a la API
  private http = inject(HttpClient);
  
  // URL de tu proyecto AgenciaViajes en MockAPI
  private apiUrl = 'https://apple-6e3d1-default-rtdb.firebaseio.com/ventas.json';

  // Catálogo de destinos disponibles
  private viajes: Viaje[] = [
    { id: 1, destino: 'Galápagos', precio: 1200, categoria: 'Playa', oferta: true, estrellas: 5, imagen: 'https://www.civitatis.com/blog/wp-content/uploads/2022/12/que-ver-islas-galapagos.jpg' },
    { id: 2, destino: 'Cotopaxi', precio: 80, categoria: 'Montaña', oferta: false, estrellas: 4, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Cotopaxi_volcano_2008-06-27T1322.jpg/500px-Cotopaxi_volcano_2008-06-27T1322.jpg' },
    { id: 3, destino: 'Baños de Agua Santa', precio: 120, categoria: 'Aventura', oferta: true, estrellas: 5, imagen: 'https://www.turismo.gob.ec/wp-content/uploads/2020/12/Basilica-de-la-Virgen-de-Agua-Santa.jpg' },
    { id: 4, destino: 'Cartagena', precio: 450, categoria: 'Playa', oferta: true, estrellas: 4, imagen: 'https://media.staticontent.com/media/pictures/9495889e-54f9-40d2-939d-b04bf30b47c7' },
    { id: 5, destino: 'Medellín', precio: 380, categoria: 'Ciudad', oferta: false, estrellas: 5, imagen: 'https://www.metropolitan-touring.com/wp-content/uploads/2024/11/el-poblado-discrict.webp' },
    { id: 6, destino: 'Machu Picchu', precio: 650, categoria: 'Montaña', oferta: false, estrellas: 5, imagen: 'https://cuscoperu.b-cdn.net/wp-content/uploads/2024/06/Llama-en-Machu-Picchu-pc.jpg.webp' },
    { id: 7, destino: 'Cusco', precio: 300, categoria: 'Ciudad', oferta: true, estrellas: 4, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Plaza_de_Cusco_Allison_Bellido.jpg/330px-Plaza_de_Cusco_Allison_Bellido.jpg' },
    { id: 8, destino: 'Cancún', precio: 850, categoria: 'Playa', oferta: true, estrellas: 5, imagen: 'https://content.r9cdn.net/rimg/dimg/f2/b1/89e06bf7-city-34713-16ed2f2c7f1.jpg?width=1366&height=768&xhint=1735&yhint=2084&crop=true' },
    { id: 9, destino: 'Riviera Maya', precio: 900, categoria: 'Playa', oferta: false, estrellas: 5, imagen: 'https://img.oyster.com/production/Articles/The%20Best%20Itinerary%20for%20Riviera%20Maya/Feature/The_Best_Itinerary_for_Riviera_Maya_feature_image_516aca30b2.jpeg' }
  ];

  // Array temporal para manejar el carrito entre páginas
  private reservas: Viaje[] = [];

  // Obtener la lista completa de viajes
  getViajes(): Viaje[] { 
    return this.viajes; 
  }

  // Agregar un viaje al carrito usando el operador spread (...)
  agregarReserva(viaje: Viaje): void {
    this.reservas = [...this.reservas, viaje];
    alert('Viaje agregado al carrito: ' + viaje.destino);
  }

  // Obtener los viajes seleccionados actualmente
  obtenerReservas(): Viaje[] {
    return this.reservas;
  }

  // Método para guardar la transacción final en MockAPI
  guardarVenta(datosVenta: any): Observable<any> {
    return this.http.post(this.apiUrl, datosVenta);
  }
}