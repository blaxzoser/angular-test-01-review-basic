# Exercise 2 — Task Board (basic/intermediate)

**Route:** `/tasks` · **Target time:** 30 min · **Actual:** 1 h 30 min

## Overview
A task board where tasks can be added, completed and removed, with a computed
"X of Y done" counter. Same techniques as Exercise 1, new domain.

```
TaskPageComponent (parent, owns tasks[])
 ├─ TaskFormComponent  @Output taskAdded  ──► add(task)
 └─ TaskListComponent  @Input listTasks
                       @Output sentToggle ──► toggle(id)
                       @Output removeNow  ──► remove(id)
```

## Feature checklist
| Point | Result |
|---|---|
| Route `/tasks`, declared in `AppModule` | ✅ |
| `Task` interface | 🟡 all fields except `id` were optional |
| 4 seeded tasks | ✅ |
| Form: `ngModel`, priority, trim, disabled button, clear | 🟡 no Enter key |
| Page adds task immutably (spread) | ✅ |
| List: `@for` + `track task.id`, `@empty`, priority badge, strikethrough | ✅ |
| Toggle with `map`, remove with `filter`, computed counter | ✅ |
| Remove button visible | ❌ `<input type="button">` with no value |

## Topics evaluated
`@for`/`@empty`, immutable updates (`map`, `filter`, spread), `[class.x]` bindings,
enums vs union types, computed values vs stored values, child-to-parent events.

## Issues found and how to fix them
1. **Enter did not add the task.** Add `(keyup.enter)` and put the guard *inside*
   `add()`, because Enter bypasses a disabled button:
   ```ts
   add(): void {
     const title = this.selectedTitle.trim();
     if (!title) return;
     ...
   }
   ```
2. **Invisible Remove button.** Use
   `<button type="button" (click)="remove(task.id)">Remove</button>`.
3. **Loose types.** `title?`, `priority?`, `done?` should be required.
4. **Form created the id** with `Date.now()` (can collide). The parent owns the list,
   so the parent creates ids: `Math.max(0, ...ids) + 1`.
5. **Enum vs string literal.** `task.priority === 'low'` against a string enum can be
   flagged by `strictTemplates`. Use a union type or compare with `Priority.Low`.
6. **Naming drift.** Folder `layout/tasks-page`, file `task-page`, selector
   `app-tasks-page`. Pick one name and use it everywhere.
7. **Small cleanup.** leftover `console.log`, `!=` instead of `!==`, `this.` in the
   template, two `<h1>`, `<li>` without `list-group-item`.

## Takeaways
- Immutable updates and `@for`/`@empty` were correct on the first try.
- The misses were small UI details (Enter key, a button with no text).
