// ✅ footer.component.ts
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  showBackToTop = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showBackToTop = window.scrollY > 400;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubscribe(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.querySelector('input[type="email"]') as HTMLInputElement).value;
    
    // Aquí iría la lógica de suscripción
    console.log('Suscripción:', email);
    
    // Feedback visual
    const btn = form.querySelector('button');
    if (btn) {
      btn.innerHTML = '✓';
      setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`;
        form.reset();
      }, 2000);
    }
  }
}