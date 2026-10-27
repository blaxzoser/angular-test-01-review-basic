import { Component, Input } from '@angular/core';
import { Film } from '../../../../models';

@Component({
  selector: 'app-films-results',
  standalone: false,
  templateUrl: './films-results.component.html',
  styleUrl: './films-results.component.css'
})
export class FilmResultsComponent {
  @Input() films: Film[] = [];

   trackById(index: number, film: Film): string {
    return film._id;
  }
}
