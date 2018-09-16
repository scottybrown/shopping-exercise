# Shopping example

-   Just a tiny pure `JavaScript` project
-   Uses `yarn` to manage dependencies
-   The only dependency is Jest for tests
-   No transpiling is used to keep packge count and complexity down

## Usage

Installation:

```
yarn
```

Tests:

```
yarn jest --watch
```

## TODOs

-   turn on editor-based ESLinting to keep package count low
-   move SKU constants out of checkout.js
-   implement checkout as a class, as required
-   make sure tests cover nulls, undefined, etc
-   unit/integ tests
-   cover and test for large/floating point values/errors
-   sensible eslint defaults
-   measure coverage
-   make sure a _user_ not a developer can add/remove specials
-   probably need the ability to "unscan" an item - removing the special and re-applying it if re-scanned
-   do reset in the constructor when i've got one
-   handle missing items gracefully
-   can scan in any order - cover that with a test case
