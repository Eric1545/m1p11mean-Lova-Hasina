import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierOffreSpecialeComponent } from './modifier-offre-speciale.component';

describe('ModifierOffreSpecialeComponent', () => {
  let component: ModifierOffreSpecialeComponent;
  let fixture: ComponentFixture<ModifierOffreSpecialeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierOffreSpecialeComponent]
    });
    fixture = TestBed.createComponent(ModifierOffreSpecialeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
