import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TaskPageComponent } from './layout/tasks-page/task-page.component';
import { ReadingPageComponent } from './pages/reading-page/reading-page.component';

export const routes: Routes = [
   { path: '', component: HomePageComponent } ,
   { path: 'tasks', component:TaskPageComponent},
   { path: 'reading', component:ReadingPageComponent}
];
