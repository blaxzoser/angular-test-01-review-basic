# Angular Interview Cheat Sheet — My Common Mistakes and Fixes

Built from Exercises 1, 2 and 3
([film search](exercise-1-film-search.md) · [task board](exercise-2-task-board.md) ·
[reading list](exercise-3-reading-list.md)).
Read this top to bottom 10 minutes before a practice test or interview.

---

## 1. Before you write code (2 minutes)
1. Read **every** requirement and list the exact names (labels, `data-testid`, route, event payloads).
2. If something is ambiguous (select vs radios, `id` vs `data-testid`, button vs live filter),
   pick the most literal reading and write a one-line assumption comment.
3. Decide the build order: route → parent with data → children → wiring → extras.
4. **No CSS, no extras** until every requirement passes.

## 2. The mistakes I repeat, in order of cost

| # | Mistake | Seen in | Fix |
|---|---|---|---|
| 1 | Built a child with `@Output` but **never bound it in the parent** | Ex 3 | Bind `(event)="handler($event)"` in the parent the moment the output exists |
| 2 | Normalized a value, then used the raw one (`term` vs `value`; `trim()` checked but untrimmed emitted) | Ex 1, 3 | Create the cleaned variable, use **only** it afterwards |
| 3 | State not initialized (`filterFilms = []`, `selectedStatus = ''`) → first view/search is empty | Ex 1, 3 | Initialize filters to their "all" value and fill the list on load |
| 4 | Filter result lost after add/remove/update (`filtered = source`) | Ex 3 | One `applyFilters()` method, called after every change |
| 5 | Child created the `id` (`Date.now()`) | Ex 2, 3 | Parent owns ids; child emits `Omit<Model, 'id'>` |
| 6 | Optional fields everywhere (`title?`, `done?`) | Ex 2 | Required fields unless truly optional |
| 7 | Wrong total (counter read the *filtered* list) | Ex 3 | Counters read the source list |
| 8 | Disabled-button check typo (title tested twice) | Ex 3 | Re-read the condition out loud; test both fields |
| 9 | Enter key not handled | Ex 2 | `(keyup.enter)` **or** wrap in `<form (ngSubmit)>`; guard inside the method |
| 10 | Control with no visible text (`<input type="button">`) | Ex 2 | `<button type="button">Remove</button>` |
| 11 | Scope creep (API call, second input, unused component) | Ex 1 | Stick to the spec; list "later" ideas on paper |
| 12 | Copy-pasted `if/else` branches for each filter combination | Ex 3 | One predicate with `&&` (see section 4) |
| 13 | Spec says select, I built radios | Ex 3 | Follow the control type in the spec |
| 14 | Inconsistent names (`layout/tasks-page`, `task-page`, `app-tasks-page`) | Ex 2 | One name for folder, file, class and selector |
| 15 | Leftovers: `console.log`, unused imports, `this.` in templates, `!=` | Ex 1–3 | 2-minute cleanup pass at the end |

## 3. Angular errors I hit — recognize and fix fast

| Error / symptom | Cause | Fix |
|---|---|---|
| `NG01352: ... name attribute must be set or standalone` | `[(ngModel)]` inside a `<form>` with no `name` | Add `name="..."` (or `[ngModelOptions]="{standalone: true}"`) |
| `NG5: Argument of type 'Event' is not assignable to ...` | `(ngModelChange)` used **without** `[ngModel]`, so `$event` is a DOM `Event` | Add `[ngModel]="value"` on the same element |
| Id shows literally as `book-item-{book.id}` | Single braces are not interpolation | `{{ book.id }}` or `[id]="'book-item-' + book.id"` |
| `loadComponent` does nothing / errors | Component is declared in an NgModule (non-standalone) | Use `component: X` in routes |
| Component is rendered twice | Selector in a template **and** `<router-outlet>` for the same route | Keep only `<router-outlet />` |
| `'x' is not a known element` | Component not in `declarations`, or module missing `FormsModule` | Declare it / import the module |
| Comparing enum with `'low'` flagged | `strictTemplates` + string enum | Use a union type or compare with `Priority.Low` |
| Same HTTP call twice | `.subscribe()` for logging **and** returning the observable | Use `tap()` |
| `ng build` fails on `@esbuild/...` | `node_modules` installed on another OS | Run `npm install` on the machine you build on |

## 4. Copy-ready patterns (readable, one idea per line)

### Parent owns data, children emit events
```ts
export class PagePageComponent {
  items: Item[] = [];

  add(newItem: Omit<Item, 'id'>): void {
    const newId = this.getNextId();
    this.items = [...this.items, { ...newItem, id: newId }];
    this.applyFilters();
  }

  remove(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.applyFilters();
  }

  update(updated: Item): void {
    this.items = this.items.map(item => item.id === updated.id ? updated : item);
    this.applyFilters();
  }

  private getNextId(): number {
    const ids = this.items.map(item => item.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }
}
```
```html
<app-form (addEvent)="add($event)" />
<app-list [items]="visibleItems"
          (emitRemove)="remove($event)"
          (emitUpdate)="update($event)" />
```

### Filter with search text + status (keep two lists, one method)
```ts
searchText = '';
selectedStatus: Status | 'all' = 'all';

private applyFilters(): void {
  const text = this.searchText.trim().toLowerCase();

  this.visibleItems = this.items.filter(item => {
    const matchesStatus = this.selectedStatus === 'all' || item.status === this.selectedStatus;
    const matchesText = item.title.toLowerCase().includes(text);   // '' matches everything
    return matchesStatus && matchesText;
  });
}
```

### Form that emits (Enter works, guarded, trimmed, cleared)
```ts
@Output() addEvent = new EventEmitter<Omit<Book, 'id'>>();

add(): void {
  const title = this.titleInput.trim();
  const author = this.authorInput.trim();
  if (!title || !author) return;

  this.addEvent.emit({ title, author, status: this.status });
  this.clean();
}
```
```html
<form (ngSubmit)="add()">
  <input name="title" [(ngModel)]="titleInput" />
  <input name="author" [(ngModel)]="authorInput" />
  <select name="status" [(ngModel)]="status">
    @for (s of statuses; track s.value) { <option [value]="s.value">{{ s.label }}</option> }
  </select>
  <button [disabled]="!titleInput.trim() || !authorInput.trim()">Add book</button>
</form>
```

### List with `@Input`, row editing and `@empty`
```html
@for (book of books; track book.id) {
  <tr>
    <td>{{ book.title }}</td>
    <td>
      <select [ngModel]="book.status" (ngModelChange)="update(book, $event)">
        @for (s of statuses; track s.value) { <option [value]="s.value">{{ s.label }}</option> }
      </select>
    </td>
    <td><button type="button" (click)="remove(book.id)">Remove</button></td>
  </tr>
} @empty {
  <tr><td colspan="3">No books found</td></tr>
}
```

### Counters: always from the source list
```ts
get total(): number { return this.items.length; }
countByStatus(status: Status): number {
  return this.items.filter(item => item.status === status).length;
}
```

### Service with `of()` and no double subscription
```ts
getBooks(): Observable<Book[]> {
  return of(this.books).pipe(tap(list => console.log(list)));   // tap only while debugging
}
```

## 5. Final 5-minute check before submitting
- [ ] Every requirement tried by hand in the browser (type, click, press Enter, empty input)
- [ ] First page load shows the full list
- [ ] Every child `@Output` is bound in the parent
- [ ] Cleaned values (`trim`, `toLowerCase`) are the ones actually used
- [ ] Add, remove and change keep the active search/filter
- [ ] Counters come from the full list
- [ ] Spec names exactly (labels, test ids, route, control types)
- [ ] Buttons have visible text; no duplicate ids
- [ ] No `console.log`, unused imports or `this.` in templates; names consistent

## 6. Time strategy
| Phase | Share of the time |
|---|---|
| Route + parent + data | 15 % |
| Children + wiring | 40 % |
| Filters / counters | 25 % |
| Check against the spec and clean up | 20 % |

Stuck more than 5 minutes on one requirement? Skip it, finish the rest, come back.
When asked "why this way?", say it out loud: *the parent owns the data, children
communicate through inputs and outputs, and every update creates a new array.*

## 7. Timing history
| Exercise | Target | Actual |
|---|---|---|
| 1 — Film search | 15 min | 1 h 30 |
| 2 — Task board | 30 min | 1 h 30 |
| 3 — Reading list | 35 min | ~4 h in stages (1 h to req. 3, +1 h to 5, +1 h 30 to finish) |

Goal for the next round: finish the requirements table in **45 minutes with no styling**.

---

## 8. Basic snippets to remember (Angular 19 + TypeScript)

Short reminders of the basics that are easy to forget after years away.
Every snippet is meant to be typed from memory, so practice them.

### 8.1 Component (NgModule style, like this repo)
```ts
@Component({
  selector: 'app-book-list',          // used as <app-book-list> in templates
  standalone: false,                  // declared in an NgModule
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent {}
```
```ts
// app.module.ts
@NgModule({
  declarations: [AppComponent, BookListComponent],   // every non-standalone component
  imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### 8.2 Standalone component (the newer way)
```ts
@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [FormsModule, CommonModule],   // what the template needs
  template: `<h1>Hello {{ name }}</h1>`,
})
export class HelloComponent {
  name = 'Angular';
}
```
```ts
// main.ts with standalone
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()],
});
```

### 8.3 Binding cheat sheet
```html
{{ title }}                                  <!-- interpolation: text -->
<img [src]="imageUrl">                       <!-- property binding: data → DOM -->
<button (click)="save()">Save</button>       <!-- event binding: DOM → code -->
<input [(ngModel)]="name">                   <!-- two-way (needs FormsModule) -->
<div [class.active]="isActive"></div>        <!-- toggle one CSS class -->
<div [ngClass]="{ done: task.done, urgent: task.high }"></div>
<div [style.color]="isRed ? 'red' : 'black'"></div>
<button [disabled]="!name.trim()">Add</button>
<td [attr.data-status]="book.status"></td>   <!-- HTML attribute, not property -->
<input #box (keyup.enter)="add(box.value)">  <!-- template reference variable -->
```
Remember: `{{ }}` for text, `[ ]` for properties, `( )` for events, `[( )]` banana-in-a-box.

### 8.4 Control flow (new syntax) and the old one
```html
@if (books.length > 0) {
  <p>{{ books.length }} books</p>
} @else {
  <p>Nothing here</p>
}

@for (book of books; track book.id; let i = $index) {
  <li>{{ i + 1 }}. {{ book.title }}</li>
} @empty {
  <li>No books found</li>
}

@switch (book.status) {
  @case ('read')    { <span>Done</span> }
  @case ('reading') { <span>In progress</span> }
  @default          { <span>Planned</span> }
}
```
```html
<!-- old syntax (still common in existing code) -->
<li *ngFor="let book of books; trackBy: trackById">{{ book.title }}</li>
<p *ngIf="books.length; else empty">...</p>
<ng-template #empty><p>No books</p></ng-template>
```

### 8.5 `@Input` and `@Output`
```ts
// child
@Input() books: Book[] = [];
@Output() emitRemove = new EventEmitter<number>();

remove(id: number): void {
  this.emitRemove.emit(id);
}
```
```html
<!-- parent: [input]="data"  (output)="handler($event)" -->
<app-book-list [books]="visibleBooks" (emitRemove)="remove($event)" />
```
```ts
// signal-based version (Angular 17.1+ / 19)
books = input<Book[]>([]);               // read with books()
emitRemove = output<number>();           // emit with this.emitRemove.emit(id)
```

### 8.6 Template-driven forms
```html
<form (ngSubmit)="add()">
  <input name="title" [(ngModel)]="title" required>      <!-- name is REQUIRED inside <form> -->
  <select name="status" [(ngModel)]="status">
    @for (s of statuses; track s.value) {
      <option [value]="s.value">{{ s.label }}</option>
    }
  </select>
  <button [disabled]="!title.trim()">Add</button>
</form>
```
Outside a `<form>`, `[ngModel]` + `(ngModelChange)="update($event)"` works without `name`.

### 8.7 Reactive forms
```ts
// needs ReactiveFormsModule in the module's imports
form = this.fb.group({
  title:  ['', [Validators.required, Validators.minLength(2)]],
  author: ['', Validators.required],
  status: ['to-read'],
});

constructor(private fb: FormBuilder) {}

submit(): void {
  if (this.form.invalid) return;
  const value = this.form.getRawValue();     // { title, author, status }
  this.form.reset({ status: 'to-read' });
}
```
```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="title">
  @if (form.controls.title.touched && form.controls.title.errors?.['required']) {
    <small>Title is required</small>
  }
  <button [disabled]="form.invalid">Add</button>
</form>
```

### 8.8 Service and dependency injection
```ts
@Injectable({ providedIn: 'root' })        // one shared instance for the app
export class BookService {
  private books: Book[] = [];

  getBooks(): Observable<Book[]> {
    return of(this.books);
  }
}

// Using it (two equivalent styles)
constructor(private bookService: BookService) {}      // constructor injection
private bookService = inject(BookService);            // inject() function
```

### 8.9 HttpClient
```ts
// module style: HttpClientModule in imports   |   standalone: provideHttpClient()
getFilms(): Observable<Film[]> {
  return this.http.get<SwapiResponse>(this.api).pipe(
    map(response => response.result),
    catchError(() => of([])),              // fall back to an empty list on error
  );
}

addFilm(film: Film): Observable<Film> {
  return this.http.post<Film>(this.api, film);
}
```

### 8.10 Subscribing without leaks
```ts
// 1) Best in templates: async pipe unsubscribes for you
books$ = this.bookService.getBooks();
```
```html
@for (book of books$ | async; track book.id) { <li>{{ book.title }}</li> }
```
```ts
// 2) Manual subscribe: unsubscribe in ngOnDestroy (HTTP calls complete by themselves)
private subscription = new Subscription();

ngOnInit(): void {
  this.subscription.add(this.timer$.subscribe(v => this.tick = v));
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
```

### 8.11 RxJS operators you actually need
```ts
this.searchControl.valueChanges.pipe(
  debounceTime(300),                       // wait for the user to stop typing
  distinctUntilChanged(),                  // ignore repeated values
  map(text => text.trim().toLowerCase()),  // transform
  filter(text => text.length > 1),         // skip short input
  switchMap(text => this.service.search(text)),   // cancel the previous request
  tap(list => console.log(list)),          // side effect only (debugging)
  catchError(() => of([])),
).subscribe(results => this.results = results);
```
Rule of thumb: `map` changes values, `filter` drops values, `tap` peeks, `switchMap` swaps to a
new request, `debounceTime` slows down typing.

### 8.12 Routing
```ts
export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'reading', component: ReadingPageComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: '**', redirectTo: '' },                      // not found → home
  // standalone + lazy: { path: 'x', loadComponent: () => import('./x').then(m => m.XComponent) }
];
```
```html
<a routerLink="/reading" routerLinkActive="active">Reading</a>
<a [routerLink]="['/books', book.id]">Details</a>
<router-outlet />
```
```ts
constructor(private route: ActivatedRoute, private router: Router) {}

ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
}
goHome(): void {
  this.router.navigate(['/']);
}
```

### 8.13 Lifecycle hooks (order)
```ts
ngOnChanges(changes: SimpleChanges) {}   // an @Input changed (runs before ngOnInit)
ngOnInit() {}                            // first init: load data here, not in the constructor
ngAfterViewInit() {}                     // template and child views are ready
ngOnDestroy() {}                         // clean up subscriptions and timers
```

### 8.14 Pipes
```html
{{ price | currency }}                  <!-- $1,200.00 -->
{{ createdAt | date: 'dd/MM/yyyy' }}
{{ name | uppercase }}   {{ text | slice: 0:10 }}
{{ items | json }}                      <!-- great for debugging -->
{{ books$ | async }}
```
```ts
@Pipe({ name: 'initials', standalone: false })
export class InitialsPipe implements PipeTransform {
  transform(fullName: string): string {
    return fullName.split(' ').map(part => part[0]).join('').toUpperCase();
  }
}
```

### 8.15 Signals (new reactive state)
```ts
count = signal(0);
double = computed(() => this.count() * 2);       // derived value, auto-updates

increment(): void {
  this.count.update(value => value + 1);         // or this.count.set(10)
}
```
```html
<p>{{ count() }} × 2 = {{ double() }}</p>        <!-- call the signal with () -->
```

### 8.16 TypeScript utilities used in these exercises
```ts
type BookStatus = 'to-read' | 'reading' | 'read';          // union of literals
interface Book { id: number; title: string; status: BookStatus; note?: string }

type NewBook   = Omit<Book, 'id'>;                         // without id
type BookPatch = Partial<Book>;                            // every field optional
type BookCard  = Pick<Book, 'title' | 'status'>;           // only these fields
const byId: Record<number, Book> = {};                     // object used as a dictionary

enum Priority { Low = 'low', High = 'high' }               // string enum
```

### 8.17 Array methods and immutable updates
```ts
const titles   = books.map(book => book.title);                    // transform
const reading  = books.filter(book => book.status === 'reading');  // keep some
const found    = books.find(book => book.id === 3);                // first match or undefined
const hasRead  = books.some(book => book.status === 'read');       // any match?
const allRead  = books.every(book => book.status === 'read');      // all match?
const total    = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const sorted   = [...books].sort((a, b) => a.title.localeCompare(b.title));   // copy first!
const unique   = [...new Set(tags)];

// immutable add / update / remove
list = [...list, newItem];
list = list.map(item => item.id === id ? { ...item, done: !item.done } : item);
list = list.filter(item => item.id !== id);
```

### 8.18 Strings, objects and safe access
```ts
text.trim().toLowerCase().includes(term);    // case-insensitive contains
const { title, author } = book;              // destructuring
const copy = { ...book, status: 'read' };    // copy and override
const city = user?.address?.city ?? 'N/A';   // optional chaining + default
Math.max(0, ...ids) + 1;                     // next id (0 when the list is empty)
```

### 8.19 Minimal unit tests (Jasmine + TestBed)
```ts
describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookService);
  });

  it('returns the seeded books', (done) => {
    service.getBooks().subscribe(books => {
      expect(books.length).toBe(5);
      done();
    });
  });
});
```
```ts
describe('BookFormComponent', () => {
  let fixture: ComponentFixture<BookFormComponent>;
  let component: BookFormComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],     // non-standalone: declare it
      imports: [FormsModule],                // what its template needs
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('does not emit when the title is blank', () => {
    spyOn(component.addEvent, 'emit');
    component.titleInput = '   ';
    component.add();
    expect(component.addEvent.emit).not.toHaveBeenCalled();
  });
});
```
Standalone component tests use `imports: [TheComponent]` instead of `declarations`.

### 8.20 Useful CLI commands
```
ng new my-app --standalone=false          # new project, NgModule style
ng g c pages/reading-page --standalone=false --skip-tests
ng g s features/reading/services/book --skip-tests
ng g i models/book interface              # creates book.interface.ts
ng g pipe pipes/initials --standalone=false
ng serve                                  # dev server, http://localhost:4200
ng build                                  # production build into dist/
ng test                                   # Karma + Jasmine
```
