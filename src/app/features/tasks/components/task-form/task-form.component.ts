import { Component, EventEmitter, Output } from '@angular/core';
import { Priority, Task } from '../../../../models/task.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  selectedTitle = '';
  selectedPriority: Priority = Priority.Low;
  priorities = Object.values(Priority);   // ['low', 'medium', 'high']

  @Output() add = new EventEmitter<Task>();

  submit():void{
    const cleanTitle = this.selectedTitle.trim();
    if(!cleanTitle) return;

    const newTask: Task = {
            id:0,
            priority: this.selectedPriority ,
            title:cleanTitle,
            done:false
    };

    this.add.emit(newTask);
    this.clean();
  }

  clean(){
    this.selectedTitle = "";
    this.selectedPriority = Priority.Low;
  }
}
