# Angular Interview Practice

Hands-on Angular 19 exercises for preparing **HackerRank-style coding interviews**.
Each exercise is a small, self-contained feature (route + parent page + child components)
built under a time limit, then reviewed, scored and fixed. The write-ups and a cheat sheet of
common mistakes live in [`docs/`](docs).

![Angular](https://img.shields.io/badge/Angular-19.2-dd0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952b3?logo=bootstrap)

## Exercises

| # | Feature | Route | What it practises | Write-up |
|---|---|---|---|---|
| 1 | **Film Search** | `/` | `@Input`/`@Output`, `ngModel`, case-insensitive filtering, empty state | [exercise-1](docs/exercise-1-film-search.md) |
| 2 | **Task Board** | `/tasks` | form → parent events, immutable add/toggle/remove, computed counter, badges | [exercise-2](docs/exercise-2-task-board.md) |
| 3 | **Reading List** | `/reading` | service + `Observable`, typed `Omit<>` events, row editing with `<select>`, search + status filter, counters | [exercise-3](docs/exercise-3-reading-list.md) |

📘 **[Cheat sheet: common mistakes, Angular errors and basic snippets](docs/cheat-sheet-common-mistakes.md)**

## Concepts covered
- NgModule-based components (`standalone: false`) and routing
- Parent/child communication with `@Input()` and `@Output()` / `EventEmitter`
- Template-driven forms: `FormsModule`, `[(ngModel)]`, `(ngSubmit)`, `(ngModelChange)`
- New control flow: `@for` with `track`, `@if`, `@empty`
- Immutable state updates (`map`, `filter`, spread)
- Services, dependency injection, `HttpClient` and RxJS (`of`, `map`, `tap`)
- TypeScript utility types (`Omit`, union types) and strict templates

## Project structure
```
src/app/
├── models/                 # Film, Task, Book interfaces
├── pages/                  # route-level parent components
│   ├── home-page/          # Exercise 1
│   └── reading-page/       # Exercise 3
├── layout/tasks-page/      # Exercise 2
└── features/
    ├── home/               # search-box, films-results, film service
    ├── tasks/              # task-form, task-list
    └── reading/            # book-form, book-list, book service
docs/                       # exercise write-ups + cheat sheet
```

## Getting started
Requirements: Node.js 18.19+ (or 20+) and the Angular CLI 19.

```bash
git clone <this-repo-url>
cd test-01-review-basic
npm install
ng serve
```
Open `http://localhost:4200/`, then `/tasks` and `/reading`.

| Command | Description |
|---|---|
| `ng serve` | Dev server with live reload |
| `ng build` | Production build into `dist/` |
| `ng test` | Unit tests (Karma + Jasmine) |

## How the practice works
1. Get a requirements table (HackerRank-style, with points and test ids).
2. Build it against a timer, no styling until every requirement passes.
3. Review: score each requirement, list concrete bugs, fix, re-score.
4. Add new recurring mistakes to the cheat sheet.

## License
Personal study project — free to use for learning.
