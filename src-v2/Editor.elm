module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

--import ErrorHandler

import Bootstrap.Button as Button
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Html
import Html.Attributes
import Html.Events
import Proof
import Zipper


-- Model


type alias Model =
    { proof : Zipper.Zipper }


initialModel : Model
initialModel =
    { proof =
        (Zipper.create <| Proof.createFormulaStep "(a->b)")
            |> Zipper.add (Proof.createFormulaStep "a")
            |> Zipper.down
            |> Zipper.add (Proof.createFormulaStep "b")
            |> Zipper.down
            |> Zipper.addCases
    }



-- Update


type Msg
    = Todo


update : Msg -> Model -> Model
update msg model =
    case msg of
        Todo ->
            model



-- Helpers


emptyNode : Html.Html Msg
emptyNode =
    Html.text ""


innerStyle : Html.Attribute Msg
innerStyle =
    Html.Attributes.style
        [ ( "border", "1px solid #cfcfcf" )
        , ( "padding", "20px 20px 20px 30px" )
        , ( "box-shadow", "0 0 5px #cfcfcf" )
        , ( "margin-bottom", "20px" )
        ]



-- Render functions


render : Model -> Html.Html Msg
render model =
    emptyNode



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
