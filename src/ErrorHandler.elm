module ErrorHandler exposing (Status(..), handleErrors)

import Zipper


type Status
    = Ok
    | Error String


type alias Handler =
    Zipper.Zipper -> Maybe String


errorHandlers : List Handler
errorHandlers =
    [ Zipper.getError, Zipper.getVyplyvanieErrors ]


handleErrors : Zipper.Zipper -> Status
handleErrors zipper =
    handleErrorsTmp zipper errorHandlers


handleErrorsTmp : Zipper.Zipper -> List Handler -> Status
handleErrorsTmp zipper errorHandlers =
    case errorHandlers of
        [] ->
            Ok

        handler :: rest ->
            case handler zipper of
                Nothing ->
                    handleErrorsTmp zipper rest

                Just error ->
                    Error error
