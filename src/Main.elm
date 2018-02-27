module Main exposing (..)

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Form as Form
import Bootstrap.Form.Checkbox as Checkbox
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Bootstrap.Grid as Grid
import ErrorHandler
import Html
import Html.Attributes
import Html.Events
import Zipper


type alias Model =
    { proof : Zipper.Zipper }


type Msg
    = AddToZipper Zipper.Zipper
    | EditZipper Zipper.Zipper String
    | MouseHovered Zipper.Zipper Bool
    | DeleteProofStep Zipper.Zipper


initialModel : Model
initialModel =
    { proof =
        Zipper.create "---"
            |> Zipper.add (Zipper.createPremis "(p -> q)")
            |> Zipper.goDownOrStop
            |> Zipper.add (Zipper.createPremis "((q -> r) & (r-> q))")
            |> Zipper.goDownOrStop
            |> Zipper.add (Zipper.createElement "(q -> r)")
            |> Zipper.goDownOrStop
            |> Zipper.add (Zipper.createElement "(r -> q)")
            |> Zipper.goDownOrStop
            |> Zipper.add (Zipper.createElement "(p -> r)")
            |> Zipper.goRoot
    }


renderTextProof : Zipper.Zipper -> String
renderTextProof zipper =
    let
        data =
            Zipper.getValue zipper

        showChildren =
            case Zipper.goDown zipper of
                Nothing ->
                    ""

                Just nextZipper ->
                    renderTextProof nextZipper
    in
    data ++ " => " ++ showChildren


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.ul [ Html.Attributes.style [ ( "padding-left", "0" ) ] ] (renderProofHelper zipper) ]


renderProofHelper : Zipper.Zipper -> List (Html.Html Msg)
renderProofHelper zipper =
    let
        base =
            renderLine zipper

        rest =
            case Zipper.goDown zipper of
                Nothing ->
                    []

                Just nextZipper ->
                    renderProofHelper nextZipper
    in
    base :: rest


renderButtons : Zipper.Zipper -> Html.Html Msg
renderButtons zipper =
    Html.div []
        [ Button.button
            [ Button.onClick <| AddToZipper zipper
            , Button.outlineSuccess
            , Button.attrs [ Html.Attributes.class "ml-1" ]
            ]
            [ Html.text "+" ]
        , Button.button
            [ Button.onClick <| DeleteProofStep zipper
            , Button.outlineDanger
            , Button.attrs [ Html.Attributes.class "ml-1" ]
            ]
            [ Html.text "x" ]
        ]


renderLine : Zipper.Zipper -> Html.Html Msg
renderLine zipper =
    let
        value_text =
            Zipper.getValue zipper

        ( errorNode, groupStatus, inputStatus ) =
            case ErrorHandler.handleErrors zipper of
                Ok _ ->
                    ( Html.text "", Form.groupSuccess, Input.success )

                Err error ->
                    ( Form.validationText [] [ Html.text error ], Form.groupDanger, Input.danger )
    in
    Form.group [ groupStatus ]
        [ InputGroup.config
            (InputGroup.text
                [ Input.placeholder "Formula"
                , Input.value value_text
                , Input.onInput <| EditZipper zipper
                , inputStatus
                ]
            )
            |> InputGroup.successors
                [ InputGroup.button
                    [ Button.outlineInfo
                    , Button.onClick <| MouseHovered zipper (not (Zipper.getShowButtons zipper))
                    ]
                    [ Html.text "?" ]
                ]
            |> InputGroup.view
        , if Zipper.getShowButtons zipper then
            renderButtons zipper
          else
            Html.text ""
        , errorNode
        ]


view : Model -> Html.Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ Html.h1 [] [ Html.text "Proof assistant" ]
                , Html.p [] [ Html.text (renderTextProof <| Zipper.goRoot model.proof) ]
                , Html.hr [] []
                , renderProof <| Zipper.goRoot model.proof
                ]
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        AddToZipper zipper ->
            ( { model | proof = Zipper.add (Zipper.createElement "") zipper }, Cmd.none )

        EditZipper zipper value ->
            ( { model | proof = Zipper.edit value zipper }, Cmd.none )

        MouseHovered zipper state ->
            ( { model | proof = Zipper.changeShowButtons state zipper }, Cmd.none )

        DeleteProofStep zipper ->
            ( { model | proof = Zipper.delete zipper }, Cmd.none )


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
