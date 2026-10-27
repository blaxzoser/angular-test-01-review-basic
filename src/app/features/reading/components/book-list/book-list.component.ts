import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, BookStatus } from '../../../../models/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  @Input() books:Book[] = [];

  @Output() emitRemove = new EventEmitter<number>();
  @Output() emitUpdate = new EventEmitter<Book>();

  statuses = [
    { value: 'to-read', label: 'To read' },
    { value: 'reading', label: 'Reading' },
    { value: 'read', label: 'Read' }
  ];

  remove(id:number):void{
      this.emitRemove.emit(id);
  }

  update(book:Book, status:BookStatus):void{
    this.emitUpdate.emit({ ...book, status });
  }
}
