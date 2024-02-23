import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterOffreSpecialeComponent } from './ajouter-offre-speciale.component';

describe('AjouterOffreSpecialeComponent', () => {
  let component: AjouterOffreSpecialeComponent;
  let fixture: ComponentFixture<AjouterOffreSpecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterOffreSpecialeComponent]
    });
    fixture = TestBed.createComponent(AjouterOffreSpecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
