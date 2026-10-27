import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResultsComponent } from './table-results.component';

describe('TableResultsComponent', () => {
  let component: TableResultsComponent;
  let fixture: ComponentFixture<TableResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
