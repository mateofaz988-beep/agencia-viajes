import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioServicio } from './usuario-servicio';

describe('UsuarioServicio', () => {
  let component: UsuarioServicio;
  let fixture: ComponentFixture<UsuarioServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioServicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioServicio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
