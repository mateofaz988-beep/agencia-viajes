import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroComponent } from '../../shared/hero/hero';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroComponent],
  templateUrl: './contactanos.html'
})
export class ContactanosComponent {

  contacto = {
    nombre: '',
    email: '',
    asunto: 'Información General',
    mensaje: ''
  };

  enviando = false;

  enviarFormulario() {
    this.enviando = true;
    

    setTimeout(() => {
      console.log('Datos enviados:', this.contacto);
      alert('¡Gracias! Tu mensaje ha sido enviado. Un asesor de AIR593 te contactará pronto.');
      this.resetForm();
      this.enviando = false;
    }, 1500);
  }

  private resetForm() {
    this.contacto = { nombre: '', email: '', asunto: 'Información General', mensaje: '' };
  }
}