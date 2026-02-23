import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ViajeService, Viaje } from '../../services/viaje';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css'
})
export class GestionComponent implements OnInit {

  private readonly viajeService = inject(ViajeService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  // ✅ Estados de la UI
  carrito: Viaje[] = [];
  total: number = 0;
  descuento: number = 0;
  totalConDescuento: number = 0;
  verPago: boolean = false;
  procesandoPago: boolean = false;
  pagoExitoso: boolean = false;
  mensajeError: string = '';

  // ✅ Formulario de pago
  formPago: FormGroup;

  // ✅ Configuración de descuentos
  private readonly DESCUENTO_MINIMO = 1000;
  private readonly PORCENTAJE_DESCUENTO = 0.10; // 10% de descuento

  constructor() {
    this.formPago = this.fb.group({
      titular: ['', [Validators.required, Validators.minLength(3)]],
      tarjeta: ['', [
        Validators.required, 
        Validators.pattern(/^[0-9\s]{19}$/) // 16 dígitos + 3 espacios
      ]],
      fecha: ['', [
        Validators.required, 
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)
      ]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
      email: ['', [Validators.required, Validators.email]] // ✅ Nuevo: email para recibo
    });
  }

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotal();
  }

  // ✅ Cargar carrito desde servicio + localStorage
  private cargarCarrito(): void {
    const reservasServicio = this.viajeService.obtenerReservas();
    const reservasLocal = localStorage.getItem('carrito_air593');
    
    if (reservasLocal) {
      try {
        const carritoGuardado: Viaje[] = JSON.parse(reservasLocal);
        this.carrito = [...reservasServicio, ...carritoGuardado];
      } catch {
        this.carrito = [...reservasServicio];
      }
    } else {
      this.carrito = [...reservasServicio];
    }
  }

  // ✅ Guardar carrito en localStorage (persistencia)
  private guardarCarrito(): void {
    localStorage.setItem('carrito_air593', JSON.stringify(this.carrito));
  }

  // ✅ Calcular total con descuento automático
  calcularTotal(): void {
    this.total = this.carrito.reduce((suma, viaje) => suma + viaje.precio, 0);
    
    // Aplicar descuento si supera el mínimo
    if (this.total >= this.DESCUENTO_MINIMO) {
      this.descuento = Math.round(this.total * this.PORCENTAJE_DESCUENTO);
    } else {
      this.descuento = 0;
    }
    
    this.totalConDescuento = this.total - this.descuento;
  }

  // ✅ Formato de tarjeta: agrega espacio cada 4 dígitos
  formatearTarjeta(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '').substring(0, 16);
    
    // Agregar espacio cada 4 dígitos
    const partes = [];
    for (let i = 0; i < valor.length; i += 4) {
      partes.push(valor.substring(i, i + 4));
    }
    
    input.value = partes.join(' ');
    this.formPago.get('tarjeta')?.setValue(input.value);
  }

  // ✅ Formato de fecha: MM/YY automático
  formatearFecha(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '').substring(0, 4);
    
    if (valor.length > 2) {
      valor = valor.substring(0, 2) + '/' + valor.substring(2);
    }
    
    input.value = valor;
    this.formPago.get('fecha')?.setValue(valor);
  }

  // ✅ Solo números para CVV
  validarSoloNumeros(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
    const controlName = input.getAttribute('formControlName');
    if (controlName) {
      this.formPago.get(controlName)?.setValue(input.value);
    }
  }

  // ✅ Eliminar item con confirmación
  eliminar(index: number): void {
    const item = this.carrito[index];
    
    if (confirm(`¿Eliminar "${item.destino}" de tu reserva?`)) {
      this.carrito = this.carrito.filter((_, i) => i !== index);
      this.calcularTotal();
      this.guardarCarrito();
      
      // Feedback visual (opcional: implementar toast)
      console.log(`Eliminado: ${item.destino}`);
    }
  }

  // ✅ Limpiar todo el carrito
  limpiarCarrito(): void {
    if (this.carrito.length === 0) return;
    
    if (confirm('¿Estás seguro de eliminar TODAS tus reservas?')) {
      this.carrito = [];
      this.calcularTotal();
      this.guardarCarrito();
    }
  }

  // ✅ Abrir modal de pago
  abrirCaja(): void {
    if (this.totalConDescuento > 0) {
      this.verPago = true;
      this.pagoExitoso = false;
      this.mensajeError = '';
      this.formPago.reset();
      this.formPago.get('email')?.setValue(''); // Reset email
    }
  }

  // ✅ Cerrar modal de pago
  cerrarCaja(): void {
    this.verPago = false;
    this.procesandoPago = false;
  }

  // ✅ PROCESO DE PAGO MEJORADO
  async pagarTodo(): Promise<void> {
    if (this.formPago.invalid || this.procesandoPago) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.formPago.controls).forEach(key => {
        this.formPago.get(key)?.markAsTouched();
      });
      return;
    }

    this.procesandoPago = true;
    this.mensajeError = '';

    try {
      // 1. Preparar datos de la venta
      const datosVenta = {
        titular: this.formPago.value.titular.toUpperCase(),
        email: this.formPago.value.email,
        total: this.totalConDescuento,
        descuento: this.descuento,
        fecha: new Date().toISOString(),
        items: this.carrito.map(v => ({
          id: v.id,
          destino: v.destino,
          precio: v.precio
        })),
        metodoPago: 'tarjeta_credito',
        estado: 'completado'
      };

      // 2. Guardar en MockAPI
      const respuesta = await this.viajeService.guardarVenta(datosVenta).toPromise();
      
      console.log('✅ Venta guardada:', respuesta);

      // 3. Limpiar carrito local y servicio
      this.carrito = [];
      localStorage.removeItem('carrito_air593');
      this.calcularTotal();

      // 4. Mostrar éxito
      this.pagoExitoso = true;
      
      // 5. Redirigir después de 3 segundos
      setTimeout(() => {
        this.router.navigate(['/'], { 
          queryParams: { pago: 'exitoso', id: respuesta?.id },
          replaceUrl: true
        });
      }, 3000);

    } catch (error: any) {
      console.error('❌ Error en pago:', error);
      
      // Manejo de errores específico
      if (error?.status === 0) {
        this.mensajeError = 'No hay conexión. Verifica tu internet.';
      } else if (error?.status === 400) {
        this.mensajeError = 'Datos inválidos. Revisa el formulario.';
      } else if (error?.status === 500) {
        this.mensajeError = 'Error del servidor. Intenta más tarde.';
      } else {
        this.mensajeError = 'Error al procesar el pago. Intenta nuevamente.';
      }
      
    } finally {
      this.procesandoPago = false;
    }
  }

  // ✅ Helpers para el template
  get tarjetaMask(): string {
    const valor = this.formPago.get('tarjeta')?.value || '';
    return valor.replace(/\d{4}/g, '$& ').trim();
  }

  get puedePagar(): boolean {
    return this.totalConDescuento > 0 && !this.procesandoPago;
  }

  get itemsCount(): number {
    return this.carrito.length;
  }
}