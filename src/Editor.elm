module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

import Bootstrap.Button as Button
import Bootstrap.ButtonGroup as ButtonGroup
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Html
import Html.Attributes
import Html.Events
import Proof
import Zipper


-- Model


type alias Model =
    { zipper : Zipper.Zipper }


initialModel : Model
initialModel =
    { zipper =
        (Zipper.create <| Proof.createFormulaStep "(a->b)")
            |> Zipper.changeExplanation Proof.Premise
            |> Zipper.add (Proof.createFormulaStep "(b->-c)")
            |> Zipper.down
            |> Zipper.changeExplanation Proof.Premise
            |> Zipper.add (Proof.createFormulaStep "a")
            |> Zipper.down
            |> Zipper.changeExplanation Proof.Premise
            |> Zipper.down
            |> Zipper.addCases
            |> Zipper.root
    }



-- Update


type Msg
    = ZipperEdit Zipper.Zipper String
    | ZipperEditCase1 Zipper.Zipper String
    | ZipperEditCase2 Zipper.Zipper String
    | ZipperAdd Zipper.Zipper
    | ZipperAddCases Zipper.Zipper
    | ZipperExplanation Zipper.Zipper Proof.Explanation
    | ZipperDelete Zipper.Zipper
    | ZipperShowButtons Zipper.Zipper Bool
    | ZipperCreateContradictionFormulaNode Zipper.Zipper
    | ZipperCreateContradictionCasesNode Zipper.Zipper
    | ZipperAddStepToCase1 Zipper.Zipper
    | ZipperAddStepToCase2 Zipper.Zipper
    | ZipperAddBetaStepToCase1 Zipper.Zipper
    | ZipperAddBetaStepToCase2 Zipper.Zipper


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperEdit zipper value ->
            { model | zipper = Zipper.editValue value zipper }

        ZipperEditCase1 zipper value ->
            { model | zipper = Zipper.editValueCase1 value zipper }

        ZipperEditCase2 zipper value ->
            { model | zipper = Zipper.editValueCase2 value zipper }

        ZipperAdd zipper ->
            { model | zipper = Zipper.add (Proof.createFormulaStep "") zipper }

        ZipperAddStepToCase1 zipper ->
            { model | zipper = Zipper.addStepToCase1 (Proof.createFormulaStep "") zipper }

        ZipperAddStepToCase2 zipper ->
            { model | zipper = Zipper.addStepToCase2 (Proof.createFormulaStep "") zipper }

        ZipperAddBetaStepToCase1 zipper ->
            { model | zipper = Zipper.addCasesToCase1 zipper }

        ZipperAddBetaStepToCase2 zipper ->
            { model | zipper = Zipper.addCasesToCase2 zipper }

        ZipperAddCases zipper ->
            { model | zipper = Zipper.addCases zipper }

        ZipperExplanation zipper explanation ->
            { model | zipper = Zipper.changeExplanation explanation zipper }

        ZipperDelete zipper ->
            { model | zipper = Zipper.delete zipper }

        ZipperShowButtons zipper value ->
            { model | zipper = Zipper.setButtonsAppearance value zipper }

        ZipperCreateContradictionFormulaNode zipper ->
            { model | zipper = Zipper.createContradictionFormulaNode zipper }

        ZipperCreateContradictionCasesNode zipper ->
            { model | zipper = Zipper.createContradictionCasesNode zipper }



-- Helpers


emptyNode : Html.Html Msg
emptyNode =
    Html.text ""


myButton : Msg -> Button.Option Msg -> String -> Html.Html Msg
myButton onClick buttonStyle text =
    Button.button
        [ Button.attrs [ Html.Attributes.class "mr-2" ]
        , Button.onClick onClick
        , buttonStyle
        ]
        [ Html.text text ]


buttonCreateContradictionFormulaNode : Zipper.Zipper -> Html.Html Msg
buttonCreateContradictionFormulaNode zipper =
    buttonAddHelper (ZipperCreateContradictionFormulaNode zipper)


buttonCreateContradictionCasesNode : Zipper.Zipper -> Html.Html Msg
buttonCreateContradictionCasesNode zipper =
    buttonAddCasesHelper (ZipperCreateContradictionCasesNode zipper)


buttonAddHelper : Msg -> Html.Html Msg
buttonAddHelper function =
    myButton function Button.outlineSuccess "+"


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    buttonAddHelper (ZipperAdd zipper)


buttonAddCasesHelper : Msg -> Html.Html Msg
buttonAddCasesHelper function =
    myButton function Button.outlineInfo "β"


buttonAddCases : Zipper.Zipper -> Html.Html Msg
buttonAddCases zipper =
    buttonAddCasesHelper (ZipperAddCases zipper)


buttonExplanation : Zipper.Zipper -> String -> Proof.Explanation -> Html.Html Msg
buttonExplanation zipper text explanation =
    myButton (ZipperExplanation zipper explanation) Button.outlineSuccess text


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    myButton (ZipperDelete zipper) Button.outlineDanger "x"


explanationButtons : Zipper.Zipper -> Proof.Explanation -> List (Html.Html Msg)
explanationButtons zipper explanation =
    let
        ( isRule, isPremise, isContradiction ) =
            case explanation of
                Proof.Rule _ ->
                    ( True, False, False )

                Proof.Premise ->
                    ( False, True, False )

                Proof.Contradiction _ ->
                    ( False, False, True )
    in
    [ ButtonGroup.radioButtonGroup []
        [ ButtonGroup.radioButton
            isRule
            [ Button.info, Button.onClick <| ZipperExplanation zipper (Proof.Rule Nothing) ]
            [ Html.text "Rule" ]
        , ButtonGroup.radioButton
            isPremise
            [ Button.info, Button.onClick <| ZipperExplanation zipper Proof.Premise ]
            [ Html.text "Premise" ]
        , ButtonGroup.radioButton
            isContradiction
            [ Button.info, Button.onClick <| ZipperExplanation zipper (Proof.Contradiction Nothing) ]
            [ Html.text "Contradiction" ]
        ]
    ]


buttonsList : Zipper.Zipper -> Proof.Explanation -> Bool -> Html.Html Msg
buttonsList zipper explanation includeCasesButton =
    let
        casesButton =
            if includeCasesButton then
                buttonAddCases zipper
            else
                emptyNode

        buttons =
            [ buttonAdd zipper
            , casesButton
            , buttonDelete zipper
            ]
                ++ explanationButtons zipper explanation
    in
    Html.div [ Html.Attributes.class "button-list" ] buttons



-- Render functions


render : Model -> Html.Html Msg
render model =
    model.zipper
        |> Zipper.root
        |> Zipper.reindexAll
        |> Zipper.matchAll
        |> Zipper.reindexAll
        |> Zipper.matchAll
        |> renderProof


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.div [] (renderStep zipper) ]


renderStep : Zipper.Zipper -> List (Html.Html Msg)
renderStep zipper =
    case zipper.proof of
        Proof.FormulaNode explanation formulaStep ->
            renderFormulaNode zipper explanation formulaStep

        Proof.CasesNode case1 case2 ->
            renderCases zipper case1 case2


renderCases : Zipper.Zipper -> Proof.FormulaStep -> Proof.FormulaStep -> List (Html.Html Msg)
renderCases zipper case1 case2 =
    let
        renderCase selectedCase text enterCaseFunction addCallback addBetaCallback editCallback =
            let
                ( casesButton, subProof ) =
                    case selectedCase.next of
                        Just _ ->
                            ( emptyNode, renderStep <| enterCaseFunction zipper )

                        Nothing ->
                            ( buttonAddCasesHelper addBetaCallback, [] )

                ( inputType, validationNode ) =
                    case Proof.tryParseFormula selectedCase of
                        Just errMsg ->
                            invalidNode errMsg

                        Nothing ->
                            validNode ""
            in
            [ Html.h2 [] [ Html.text text ]
            , Grid.row []
                [ Grid.col [ Col.sm11 ]
                    [ Input.text
                        [ Input.value selectedCase.text
                        , Input.onInput editCallback
                        , inputType
                        ]
                    , validationNode
                    , buttonAddHelper addCallback
                    , casesButton
                    ]
                , Grid.col [ Col.sm1 ] [ showIndex selectedCase.index ]
                ]
            ]
                ++ subProof

        ( _, validationNode ) =
            case Zipper.validateCases case1 case2 zipper of
                Ok msg ->
                    validNode msg

                Err msg ->
                    invalidNode msg
    in
    [ Grid.row []
        [ Grid.col [ Col.sm11 ]
            [ Html.p [ Html.Attributes.class "text-right" ]
                [ Html.text "Delete the 2 cases bellow"
                , Html.span [ Html.Attributes.class "ml-2" ] [ buttonDelete zipper ]
                ]
            , validationNode
            , Html.div [ Html.Attributes.class "inner-style" ]
                (renderCase case1
                    "Case 1"
                    Zipper.enterCase1
                    (ZipperAddStepToCase1 zipper)
                    (ZipperAddBetaStepToCase1 zipper)
                    (ZipperEditCase1 zipper)
                )
            , Html.div [ Html.Attributes.class "inner-style" ]
                (renderCase case2
                    "Case 2"
                    Zipper.enterCase2
                    (ZipperAddStepToCase2 zipper)
                    (ZipperAddBetaStepToCase2 zipper)
                    (ZipperEditCase2 zipper)
                )
            ]
        ]
    ]


validationNode : String -> String -> Html.Html Msg
validationNode text class =
    Html.div
        [ Html.Attributes.classList [ ( "block", True ), ( class, True ) ]
        ]
        [ Html.text text ]


validNode : String -> ( Input.Option Msg, Html.Html Msg )
validNode text =
    ( Input.success
    , validationNode text "valid-feedback"
    )


invalidNode : String -> ( Input.Option Msg, Html.Html Msg )
invalidNode text =
    ( Input.danger
    , validationNode text "invalid-feedback"
    )


renderFormulaNode : Zipper.Zipper -> Proof.Explanation -> Proof.FormulaStep -> List (Html.Html Msg)
renderFormulaNode zipper explanation formulaStep =
    let
        ( validationStatus, validationNode ) =
            case Proof.getStatus explanation formulaStep of
                Err msg ->
                    invalidNode msg

                Ok msg ->
                    validNode msg

        ( inputGroup, subProof ) =
            case explanation of
                Proof.Rule _ ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit zipper
                            , validationStatus
                            ]
                        )
                    , []
                    )

                Proof.Premise ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit zipper
                            ]
                        )
                        |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Premise:" ] ]
                    , []
                    )

                Proof.Contradiction proof ->
                    let
                        elements =
                            case proof of
                                Just _ ->
                                    renderStep (Zipper.enterContradiction zipper)

                                Nothing ->
                                    [ buttonCreateContradictionFormulaNode zipper
                                    , buttonCreateContradictionCasesNode zipper
                                    ]
                    in
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.disabled True
                            , Input.value formulaStep.text
                            ]
                        )
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            ([ Html.h2 [] [ Html.text "Prove" ]
                             , Input.text
                                [ Input.disabled True
                                , Input.value <| "-" ++ formulaStep.text
                                ]
                             , Html.hr [] []
                             ]
                                ++ elements
                            )
                      ]
                    )

        ( nextNode, isLast ) =
            case Zipper.downOrNothing zipper of
                Just newZipper ->
                    ( renderStep newZipper, False )

                Nothing ->
                    ( [], True )

        ( buttons, inputButtonDesign ) =
            if formulaStep.gui.showButtons then
                ( buttonsList zipper explanation isLast, Button.info )
            else
                ( emptyNode, Button.outlineInfo )
    in
    [ Grid.row []
        [ Grid.col [ Col.sm11 ]
            ([ Form.group []
                [ inputGroup
                    |> InputGroup.successors
                        [ InputGroup.button
                            [ inputButtonDesign
                            , Button.onClick <| ZipperShowButtons zipper (not formulaStep.gui.showButtons)
                            ]
                            [ Html.text "?" ]
                        ]
                    |> InputGroup.view
                , validationNode
                ]
             , buttons
             ]
                ++ subProof
            )
        , Grid.col [ Col.sm1 ] [ showIndex formulaStep.index ]
        ]
    ]
        ++ nextNode


showIndex index =
    Html.p
        [ Html.Attributes.class "index-text" ]
        [ Html.text <| "(" ++ toString index ++ ")" ]



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
