module ErrorHandler exposing (Status(..), handleErrors)

import Zipper


type Status
    = Ok
    | Error String


errorHandlers : List (Zipper.Zipper -> Maybe String)
errorHandlers =
    [ Zipper.getError ]


handleErrors : Zipper.Zipper -> Status
handleErrors zipper =
    handleErrorsTmp zipper errorHandlers


handleErrorsTmp : Zipper.Zipper -> List (Zipper.Zipper -> Maybe String) -> Status
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
