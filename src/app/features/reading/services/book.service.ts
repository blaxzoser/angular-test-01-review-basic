import { Injectable } from '@angular/core';
import { Book } from '../../../models/book.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books:Book[] = [];
  seed(){
    this.books =[
      { author:'Robert Martin', title:'Clean Code', id: 1, status: 'read' },
    { author:'Andrew Hunt', title:'The Pragmatic Programmer', id: 2, status: 'reading' },
    { author:'Martin Fowler', title:'Refactoring', id: 3, status: 'to-read' },
    { author:'Eric Evans', title:'Domain-Driven Design', id: 4, status: 'to-read' },
    { author:'Erich Gamma', title:'Design Patterns', id: 5, status: 'read' }];
  }

  constructor() {
      this.seed();
   }

  getBooks():Observable<Book[]>{
    return of(this.books);
  }
}
