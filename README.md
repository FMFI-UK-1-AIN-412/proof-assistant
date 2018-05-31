Proof assistant
======

The proof assistant is available at https://fmfi-uk-1-ain-412.github.io/proof-assistant/. For information how the proof assistant works see the [user guide](https://github.com/FMFI-UK-1-AIN-412/proof-assistant/blob/master/docs/USER_GUIDE.md).

## Development

### Prerequisites

You must have [Elm](https://guide.elm-lang.org/install.html) and [elm-live](https://github.com/architectcodes/elm-live#installation) installed.

### Installation
Install the required packages for the proof assistant.

```bash
elm-package install
```

(Answer `y` when prompted.)


### Building
To compile the source code and run a live server run the following command:
```bash
elm-live src/Main.elm src/Zipper.elm src/Editor.elm src/Core/Proof.elm src/Core/Matcher.elm src/History.elm src/Exporting/Json/Decode.elm src/Exporting/Json/Encode.elm src/Exporting/Ports.elm src/Core/Types.elm src/Core/Validator.elm --open --pushstate --output=elm.js
```
