module Main exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)


-- Types


type Msg
    = Reset
    | Simplify


type alias Model =
    { expression : Boolean }


type Boolean
    = T
    | F
    | Not Boolean
    | And Boolean Boolean
    | Or Boolean Boolean



-- Functions


simplify : Boolean -> Boolean
simplify =
    valuate >> boolToBoolean


boolToBoolean : Bool -> Boolean
boolToBoolean bool =
    if bool then
        T
    else
        F


valuate : Boolean -> Bool
valuate expression =
    case expression of
        T ->
            True

        F ->
            False

        Not sub ->
            not <| valuate sub

        And sub1 sub2 ->
            valuate sub1 && valuate sub2

        Or sub1 sub2 ->
            valuate sub1 || valuate sub2


initialModel : Model
initialModel =
    { expression = And (Or T F) (Not <| And T F) }


update : Msg -> Model -> Model
update msg model =
    case msg of
        Reset ->
            initialModel

        Simplify ->
            { model | expression = simplify model.expression }


view : Model -> Html Msg
view model =
    div []
        [ text <| toString model.expression
        , button [ onClick Simplify ] [ text "Simplify" ]
        , button [ onClick Reset ] [ text "Reset" ]
        ]


main : Program Never Model Msg
main =
    Html.beginnerProgram { model = initialModel, view = view, update = update }
