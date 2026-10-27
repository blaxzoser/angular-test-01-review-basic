# Exercise 1 — Film Search (basic)

**Route:** `/` · **Target time:** 15 min · **Actual:** 1 h 30 min

## Overview
A parent page holds a hardcoded list of films. A search box child emits the typed
term upward, the parent filters the list, and a results child renders it.

```
HomePageComponent (parent, owns the data)
 ├─ SearchBoxComponent   @Output search  ──► parent.onSearch(term)
 └─ FilmResultsComponent @Input  films   ◄── parent.filterFilms
```

## Feature checklist (what was asked)
| Point | Result |
|---|---|
| A1. Routing fixed (`component:` instead of `loadComponent`, matches the NgModule setup) | ✅ |
| A2. Home page renders once (`<router-outlet />` only) | ✅ |
| B1. `Film` interface + hardcoded films | ✅ (10 films) |
| B2. SearchBox with `[(ngModel)]`, `@Output`, Enter or click | ✅ |
| B3. Case-insensitive filter in the parent | ❌ bug (see below) |
| B4. `@Input` + table with `@for` and `track` | 🟡 used `*ngFor` + `trackBy` (works, older syntax) |
| B5. Empty state with `@if` | 🟡 used `*ngIf` (works, older syntax) |

## Topics evaluated
- Components, `@Component`, declarations in `AppModule` (non-standalone)
- Routing: `component:` vs `loadComponent` (lazy loading needs standalone)
- Parent ↔ child: `@Input()` down, `@Output() EventEmitter` up
- Template-driven forms: `FormsModule`, `[(ngModel)]`, `(keyup.enter)`
- List rendering and empty states
- Services and `HttpClient` (added by the student beyond the brief)

## Issues found and how to fix them
1. **Normalized value not used.**
   ```ts
   const term = value.trim().toLowerCase();
   ... .includes(value)      // BUG: raw value
   ```
   Typing `Mat` returned nothing. Fix: use `term` everywhere after normalizing.
2. **Empty on first load.** `filterFilms` started as `[]`, so the page said
   "No films found". Fix: `this.filterFilms = [...this.fakeFilms]` in `ngOnInit`.
3. **Scope creep (the main time sink).** API call in `SearchBox.ngOnInit`, a second
   search input, an old `TableResultsComponent` still declared but unused.
   Fix: finish the stated requirements first, add extras only afterwards.
4. **Service subscribed twice.** `getFilms()` called `.subscribe()` for logging and
   then returned the same observable, so each call hit the API twice.
   Fix: use `tap(...)` for logging.
5. **Layout.** `Title` column hidden on small screens while `Id` stayed visible;
   `colspan="5"` on a 4-column table.
6. **Small cleanup.** `this.` in templates, unused imports, `import '@angular/compiler'`
   hack in `AppModule`, deprecated `HttpClientModule` in Angular 19.

## Correct core
```ts
onSearch(value: string) {
  const term = value.trim().toLowerCase();
  this.filterFilms = term
    ? this.fakeFilms.filter(f => f.title.toLowerCase().includes(term))
    : [...this.fakeFilms];
}
```
```html
@for (film of films; track film._id) {
  <tr><td>{{ film.title }}</td><td>{{ film.year }}</td><td>{{ film.genre }}</td></tr>
} @empty {
  <tr><td colspan="3">No films found.</td></tr>
}
```

## Takeaways
- Structure was right; one wrong variable name cost the filter.
- Do not add anything that is not in the requirements until they all pass.
