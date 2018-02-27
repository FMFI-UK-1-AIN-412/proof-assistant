module ErrorHandler exposing (handleErrors)

import Zipper


type alias Handler =
    Zipper.Zipper -> Maybe String


errorHandlers : List Handler
errorHandlers =
    [ Zipper.getError, Zipper.getVyplyvanieErrors ]


handleErrors : Zipper.Zipper -> Result String String
handleErrors zipper =
    handleErrorsTmp zipper errorHandlers


handleErrorsTmp : Zipper.Zipper -> List Handler -> Result String String
handleErrorsTmp zipper errorHandlers =
    case errorHandlers of
        [] ->
            Ok "OK"

        handler :: rest ->
            case handler zipper of
                Nothing ->
                    handleErrorsTmp zipper rest

                Just error ->
                    Err error
