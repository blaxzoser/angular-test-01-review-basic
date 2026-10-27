# CLAUDE.md

Guidance for Claude (and any other assistant) working in this repository.

## Purpose
This is an **Angular interview-practice repo**. The owner is returning to Angular after
several years and uses it to practise HackerRank-style coding challenges (about 1 hour each).
Each exercise adds a **new page and new components**; earlier exercises are kept as they are.

When helping here:
- Do **not** modify earlier exercises unless explicitly asked. New work goes in new files.
- When asked to *review* an exercise, read the code, score it against the exercise's
  requirements table in `docs/`, and explain each deduction concretely (scenario → result).
- Prefer readable, multi-line code over clever one-liners in suggestions.
- Keep the existing patterns (two lists `source` + `filtered` is accepted; see docs).

## Tech stack
- Angular **19.2**, **NgModule-based** (`standalone: false` on every component)
- TypeScript 5.7 with `strict` and `strictTemplates`
- Template-driven forms (`FormsModule`), RxJS 7.8, Bootstrap 5.3
- Tests: Karma + Jasmine (default CLI setup)

## Commands
```bash
npm install
ng serve        # http://localhost:4200
ng build
ng test
# generate (always non-standalone, no spec files for exercises)
ng g c pages/<name>-page --standalone=false --skip-tests
ng g c features/<feature>/components/<name> --standalone=false --skip-tests
ng g s features/<feature>/services/<name> --skip-tests
```

## Project structure
```
src/app/
├── app.module.ts            # declares ALL components; imports Forms/Http/Router
├── app.routes.ts            # '' → Home, 'tasks' → Tasks, 'reading' → Reading
├── app.component.*          # shell: only <router-outlet />
├── app.config.ts            # standalone-style config, currently UNUSED (main.ts uses AppModule)
├── models/                  # interfaces: film, task, book, swapi-response, ...
├── pages/
│   ├── home-page/           # Exercise 1 parent
│   └── reading-page/        # Exercise 3 parent
├── layout/
│   └── tasks-page/          # Exercise 2 parent (TaskPageComponent)
└── features/
    ├── home/                # Exercise 1: search-box, films-results, table-results (unused), film service
    ├── tasks/               # Exercise 2: task-form, task-list
    └── reading/             # Exercise 3: book-form, book-list, book.service
docs/                        # exercise write-ups and the cheat sheet
```

### Exercises
| # | Route | Parent component | Children | Doc |
|---|---|---|---|---|
| 1 | `/` | `pages/home-page` | `search-box`, `films-results` | `docs/exercise-1-film-search.md` |
| 2 | `/tasks` | `layout/tasks-page` | `task-form`, `task-list` | `docs/exercise-2-task-board.md` |
| 3 | `/reading` | `pages/reading-page` | `book-form`, `book-list`, `BookService` | `docs/exercise-3-reading-list.md` |

`docs/cheat-sheet-common-mistakes.md` lists the recurring mistakes, Angular errors seen,
copy-ready patterns and basic snippets. Update it when a new recurring mistake appears.

## Conventions
- **Parent owns the data**; children receive `@Input()` and emit `@Output()` events.
- Bind every child `@Output` in the parent template.
- **Immutable updates**: spread to add, `map` to update, `filter` to remove.
- The **parent creates ids**; forms emit `Omit<Model, 'id'>`.
- New control flow: `@for (...; track x.id)`, `@if`, `@empty`.
- Required fields in interfaces; union types for statuses (`'to-read' | 'reading' | 'read'`).
- `data-testid` attributes on elements a test would query; ids must be unique.
- `[(ngModel)]` inside a `<form>` needs a `name` attribute.
- Counters read the full (source) list, not the filtered one.
- No `console.log`, unused imports or `this.` in templates in finished work.

## Known open items
- Exercise 3 page: initial filter values are `''` (first search returns nothing), filters
  reset after add/remove/update, `count-total` uses the filtered list. A readable
  `applyFilters()` fix is described in `docs/exercise-3-reading-list.md`.
- `HttpClientModule` is deprecated in Angular 19; `import '@angular/compiler'` in
  `app.module.ts` is unnecessary; `app.component.spec.ts` is still the broken CLI default.
- `node_modules` was installed on Windows; run `npm install` before building on another OS.
