module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

import Bootstrap.Button as Button
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import ErrorHandler
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
        Zipper.create "(q -> p)"
            |> Zipper.add (Proof.createElement "((q -> r) & (r-> q))")
            |> Zipper.downOrStop
            |> Zipper.downOrStop
            |> Zipper.toggleContradiction
            --|> Zipper.enterContradictionOrStop
            --|> Zipper.add (Proof.createElement "(r -> q)")
            --|> Zipper.leaveContradictionOrStop
            |> Zipper.downOrStop
            |> Zipper.add (Proof.createElement "(p -> r)")
            |> Zipper.downOrStop
            |> Zipper.downOrStop
            |> Zipper.add (Proof.createElement "((a&b) | b)")
            |> Zipper.downOrStop
            |> Zipper.addCasesOrStop
            |> Zipper.enterCase1OrStop
            |> Zipper.add (Proof.createElement "b")
            |> Zipper.downOrStop
            |> Zipper.add (Proof.createElement "a")
            |> Zipper.upOrStop
            |> Zipper.leaveContradictionOrStop
            |> Zipper.root
    }



-- Update


type Msg
    = ZipperAdd Zipper.Zipper
    | ZipperEdit Zipper.Zipper String
    | DeleteProofStep Zipper.Zipper
    | ToggleContradiction Zipper.Zipper
    | ZipperNodeType Zipper.Zipper Proof.NodeType
    | ToggleCases Zipper.Zipper
    | ShowButtons Zipper.Zipper Bool


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperAdd zipper ->
            { model | proof = Zipper.add (Proof.createElement "") zipper }

        ZipperEdit zipper value ->
            case Zipper.getElement zipper of
                Nothing ->
                    model

                Just element ->
                    { model | proof = Zipper.edit (Proof.changeValue value element) zipper }

        ZipperNodeType zipper nodeType ->
            case Zipper.getElement zipper of
                Nothing ->
                    model

                Just element ->
                    let
                        newElement =
                            { element | nodeType = nodeType }
                    in
                    { model | proof = Zipper.edit newElement zipper }

        ShowButtons zipper state ->
            case Zipper.getElement zipper of
                Nothing ->
                    model

                Just element ->
                    let
                        oldGui =
                            element.gui

                        newElement =
                            { element | gui = { oldGui | showButtons = state } }
                    in
                    { model | proof = Zipper.edit newElement zipper }

        DeleteProofStep zipper ->
            { model | proof = Zipper.delete zipper }

        ToggleContradiction zipper ->
            { model | proof = Zipper.toggleContradiction zipper }

        ToggleCases zipper ->
            { model | proof = Zipper.addCasesOrStop zipper }


render : Model -> Html.Html Msg
render model =
    renderProof <| Zipper.root model.proof



-- Helpers


emptyNode : Html.Html Msg
emptyNode =
    Html.text ""


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.div [] [ renderStep zipper ] ]


buttonPremis : Zipper.Zipper -> String -> Proof.NodeType -> Html.Html Msg
buttonPremis zipper text nodeType =
    Button.button
        [ Button.onClick <| ZipperNodeType zipper nodeType
        , Button.outlineSuccess
        , Button.attrs [ Html.Attributes.class "ml-1" ]
        ]
        [ Html.text text ]


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    Button.button
        [ Button.onClick <| ZipperAdd zipper
        , Button.outlineSuccess
        , Button.attrs [ Html.Attributes.class "ml-1" ]
        ]
        [ Html.text "+" ]


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    Button.button
        [ Button.onClick <| DeleteProofStep zipper
        , Button.outlineDanger
        , Button.attrs [ Html.Attributes.class "ml-1" ]
        ]
        [ Html.text "x" ]


buttonContradiction : Zipper.Zipper -> String -> Html.Html Msg
buttonContradiction zipper text =
    Button.button
        [ Button.onClick <| ToggleContradiction zipper
        , Button.outlineInfo
        , Button.attrs [ Html.Attributes.class "ml-1" ]
        ]
        [ Html.text text ]


buttonCases : Zipper.Zipper -> Html.Html Msg
buttonCases zipper =
    Button.button
        [ Button.onClick <| ToggleCases zipper
        , Button.outlineInfo
        , Button.attrs [ Html.Attributes.class "ml-1" ]
        ]
        [ Html.text "β" ]


innerStyle =
    Html.Attributes.style
        [ ( "border", "1px solid #cfcfcf" )
        , ( "padding", "20px 20px 20px 30px" )
        , ( "box-shadow", "0 0 5px #cfcfcf" )
        , ( "margin-bottom", "20px" )
        ]


renderStep : Zipper.Zipper -> Html.Html Msg
renderStep zipper =
    case zipper.steps of
        Proof.Last proofType ->
            renderLast zipper proofType

        Proof.Next proofType _ ->
            renderNext zipper proofType (Zipper.downOrStop zipper)

        Proof.Cases _ _ ->
            renderCases zipper


renderNext : Zipper.Zipper -> Proof.ProofType -> Zipper.Zipper -> Html.Html Msg
renderNext zipper proofType nextZipper =
    Html.div []
        [ renderLine zipper proofType (buttonsList zipper proofType False)
        , renderStep nextZipper
        ]


renderCases : Zipper.Zipper -> Html.Html Msg
renderCases zipper =
    Html.div []
        [ Html.div [ innerStyle ]
            [ Html.h2 [] [ Html.text "Case 1" ]
            , renderStep <| Zipper.enterCase1OrStop zipper
            ]
        , Html.div [ innerStyle ]
            [ Html.h2 [] [ Html.text "Case 2" ]
            , renderStep <| Zipper.enterCase2OrStop zipper
            ]
        ]


renderLast : Zipper.Zipper -> Proof.ProofType -> Html.Html Msg
renderLast zipper proofType =
    Html.div []
        [ renderLine zipper proofType (buttonsList zipper proofType True)
        ]


renderLine : Zipper.Zipper -> Proof.ProofType -> Html.Html Msg -> Html.Html Msg
renderLine zipper proofType footer =
    let
        element =
            Proof.getElementFromProofType proofType

        ( header, attrs, body, subProof ) =
            case proofType of
                Proof.Normal _ ->
                    ( emptyNode
                    , []
                    , Form.group []
                        [ InputGroup.config
                            (InputGroup.text
                                [ Input.placeholder "Formula"
                                , Input.value element.value
                                , Input.onInput <| ZipperEdit zipper
                                ]
                            )
                            |> predecessor
                            |> InputGroup.successors
                                [ InputGroup.button
                                    [ Button.outlineInfo
                                    , Button.onClick <| ShowButtons zipper (not element.gui.showButtons)
                                    ]
                                    [ Html.text "?" ]
                                ]
                            |> InputGroup.view
                        ]
                    , emptyNode
                    )

                Proof.Contradiction element contradictionNode ->
                    ( Html.h3 [] [ Html.text "Contradiction" ]
                    , [ innerStyle ]
                    , Form.group []
                        [ InputGroup.config
                            (InputGroup.text
                                [ Input.disabled True
                                , Input.value element.value
                                ]
                            )
                            |> predecessor
                            |> InputGroup.successors
                                [ InputGroup.button
                                    [ Button.outlineInfo
                                    , Button.onClick <| ShowButtons zipper (not element.gui.showButtons)
                                    ]
                                    [ Html.text "?" ]
                                ]
                            |> InputGroup.view
                        ]
                    , renderStep <| Zipper.enterContradictionOrStop zipper
                    )

        predecessor inputGroup =
            case element.nodeType of
                Proof.NormalNode ->
                    inputGroup

                Proof.Premis ->
                    inputGroup
                        |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Premis:" ] ]

        erorrs =
            case ErrorHandler.handleErrors zipper of
                Ok _ ->
                    emptyNode

                Err error ->
                    Html.p [] [ Html.text error ]
    in
    Html.div attrs
        [ header
        , body
        , erorrs
        , footer
        , subProof
        ]


buttonsList : Zipper.Zipper -> Proof.ProofType -> Bool -> Html.Html Msg
buttonsList zipper proofType includeCasesButton =
    let
        element =
            Proof.getElementFromProofType proofType

        buttons =
            case element.nodeType of
                Proof.Premis ->
                    [ buttonAdd zipper
                    , buttonDelete zipper
                    , buttonPremis zipper "undo premis" Proof.NormalNode
                    ]

                Proof.NormalNode ->
                    [ buttonAdd zipper
                    , if includeCasesButton then
                        buttonCases zipper
                      else
                        emptyNode
                    , buttonDelete zipper
                    , buttonContradiction zipper contraText
                    , buttonPremis zipper "make premis" Proof.Premis
                    ]

        contraText =
            case proofType of
                Proof.Normal _ ->
                    "Contradict"

                Proof.Contradiction _ _ ->
                    "Undo contradiction"
    in
    if element.gui.showButtons then
        Html.div [] buttons
    else
        emptyNode


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
