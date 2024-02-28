import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousTerminerComponent } from './rendez-vous-terminer.component';

describe('RendezVousTerminerComponent', () => {
  let component: RendezVousTerminerComponent;
  let fixture: ComponentFixture<RendezVousTerminerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RendezVousTerminerComponent]
    });
    fixture = TestBed.createComponent(RendezVousTerminerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
