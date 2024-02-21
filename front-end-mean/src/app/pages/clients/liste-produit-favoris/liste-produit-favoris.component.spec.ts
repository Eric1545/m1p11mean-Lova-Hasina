import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeProduitFavorisComponent } from './liste-produit-favoris.component';

describe('ListeProduitFavorisComponent', () => {
  let component: ListeProduitFavorisComponent;
  let fixture: ComponentFixture<ListeProduitFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeProduitFavorisComponent]
    });
    fixture = TestBed.createComponent(ListeProduitFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
