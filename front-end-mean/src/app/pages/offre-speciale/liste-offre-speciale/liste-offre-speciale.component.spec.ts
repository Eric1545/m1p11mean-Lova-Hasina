import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeOffreSpecialeComponent } from './liste-offre-speciale.component';

describe('ListeOffreSpecialeComponent', () => {
  let component: ListeOffreSpecialeComponent;
  let fixture: ComponentFixture<ListeOffreSpecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeOffreSpecialeComponent]
    });
    fixture = TestBed.createComponent(ListeOffreSpecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
