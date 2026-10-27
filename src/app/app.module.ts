import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import '@angular/compiler';

// Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchBoxComponent } from './features/home/components/search-box/search-box.component';
import { TableResultsComponent } from './features/home/components/table-results/table-results.component';

// Services
import { FilmServiceService } from './features/home/services/film-service.service';

// Routes
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { FilmResultsComponent } from './features/home/components/films-results/films-results.component';
import { TaskPageComponent } from './layout/tasks-page/task-page.component';
import { TaskFormComponent } from './features/tasks/components/task-form/task-form.component';
import { TaskListComponent } from './features/tasks/components/task-list/task-list.component';
import { ReadingPageComponent } from './pages/reading-page/reading-page.component';
import { BookFormComponent } from './features/reading/components/book-form/book-form.component';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './features/reading/components/book-list/book-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchBoxComponent,
    TableResultsComponent,
    FilmResultsComponent,
    TaskPageComponent,
    TaskFormComponent,
    TaskListComponent,
    ReadingPageComponent,
    BookFormComponent,
    BookListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    FilmServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
