import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../models/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
 @Input() tasks:Task[] = [];
 @Output() toggle = new EventEmitter<number>();
 @Output() remove = new EventEmitter<number>();

 onToggle(currentId:number):void{
  this.toggle.emit(currentId);
 }

 onRemove(currentId:number):void{
  this.remove.emit(currentId);
 }

}
