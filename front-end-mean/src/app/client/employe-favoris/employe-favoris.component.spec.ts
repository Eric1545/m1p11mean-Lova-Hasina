import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeFavorisComponent } from './employe-favoris.component';

describe('EmployeFavorisComponent', () => {
  let component: EmployeFavorisComponent;
  let fixture: ComponentFixture<EmployeFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeFavorisComponent]
    });
    fixture = TestBed.createComponent(EmployeFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
