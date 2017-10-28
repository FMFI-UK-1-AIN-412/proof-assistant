module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


initialModel =
    {}


view model =
    div [ class "content" ]
        [ text "It works" ]


update msg model =
    model


main =
    Html.beginnerProgram
        { view = view
        , update = update
        , model = initialModel
        }
