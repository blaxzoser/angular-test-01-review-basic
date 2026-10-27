import { Component, OnInit } from '@angular/core';
import { BookService } from '../../features/reading/services/book.service';
import { Book, BookStatus } from '../../models/book.interface';

@Component({
  selector: 'app-reading-page',
  standalone: false,
  templateUrl: './reading-page.component.html',
  styleUrl: './reading-page.component.css'
})
export class ReadingPageComponent implements OnInit {

  selectedOption:string = "";
  selectedText:string = '';
  selectedStatus:string = '';

  sourceBooks:Book[] = [];
  filterBooks:Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(s =>{
       this.sourceBooks = [...s];
       this.filterBooks = this.sourceBooks;
    }
    );

    if(!this.selectedText.trim())
        this.filterBooks = [...this.sourceBooks];
  }

  search():void{
    const isTitle:boolean = this.selectedOption === 'title';
    const isAll:boolean = this.selectedStatus === 'all';

    if(!this.selectedText.trim() && isAll)
        this.filterBooks = [...this.sourceBooks];


    if(isTitle && isAll){
          this.filterBooks = this.sourceBooks
          .filter(s=> s.title.trim().toUpperCase().includes(this.selectedText.trim().toUpperCase()));
    }
    else if(isTitle && !isAll){
         this.filterBooks = this.sourceBooks
          .filter(s=> s.title.trim().toUpperCase().includes(this.selectedText.trim().toUpperCase()) && s.status === this.selectedStatus as BookStatus);
    }
    else if(!isTitle && isAll){
          this.filterBooks = this.sourceBooks
          .filter(s=> s.author.trim().toUpperCase().includes(this.selectedText.trim().toUpperCase()));
    }
    else{
      this.filterBooks = this.sourceBooks
          .filter(s=> s.author.trim().toUpperCase().includes(this.selectedText.trim().toUpperCase()) && s.status === this.selectedStatus as BookStatus);
    }
  }

 updateOnlyStatus(updated: Book): void {
      this.sourceBooks = this.sourceBooks.map(b => b.id === updated.id ? updated : b);
      this.filterBooks = this.sourceBooks;
}


remove(id:number):void{
       this.sourceBooks = this.sourceBooks.filter(e => e.id !== id);
       this.filterBooks =  this.sourceBooks;
}

countByStatus(status:string):number{
  const statusFiler = status as BookStatus;
  return this.sourceBooks.filter(s => s.status === statusFiler ).length;
}

add(newBook: Omit<Book, 'id'>): void {
   const ids = this.sourceBooks.map(s => s.id);
   const newId =  ids.length ? Math.max(...ids) + 1 : 1;
   const updateElement:Book = {...newBook, id:newId };
   this.sourceBooks =[...this.sourceBooks,updateElement];
   this.filterBooks = this.sourceBooks;
}




}
