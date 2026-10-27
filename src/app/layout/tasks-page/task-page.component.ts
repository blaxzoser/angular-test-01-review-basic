import { Component, OnInit } from '@angular/core';
import { Priority, Task } from '../../models/task.interface';

@Component({
  selector: 'app-tasks-page',
  standalone: false,
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css'
})
export class TaskPageComponent implements OnInit {
  tasks:Task[]  = [];

  ngOnInit(): void {
    this.tasks = [
      { id:1, title:'poke',priority: Priority.Low,done:false },
      { id:2, title:'payments',priority: Priority.Medium,done:true },
      { id:3, title:'debs',priority: Priority.High,done:true },
      { id:4, title:'credit card',priority: Priority.Medium,done:false },
    ];
  }

  add(newTask:Task){
    const newId =  this.tasks.length ? Math.max(...this.tasks.map((x => x.id))) + 1 :1;
    this.tasks = [...this.tasks, {...newTask, id:newId}];
  }

  toggle(id:number){
     this.tasks = this.tasks.map(t =>
      t.id === id ? { ...t, done: !t.done } : t
    );
  }

 remove(id:number){
     this.tasks = this.tasks.filter(o => o.id !== id);
  }

  numberOfDone():number{
    return this.tasks.filter(d=> d.done).length;
  }

  numberOfTotal():number{
    return this.tasks.length;
  }
}
