import { Film, SwapiResponse } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmServiceService {
  api: string = 'https://www.swapi.tech/api/films';

  constructor(private http: HttpClient) { }

  getFilms(title:string): Observable<Film[]> {
    // Get films from API
    // log result first to console
    let $subscribe: Observable<SwapiResponse> = this.http.get<SwapiResponse>(this.api);
    $subscribe.subscribe((films) => {
      console.log(films);
    });
    return $subscribe.pipe(
      map((response) => response.result.filter(film => film.properties?.title.toLowerCase().includes(title.toLowerCase()))
    ));
  }

    getAllFilms(): Observable<Film[]> {
    // Get films from API
    // log result first to console
    let $subscribe: Observable<SwapiResponse> = this.http.get<SwapiResponse>(this.api);
    $subscribe.subscribe((films) => {
      console.log('Full response:', films);
    });
    return $subscribe.pipe(
      map((response) =>  response.result),
      tap((films) => console.log('Mapped films:', films))
    );
  }
}
