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
            |> Zipper.add (Zipper.createElement "((q -> r) & (r-> q))")
            |> Zipper.downOrStop
            |> Zipper.toggleContradiction
            |> Zipper.enterContradictionOrStop
            |> Zipper.edit "(q -> r)"
            |> Zipper.add (Zipper.createElement "(r -> q)")
            |> Zipper.leaveContradictionOrStop
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "(p -> r)")
            |> Zipper.downOrStop
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "((a&b) | b)")
            |> Zipper.downOrStop
            |> Zipper.toggleCases
            |> Zipper.enterCase1OrStop
            |> Zipper.edit "(a & b)"
            |> Zipper.downOrStop
            |> Zipper.add (Zipper.createElement "b")
            |> Zipper.add (Zipper.createElement "a")
            |> Zipper.upOrStop
            |> Zipper.leaveContradictionOrStop
            |> Zipper.root
    }



-- Update


type Msg
    = ZipperAdd Zipper.Zipper
    | ZipperEdit Zipper.Zipper String
    | ShowButtons Zipper.Zipper Bool
    | DeleteProofStep Zipper.Zipper
    | ToggleContradiction Zipper.Zipper
    | ToggleCases Zipper.Zipper


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperAdd zipper ->
            { model | proof = Zipper.add (Zipper.createElement "") zipper }

        ZipperEdit zipper value ->
            { model | proof = Zipper.edit value zipper }

        ShowButtons zipper state ->
            { model | proof = Zipper.changeShowButtons state zipper }

        DeleteProofStep zipper ->
            { model | proof = Zipper.delete zipper }

        ToggleContradiction zipper ->
            { model | proof = Zipper.toggleContradiction zipper }

        ToggleCases zipper ->
            { model | proof = Zipper.toggleCases zipper }



-- View


render : Model -> Html.Html Msg
render model =
    renderProof <| Zipper.root model.proof



-- Helpers


emptyNode : Html.Html Msg
emptyNode =
    Html.text ""


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.div [] (renderProofHelper zipper) ]


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


renderButtons : Zipper.Zipper -> Maybe String -> Maybe String -> Html.Html Msg
renderButtons zipper contradictionText casesText =
    let
        contradictionButton =
            case contradictionText of
                Nothing ->
                    emptyNode

                Just text ->
                    Button.button
                        [ Button.onClick <| ToggleContradiction zipper
                        , Button.outlineInfo
                        , Button.attrs [ Html.Attributes.class "ml-1" ]
                        ]
                        [ Html.text text ]

        casesButton =
            case casesText of
                Nothing ->
                    emptyNode

                Just text ->
                    Button.button
                        [ Button.onClick <| ToggleCases zipper
                        , Button.outlineInfo
                        , Button.attrs [ Html.Attributes.class "ml-1" ]
                        ]
                        [ Html.text text ]
    in
    Html.div []
        [ Button.button
            [ Button.onClick <| ZipperAdd zipper
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
        , contradictionButton
        , casesButton
        ]


innerStyle =
    Html.Attributes.style
        [ ( "border", "1px solid black" )
        , ( "padding", "20px 20px 20px 30px" )
        , ( "box-shadow", "0 0 5px #cfcfcf" )
        , ( "margin-bottom", "20px" )
        ]


renderContradiction : Zipper.Zipper -> Html.Html Msg
renderContradiction zipper =
    Html.div [ innerStyle ]
        (Html.h4
            []
            [ Html.text "By contradiction:" ]
            :: renderProofHelper (Zipper.enterContradictionOrStop zipper)
        )


renderCases : Zipper.Zipper -> Html.Html Msg
renderCases zipper =
    let
        renderCaseInput text =
            Html.div
                [ Html.Attributes.style [ ( "margin-bottom", "20px" ) ] ]
                [ InputGroup.config
                    (InputGroup.text
                        [ Input.value text
                        , Input.disabled True
                        , Input.success
                        ]
                    )
                    |> InputGroup.view
                ]
    in
    Html.div []
        [ Html.div [ innerStyle ]
            [ Html.h4 [] [ Html.text "Case 1" ]
            , renderCaseInput <| Zipper.getCase1Value zipper
            , Html.div [] (renderProofHelper <| Zipper.enterCase1OrStop zipper)
            ]
        , Html.div [ innerStyle ]
            [ Html.h4 [] [ Html.text "Case 2" ]
            , renderCaseInput <| Zipper.getCase2Value zipper
            , Html.div [] (renderProofHelper <| Zipper.enterCase2OrStop zipper)
            ]
        ]


renderLine : Zipper.Zipper -> Html.Html Msg
renderLine zipper =
    let
        ( contradictionText, casesText, disabled, subElements ) =
            case Zipper.getProofTypeFromSteps zipper.steps of
                Zipper.Normal _ ->
                    ( Just "Contradict", Just "Cases", False, emptyNode )

                Zipper.Contradiction _ _ ->
                    ( Just "Undo contradict", Nothing, True, renderContradiction zipper )

                Zipper.Cases _ _ _ ->
                    -- todo
                    ( Nothing, Just "Undo cases", True, renderCases zipper )

        ( errorNode, groupStatus, inputStatus ) =
            case ErrorHandler.handleErrors zipper of
                Ok _ ->
                    ( emptyNode, Form.groupSuccess, Input.success )

                Err error ->
                    ( Form.validationText [] [ Html.text error ]
                    , Form.groupDanger
                    , Input.danger
                    )

        showButtons =
            Zipper.getShowButtons zipper

        buttons =
            if showButtons then
                renderButtons zipper contradictionText casesText
            else
                emptyNode
    in
    Html.div []
        [ Form.group [ groupStatus ]
            [ InputGroup.config
                (InputGroup.text
                    [ Input.placeholder "Formula"
                    , Input.value <| Zipper.getValue zipper
                    , Input.onInput <| ZipperEdit zipper
                    , Input.disabled disabled
                    , inputStatus
                    ]
                )
                |> InputGroup.successors
                    [ InputGroup.button
                        [ Button.outlineInfo
                        , Button.onClick <| ShowButtons zipper (not showButtons)
                        ]
                        [ Html.text "?" ]
                    ]
                |> InputGroup.view
            , buttons
            , errorNode
            ]
        , subElements
        ]
