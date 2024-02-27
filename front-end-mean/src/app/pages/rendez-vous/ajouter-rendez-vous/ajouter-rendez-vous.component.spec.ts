import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterRendezVousComponent } from './ajouter-rendez-vous.component';

describe('AjouterRendezVousComponent', () => {
  let component: AjouterRendezVousComponent;
  let fixture: ComponentFixture<AjouterRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterRendezVousComponent]
    });
    fixture = TestBed.createComponent(AjouterRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
