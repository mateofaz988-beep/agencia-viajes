import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeCard } from './viaje-card';

describe('ViajeCard', () => {
  let component: ViajeCard;
  let fixture: ComponentFixture<ViajeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViajeCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViajeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
