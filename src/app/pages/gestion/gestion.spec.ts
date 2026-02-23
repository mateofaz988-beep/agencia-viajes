import { ComponentFixture, TestBed } from '@angular/core/testing';
// Cambia 'Gestion' por 'GestionComponent'
import { GestionComponent } from './gestion'; 

describe('GestionComponent', () => {
  let component: GestionComponent;
  let fixture: ComponentFixture<GestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      imports: [GestionComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});