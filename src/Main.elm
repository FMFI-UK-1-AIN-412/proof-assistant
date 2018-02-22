module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Json.Decode as Decode
import Zipper
import ErrorHandler
import Bootstrap.Form.InputGroup as InputGroup
import Bootstrap.Form.Input as Input
import Bootstrap.Form as Form
import Bootstrap.Form.Checkbox as Checkbox
import Bootstrap.Grid as Grid
import Bootstrap.CDN as CDN


type alias Model =
    { zipper : Zipper.Zipper }


type Msg
    = EditZipper Zipper.Zipper String


initialModel : Model
initialModel =
    { zipper =
        Zipper.Empty
            |> Zipper.add (Zipper.createElement "(p -> q)")
            |> Zipper.add (Zipper.createElement "((q -> r) & (r-> q))")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(q -> r)")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(r -> q)")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(p -> r)")
            |> Zipper.add (Zipper.createElement "p")
            |> Zipper.goDown 1
            |> Zipper.add (Zipper.createElement "q")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "r")
            |> Zipper.goRoot
    }


showSimpleTree : Zipper.Zipper -> String
showSimpleTree zipper =
    let
        data =
            case Zipper.getValue zipper of
                Just ans ->
                    ans

                Nothing ->
                    ""

        showChildren =
            String.join "|" <| List.map showSimpleTree (Zipper.getChildren zipper)
    in
        if showChildren == "" then
            data
        else
            "(" ++ data ++ " --> " ++ showChildren ++ ")"


showEditableTree : Zipper.Zipper -> Html Msg
showEditableTree zipper =
    Form.form []
        [ ul [] (showEditableTree2 zipper)
        ]


renderLine : Zipper.Zipper -> Html Msg
renderLine zipper =
    let
        value_text =
            case Zipper.getValue zipper of
                Just x ->
                    x

                Nothing ->
                    "ERROR!!!"

        ( errorNode, groupStatus, inputStatus ) =
            case ErrorHandler.handleErrors zipper of
                ErrorHandler.Ok ->
                    ( text "", Form.groupSuccess, Input.success )

                ErrorHandler.Error error ->
                    ( Form.validationText [] [ text error ], Form.groupDanger, Input.danger )
    in
        li []
            [ Form.group [ groupStatus ]
                [ InputGroup.config
                    (InputGroup.text [ Input.placeholder "Formula", Input.value value_text, inputStatus, Input.onInput <| EditZipper zipper ])
                    |> InputGroup.predecessors
                        [ InputGroup.span [] [ Checkbox.checkbox [] "" ] ]
                    |> InputGroup.view
                , errorNode
                ]
            ]


showEditableTree2 : Zipper.Zipper -> List (Html Msg)
showEditableTree2 zipper =
    let
        mainElement =
            renderLine zipper

        all =
            List.map showEditableTree2 (Zipper.getChildren zipper)

        rest =
            List.foldr (++) [] (List.drop 1 all)

        maybeFirst =
            List.head all
    in
        case maybeFirst of
            Nothing ->
                [ mainElement, ul [] rest ]

            Just first ->
                [ mainElement, ul [] rest ] ++ first


view : Model -> Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet -- creates an inline style node with the Bootstrap CSS
        , Grid.row []
            [ Grid.col []
                [ h1 [] [ text "Proof assistant" ]
                , p [] [ text (showSimpleTree <| Zipper.goRoot model.zipper) ]
                , hr [] []
                , showEditableTree <| Zipper.goRoot model.zipper
                ]
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newZipper =
            case msg of
                EditZipper zipper str ->
                    Zipper.editValue zipper (Zipper.createElement str)

        --RemoveChildren zipper ->
        --    Zipper.removeChildren zipper
        --AddChild zipper tree ->
        --    Zipper.addChild zipper tree
    in
        ( { model | zipper = newZipper }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = subscriptions
        }
