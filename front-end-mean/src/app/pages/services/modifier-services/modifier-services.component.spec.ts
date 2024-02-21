import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierServicesComponent } from './modifier-services.component';

describe('ModifierServicesComponent', () => {
  let component: ModifierServicesComponent;
  let fixture: ComponentFixture<ModifierServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierServicesComponent]
    });
    fixture = TestBed.createComponent(ModifierServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
