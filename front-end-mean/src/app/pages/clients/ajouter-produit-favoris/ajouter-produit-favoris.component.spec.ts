import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterProduitFavorisComponent } from './ajouter-produit-favoris.component';

describe('AjouterProduitFavorisComponent', () => {
  let component: AjouterProduitFavorisComponent;
  let fixture: ComponentFixture<AjouterProduitFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterProduitFavorisComponent]
    });
    fixture = TestBed.createComponent(AjouterProduitFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
