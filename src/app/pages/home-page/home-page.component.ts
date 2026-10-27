import { Component, OnInit } from '@angular/core';
import { Film } from '../../models';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  fakeFilms:Film[] = [];
  filterFilms:Film[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   this.fakeFilms =[
    { _id: "201", title:"The Matrix",year:1999,genre:"Sci-Fi" },
    { _id: "202", title:"Gladiator",year:2000,genre:"Action" },
    { _id: "203", title:"Spirited Away",year:2001,genre:"Animation" },
    { _id: "204", title:"The Dark Knight",year:2008,genre:"Action" },
    { _id: "205", title:"Inception",year:2010,genre:"Sci-Fi" },
    { _id: "206", title:"The Grand Budapest Hotel",year:2014,genre:"Comedy" },
    { _id: "207", title:"Mad Max: Fury Road",year:2015,genre:"Action" },
    { _id: "208", title:"Get Out",year:2017,genre:"Horror" },
    { _id: "209", title:"Parasite",year:2019,genre:"Thriller" },
    { _id: "210", title:"Dune",year:2021,genre:"Sci-Fi" }
   ];
  }

  onSearch(value:string){
    const term = value.trim().toLowerCase();
    if(term === ''){
      this.filterFilms = [... this.fakeFilms];
    }
    else{
      this.filterFilms = this.fakeFilms.filter(s => s.title.toLowerCase().includes(value));
    }
  }
}
