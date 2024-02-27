import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAuPanierComponent } from './ajouter-au-panier.component';

describe('AjouterRendezVousComponent', () => {
  let component: AjouterAuPanierComponent;
  let fixture: ComponentFixture<AjouterAuPanierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterAuPanierComponent]
    });
    fixture = TestBed.createComponent(AjouterAuPanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
