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

-   move SKU constants out of checkout.js
-   implement checkout as a class, as required
-   sensible eslint defaults
-   measure coverage
-   make sure a _user_ not a developer can add/remove specials
-   any good checkout system needs the ability to unscan an item - though it's not in the requirements
-   do reset in the constructor when i've got one
-   as well as specials, items should be taken from file
