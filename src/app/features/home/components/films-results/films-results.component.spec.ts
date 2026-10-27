import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmResultsComponent } from './films-results.component';

describe('FilmResultsComponent', () => {
  let component: FilmResultsComponent;
  let fixture: ComponentFixture<FilmResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
