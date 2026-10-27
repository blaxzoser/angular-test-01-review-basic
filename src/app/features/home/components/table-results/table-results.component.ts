import { Component, Input } from '@angular/core';
import { Film } from '../../../../models';

@Component({
  selector: 'app-table-results',
  standalone: false,
  templateUrl: './table-results.component.html',
  styleUrl: './table-results.component.css'
})
export class TableResultsComponent {
  @Input() films: Film[] = [];
}
