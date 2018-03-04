module Editor exposing (Model, Msg(..), initialModel, render, update)

import Bootstrap.Button as Button
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import ErrorHandler
import Html
import Html.Attributes
import Zipper


-- Model


type alias Model =
    { proof : Zipper.Zipper }


initialModel : Model
initialModel =
    { proof =
        Zipper.create "(q -> p)"
            |> Zipper.add (Zipper.createElement "(p -> q)")
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "((q -> r) & (r-> q))")
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "(q -> r)")
            |> Zipper.toggleContradiction
            |> Zipper.enterContradictionOrStop
            |> Zipper.toggleContradiction
            |> Zipper.add (Zipper.createElement "(r -> q)")
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "(p -> r)")
            |> Zipper.upOrStop
            |> Zipper.leaveContradictionOrStop
            |> Zipper.add (Zipper.createElement "tm")
            |> Zipper.root
    }



-- Update


type Msg
    = AddToZipper Zipper.Zipper
    | EditZipper Zipper.Zipper String
    | MouseHovered Zipper.Zipper Bool
    | DeleteProofStep Zipper.Zipper
    | MakeContradiction Zipper.Zipper


update : Msg -> Model -> Model
update msg model =
    case msg of
        AddToZipper zipper ->
            { model | proof = Zipper.add (Zipper.createElement "") zipper }

        EditZipper zipper value ->
            { model | proof = Zipper.edit value zipper }

        MouseHovered zipper state ->
            { model | proof = Zipper.changeShowButtons state zipper }

        DeleteProofStep zipper ->
            { model | proof = Zipper.delete zipper }

        MakeContradiction zipper ->
            { model | proof = Zipper.toggleContradiction zipper }



-- View


render : Model -> Html.Html Msg
render model =
    renderProof <| Zipper.root model.proof



-- Helpers


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form []
        [ Html.ul
            [ Html.Attributes.style [ ( "padding-left", "0" ) ] ]
            (renderProofHelper zipper)
        ]


renderProofHelper : Zipper.Zipper -> List (Html.Html Msg)
renderProofHelper zipper =
    let
        base =
            renderLine zipper

        rest =
            case Zipper.down zipper of
                Nothing ->
                    []

                Just nextZipper ->
                    renderProofHelper nextZipper
    in
    base :: rest


renderButtons : Zipper.Zipper -> String -> Html.Html Msg
renderButtons zipper contradictionText =
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
        , Button.button
            [ Button.onClick <| MakeContradiction zipper
            , Button.outlineInfo
            , Button.attrs [ Html.Attributes.class "ml-1" ]
            ]
            [ Html.text contradictionText ]
        ]


renderLine : Zipper.Zipper -> Html.Html Msg
renderLine zipper =
    let
        ( contradictionText, disabled, contradictionBase ) =
            case Zipper.getProofTypeFromSteps zipper.steps of
                Zipper.Normal _ ->
                    ( "Contradict", False, Html.text "" )

                Zipper.Contradiction _ _ ->
                    ( "Remove contradict"
                    , True
                    , Html.ul []
                        (Html.h4
                            []
                            [ Html.text "By contradiction:" ]
                            :: renderProofHelper (Zipper.enterContradictionOrStop zipper)
                        )
                    )

        ( errorNode, groupStatus, inputStatus ) =
            case ErrorHandler.handleErrors zipper of
                Ok _ ->
                    ( Html.text "", Form.groupSuccess, Input.success )

                Err error ->
                    ( Form.validationText [] [ Html.text error ]
                    , Form.groupDanger
                    , Input.danger
                    )

        showButtons =
            Zipper.getShowButtons zipper
    in
    Html.div []
        [ Form.group [ groupStatus ]
            [ InputGroup.config
                (InputGroup.text
                    [ Input.placeholder "Formula"
                    , Input.value <| Zipper.getValue zipper
                    , Input.onInput <| EditZipper zipper
                    , Input.disabled disabled
                    , inputStatus
                    ]
                )
                |> InputGroup.successors
                    [ InputGroup.button
                        [ Button.outlineInfo
                        , Button.onClick <| MouseHovered zipper (not showButtons)
                        ]
                        [ Html.text "?" ]
                    ]
                |> InputGroup.view
            , if showButtons then
                renderButtons zipper contradictionText
              else
                Html.text ""
            , errorNode
            ]
        , contradictionBase
        ]
