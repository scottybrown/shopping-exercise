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
yarn jest
```

## TODOs

-   turn on editor-based ESLinting to keep package count low
-   move SKU constants out of checkout.js
-   implement checkout as a class, as required
-   make sure tests cover nulls, undefined, etc
-   unit/integ tests
-   how are you _supposed_ to import in jest?
-   cover and test for large/floating point values/errors
-   sensible eslint defaults
