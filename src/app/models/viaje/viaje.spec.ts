import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Viaje } from './viaje';

describe('Viaje', () => {
  let component: Viaje;
  let fixture: ComponentFixture<Viaje>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Viaje]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Viaje);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
