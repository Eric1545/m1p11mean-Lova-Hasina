import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreSpecialeComponent } from './offre-speciale.component';

describe('OffreSpecialeComponent', () => {
  let component: OffreSpecialeComponent;
  let fixture: ComponentFixture<OffreSpecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreSpecialeComponent]
    });
    fixture = TestBed.createComponent(OffreSpecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
