import { Component, EventEmitter, Output, output } from '@angular/core';
import { Book, BookStatus } from '../../../../models/book.interface';

@Component({
  selector: 'app-book-form',
  standalone: false,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent {

 titleInput:string = '';
 authorInput:string = '';

 @Output() addEvent = new EventEmitter<Omit<Book, 'id'>>();

 status:BookStatus = 'to-read'; // default selected value
 statuses = [
    { value: 'to-read', label: 'To read' },
    { value: 'reading', label: 'Reading' },
    { value: 'read', label: 'Read' }
  ];

  add():void{

    if(!this.titleInput.trim()  || !this.authorInput.trim()) return;

    const newBook =
    {
      title:this.titleInput.trim(),
      author: this.authorInput.trim(),
      status: this.status
    };
    this.addEvent.emit(newBook);
    this.clean();
  }

  clean():void{
    this.titleInput = "";
    this.authorInput = "";
    this.status = 'to-read';
  }
}
