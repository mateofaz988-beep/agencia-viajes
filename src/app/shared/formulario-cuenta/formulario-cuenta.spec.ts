import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCuenta } from './formulario-cuenta';

describe('FormularioCuenta', () => {
  let component: FormularioCuenta;
  let fixture: ComponentFixture<FormularioCuenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioCuenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioCuenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
