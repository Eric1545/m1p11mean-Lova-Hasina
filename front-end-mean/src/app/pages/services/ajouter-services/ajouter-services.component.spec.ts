import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterServicesComponent } from './ajouter-services.component';

describe('AjouterServicesComponent', () => {
  let component: AjouterServicesComponent;
  let fixture: ComponentFixture<AjouterServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterServicesComponent]
    });
    fixture = TestBed.createComponent(AjouterServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
