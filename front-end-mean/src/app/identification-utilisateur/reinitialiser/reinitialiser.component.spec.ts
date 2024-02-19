import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialiserComponent } from './reinitialiser.component';

describe('ReinitialiserComponent', () => {
  let component: ReinitialiserComponent;
  let fixture: ComponentFixture<ReinitialiserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReinitialiserComponent]
    });
    fixture = TestBed.createComponent(ReinitialiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
