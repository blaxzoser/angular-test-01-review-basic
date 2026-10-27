# Graph Report - test-01-review-basic  (2026-10-26)

## Corpus Check
- Corpus is ~8,690 words - fits in a single context window. You may not need a graph.

## Summary
- 253 nodes · 424 edges · 12 communities (10 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.9)
- Token cost: 90,189 input · 0 output

## Community Hubs (Navigation)
- Ex1 Film Search (SWAPI)
- angular.json Build Config
- Ex2 Task Form & Deps
- AppModule & Bootstrap
- Ex3 Reading List Components
- Docs, Conventions & Templates
- App Shell & Routing
- Runtime Dependencies
- Dev Dependencies
- Build Options
- Book Form

## God Nodes (most connected - your core abstractions)
1. `@angular/core` - 25 edges
2. `Film` - 16 edges
3. `ReadingPageComponent` - 14 edges
4. `SearchBoxComponent` - 13 edges
5. `TaskPageComponent` - 12 edges
6. `Book` - 12 edges
7. `TaskListComponent` - 10 edges
8. `options` - 9 edges
9. `FilmServiceService` - 9 edges
10. `BookListComponent` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Unbound @Output Mistake` --references--> `ReadingPage template`  [INFERRED]
  docs/cheat-sheet-common-mistakes.md → src/app/pages/reading-page/reading-page.component.html
- `AppComponent` --references--> `AppComponent router-outlet shell`  [EXTRACTED]
  src/app/app.component.ts → src/app/app.component.html
- `FilmResultsComponent` --references--> `FilmsResults template`  [EXTRACTED]
  src/app/features/home/components/films-results/films-results.component.ts → src/app/features/home/components/films-results/films-results.component.html
- `SearchBoxComponent` --references--> `SearchBox template`  [EXTRACTED]
  src/app/features/home/components/search-box/search-box.component.ts → src/app/features/home/components/search-box/search-box.component.html
- `TableResultsComponent` --references--> `TableResults template (unused)`  [EXTRACTED]
  src/app/features/home/components/table-results/table-results.component.ts → src/app/features/home/components/table-results/table-results.component.html

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Parent owns data, children emit events** — claude_parent_owns_data, src_app_pages_home_page_home_page_component_template, src_app_layout_tasks_page_task_page_component_template, src_app_pages_reading_page_reading_page_component_template [INFERRED 0.85]
- **Exercise write-ups feeding the cheat sheet** — docs_exercise_1_film_search_film_search_exercise, docs_exercise_2_task_board_task_board_exercise, docs_exercise_3_reading_list_reading_list_exercise, docs_cheat_sheet_common_mistakes_cheat_sheet [EXTRACTED 1.00]

## Communities (12 total, 2 thin omitted)

### Community 0 - "Ex1 Film Search (SWAPI)"
Cohesion: 0.10
Nodes (11): rxjs, FilmResultsComponent, SearchBoxComponent, FilmServiceService, Film, FilmProperties, Social, PartnerDiscount (+3 more)

### Community 1 - "angular.json Build Config"
Cohesion: 0.06
Nodes (34): build, extract-i18n, serve, test, builder, configurations, defaultConfiguration, cli (+26 more)

### Community 2 - "Ex2 Task Form & Deps"
Cohesion: 0.09
Nodes (9): @angular/platform-browser, TaskFormComponent, TaskListComponent, TaskPageComponent, Priority, High, Low, Medium (+1 more)

### Community 3 - "AppModule & Bootstrap"
Cohesion: 0.07
Nodes (27): name, private, scripts, build, ng, start, test, watch (+19 more)

### Community 4 - "Ex3 Reading List Components"
Cohesion: 0.13
Nodes (6): @angular/core, BookListComponent, BookService, Book, BookStatus, ReadingPageComponent

### Community 5 - "Docs, Conventions & Templates"
Cohesion: 0.14
Nodes (22): CLAUDE.md Repo Guidance, NgModule-based Angular 19 (standalone: false), Cheat Sheet: Common Mistakes, NG01352 ngModel name attribute error, Normalized Value Not Used Mistake, Unbound @Output Mistake, Exercise 1 Film Search, Scope Creep (API call, extra input, unused component) (+14 more)

### Community 6 - "App Shell & Routing"
Cohesion: 0.13
Nodes (9): @angular/common, @angular/router, AppComponent, AppComponent router-outlet shell, appConfig, routes, TableResultsComponent, HomePageComponent (+1 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.17
Nodes (12): dependencies, @angular/common, @angular/compiler, @angular/core, @angular/forms, @angular/platform-browser, @angular/platform-browser-dynamic, @angular/router (+4 more)

### Community 8 - "Dev Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, @angular/cli, @angular/compiler-cli, @angular-devkit/build-angular, jasmine-core, karma, karma-chrome-launcher, karma-coverage (+4 more)

### Community 9 - "Build Options"
Cohesion: 0.29
Nodes (10): options, assets, browser, index, outputPath, polyfills, scripts, styles (+2 more)

## Knowledge Gaps
- **19 isolated node(s):** `bootstrap`, `tslib`, `zone.js`, `@angular-devkit/build-angular`, `@angular/cli` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 119 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@angular/core` connect `Ex3 Reading List Components` to `Ex1 Film Search (SWAPI)`, `Ex2 Task Form & Deps`, `AppModule & Bootstrap`, `App Shell & Routing`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `bootstrap`, `tslib`, `zone.js` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ex1 Film Search (SWAPI)` be split into smaller, more focused modules?**
  _Cohesion score 0.09672830725462304 - nodes in this community are weakly interconnected._
- **Why does `ReadingPageComponent` connect `Ex3 Reading List Components` to `Docs, Conventions & Templates`, `App Shell & Routing`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Should `angular.json Build Config` be split into smaller, more focused modules?**
  _Cohesion score 0.06050420168067227 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime Dependencies` to `AppModule & Bootstrap`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `Ex2 Task Form & Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.09032258064516129 - nodes in this community are weakly interconnected._