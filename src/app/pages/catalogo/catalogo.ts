import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { HeroComponent } from '../../shared/hero/hero';
import { ViajeService, Viaje } from '../../services/viaje';

@Component({
  selector: 'app-catalogo',
  standalone: true,

  imports: [CommonModule, FormsModule, HeroComponent], 
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class CatalogoComponent implements OnInit {

  private _viajeService = inject(ViajeService);


  filtro: string = '';
  viajes: Viaje[] = []; 
  ngOnInit(): void {
   
    this.viajes = this._viajeService.getViajes();
  }


  get viajesFiltrados(): Viaje[] {
    if (!this.filtro) {
      return this.viajes;
    }
    return this.viajes.filter(v => 
      v.destino.toLowerCase().includes(this.filtro.toLowerCase()) ||
      v.categoria.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }


  agregarReserva(viaje: Viaje): void {
    this._viajeService.agregarReserva(viaje);
  }
}