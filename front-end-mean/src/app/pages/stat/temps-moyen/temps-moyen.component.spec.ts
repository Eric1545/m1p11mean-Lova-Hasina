import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsMoyenComponent } from './temps-moyen.component';

describe('TempsMoyenComponent', () => {
  let component: TempsMoyenComponent;
  let fixture: ComponentFixture<TempsMoyenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempsMoyenComponent]
    });
    fixture = TestBed.createComponent(TempsMoyenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
