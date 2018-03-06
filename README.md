Proof assistant
======

## Installation

```bash
elm-package install
```

(Answer `y` when prompted.)


## Building

```bash
elm-live src/Main.elm src/Zipper.elm src/ErrorHandler.elm src/Matcher.elm src/Editor.elm src/Proof.elm --open --pushstate --output=elm.js
```
