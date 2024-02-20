import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEmployeFavorisComponent } from './liste-employe-favoris.component';

describe('ListeEmployeFavorisComponent', () => {
  let component: ListeEmployeFavorisComponent;
  let fixture: ComponentFixture<ListeEmployeFavorisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEmployeFavorisComponent]
    });
    fixture = TestBed.createComponent(ListeEmployeFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
