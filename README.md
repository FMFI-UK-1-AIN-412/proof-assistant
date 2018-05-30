Proof assistant
======

The proof assistant is available at https://fmfi-uk-1-ain-412.github.io/proof-assistant/

## Installation

```bash
elm-package install
```

(Answer `y` when prompted.)


## Building

```bash
elm-live src/Main.elm src/Zipper.elm src/Editor.elm src/Core/Proof.elm src/Core/Matcher.elm src/History.elm src/Exporting/Json/Decode.elm src/Exporting/Json/Encode.elm src/Exporting/Ports.elm src/Core/Types.elm src/Core/Validator.elm --open --pushstate --output=elm.js
```
