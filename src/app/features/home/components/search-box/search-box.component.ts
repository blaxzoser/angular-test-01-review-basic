import { Component, EventEmitter, OnDestroy, OnInit, output, Output} from '@angular/core';
import { FilmServiceService } from '../../services/film-service.service';
import { Film } from '../../../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: false,
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter<string>();

  term:string = '';
  filmTitle:string = '';

  films:Film[] = [];
  $subscribe:Subscription = new Subscription();

  constructor(private filmServiceService: FilmServiceService) {}


  ngOnInit(): void {
    this.$subscribe = this.filmServiceService.getAllFilms().subscribe((data) => {
      this.films = data;
    });
  }

  findFilmByTitle(): void {
    this.filmServiceService.getFilms(this.filmTitle).subscribe((data) => {
      this.films = data;
    });
  }

  searchByTerm():void {
    this.search.emit(this.term);
  }

  clean(){
    this.filmServiceService.getAllFilms().subscribe((data) => {
      this.films = data;
    });

    this.filmTitle = '';
  }

   ngOnDestroy(): void {
    this.$subscribe.unsubscribe();
  }
}
