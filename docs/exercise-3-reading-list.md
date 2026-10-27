# Exercise 3 — Reading List (intermediate, HackerRank-style)

**Route:** `/reading` · **Target time:** 35 min · **Actual:** ~4 h in total across
stages (1 h to requirement 3, +1 h for 4–5, +1 h 30 for fixes and 6–7).
The exercise turned out harder than 1 and 2 (service + Observable, in-row editable
typed value, two combined filters, counters). The target was too tight.

## Overview
A reading list: add books, change a book's status, remove books, search, filter by
status, and see counters.

```
src/app/
├── models/book.interface.ts
├── pages/reading-page/                       parent: owns sourceBooks + filterBooks
└── features/reading/
    ├── components/book-form/                 @Output addEvent: Omit<Book,'id'>
    ├── components/book-list/                 @Input books, @Output emitRemove / emitUpdate
    └── services/book.service.ts              getBooks(): Observable<Book[]> via of()
```

## Score (87 / 100 at the last full review)
| # | Requirement | Points |
|---|---|---|
| 1 | Route `/reading` | 5 / 5 |
| 2 | Service + page load | 10 / 10 |
| 3 | Book form | 20 / 20 |
| 4 | Book list | 20 / 20 |
| 5 | Search (title/author, trimmed, case-insensitive) | 11 / 15 |
| 6 | Status filter combined with search | 7 / 10 |
| 7 | Counters from the full list | 8 / 10 |
| 8 | Code quality | 6 / 10 |

Progression: 37 → 71 → 78 → 82 → 87.

## Topics evaluated
Service + `Observable`/`of()`, `@Input`/`@Output` with typed payloads, `Omit<Book,'id'>`,
`<select>` with `[ngModel]` + `(ngModelChange)`, template-driven forms and `(ngSubmit)`,
combined filters, computed counters, immutable state updates, `data-testid` selectors.

## Issues found and how they were fixed (or still pending)
| Issue | Status |
|---|---|
| Parent did not bind `(addEvent)`, `(emitRemove)`, `(emitUpdate)` — nothing worked | Fixed |
| List empty on first load | Fixed |
| Search used `==` instead of `includes`, and filtered the previous result | Fixed |
| Form disable check tested the title twice; emitted untrimmed values | Fixed |
| Form built `id: Date.now()` | Fixed (`Omit<Book,'id'>`) |
| Radios instead of `<select>`; label "Finished" vs "Read" | Fixed |
| `<select ngModel>` inside a `<form>` without `name` (NG01352) | Fixed |
| Invalid empty-state HTML (`<li>` inside `<table>`) | Fixed |
| Duplicate / typo ids (`book-autor`, `{book.id}` instead of `{{ }}`) | Fixed |
| `(ngModelChange)` without `[ngModel]` → `$event` typed `Event` (NG5) | Fixed |
| `selectedStatus` / `selectedOption` start as `''` → first search returns nothing | **Pending** |
| Add / remove / status change reset the filtered list (`filterBooks = sourceBooks`) | **Pending** |
| `count-total` uses `filterBooks.length` instead of `sourceBooks.length` | **Pending** |
| Four near-identical branches in `search()`; dead code in `ngOnInit` | **Pending** |

### Readable fix for the pending items (keeps two lists)
```ts
selectedField: 'title' | 'author' = 'title';
searchText = '';
selectedStatus: BookStatus | 'all' = 'all';

search(): void {
  this.applyFilters();
}

private applyFilters(): void {
  const text = this.searchText.trim().toLowerCase();

  this.filterBooks = this.sourceBooks.filter(book => {
    const matchesStatus = this.selectedStatus === 'all' || book.status === this.selectedStatus;
    const matchesText = book[this.selectedField].toLowerCase().includes(text);
    return matchesStatus && matchesText;
  });
}
```
Call `this.applyFilters()` after `add`, `remove`, `updateOnlyStatus` and after loading
the books. Use `sourceBooks.length` for the total counter.

## Grading notes (fairness)
- Keeping `sourceBooks` + `filterBooks` is a valid pattern (it was suggested in Exercise 1).
- The spec did not say `id` vs `data-testid`, nor "filter as you type", so neither was penalized.

## Takeaways
- The jump from 37 to 71 came almost entirely from **wiring**: bind every child
  `@Output` in the parent the moment you create it.
- Styling (cards, headers, subtitle) is not graded in this kind of test; skip it until
  every requirement passes.
