module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

import Bootstrap.Button as Button
import Bootstrap.ButtonGroup as ButtonGroup
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Formula exposing (..)
import History
import Html
import Html.Attributes
import Html.Events
import Parser exposing (..)
import Proof exposing (..)
import Zipper


-- Model


type alias Model =
    { history : History.History }


initialModel : Model
initialModel =
    { history =
        History.new
            { zipper =
                -- Empty
                --Zipper.create <| Proof.createFormulaStep ""
                -- Cases proof
                --{ proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode (Goal (Just (FormulaNode (Rule (Just (ImplicationRemoval 1))) { text = "(-a|-b)", formula = Ok (Disj (Neg (Atom "a" [])) (Neg (Atom "b" []))), index = 3, next = Just (CasesNode { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Just (FormulaNode (Rule (Just (Conjuction 4 4))) { text = "(-a&-a)", formula = Ok (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))), index = 5, next = Just (FormulaNode (Rule (Just (Addition 5))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 6, next = Nothing, gui = { showButtons = False } }), gui = { showButtons = False } }), gui = { showButtons = False } } { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 7, next = Just (FormulaNode (Rule (Just (Addition 7))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 8, next = Nothing, gui = { showButtons = False } }), gui = { showButtons = False } }), gui = { showButtons = False } }))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 2, next = Nothing, gui = { showButtons = False } }), gui = { showButtons = False } }, breadcrumbs = [] }
                -- Contradiction Proof
                { proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode Premise { text = "(a->b)", formula = Ok (Impl (Atom "a" []) (Atom "b" [])), index = 2, next = Just (FormulaNode (Goal (Just (FormulaNode (Contradiction (Just (FormulaNode (Rule (Just (DoubleNegation 4))) { text = "a", formula = Ok (Atom "a" []), index = 5, next = Just (FormulaNode (Rule (Just (ModusPonens 2 5))) { text = "b", formula = Ok (Atom "b" []), index = 6, next = Just (FormulaNode (Rule (Just (ModusPonens 1 5))) { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 7, next = Nothing, gui = { showButtons = False } }), gui = { showButtons = False } }), gui = { showButtons = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Nothing, gui = { showButtons = True } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 3, next = Nothing, gui = { showButtons = False } }), gui = { showButtons = False } }), gui = { showButtons = False } }, breadcrumbs = [] }
            }
    }



-- Update


type Msg
    = ZipperEdit Proof.Where Zipper.Zipper String
    | ZipperAdd Proof.Where Zipper.Zipper
    | ZipperAddCases Proof.Where Zipper.Zipper
    | ZipperExplanation Zipper.Zipper Proof.Explanation
    | ZipperDelete Zipper.Zipper
    | ZipperSetButtonsAppearance Proof.Where Zipper.Zipper Bool
    | ZipperCreateSubFormulaNode Zipper.Zipper
    | ZipperCreateSubCasesNode Zipper.Zipper
    | HistoryBack
    | HistoryForward


update : Msg -> Model -> Model
update msg model =
    let
        changeZipper needSave newZipper =
            if needSave then
                History.save { zipper = newZipper } model.history
            else
                History.replace { zipper = newZipper } model.history

        newHistory =
            case msg of
                ZipperEdit whr zipper value ->
                    changeZipper False (Zipper.editValue whr value zipper)

                ZipperAdd whr zipper ->
                    changeZipper True (Zipper.add whr (Proof.createFormulaStep "") zipper)

                ZipperAddCases whr zipper ->
                    changeZipper True (Zipper.addCases whr zipper)

                ZipperExplanation zipper explanation ->
                    changeZipper True (Zipper.changeExplanation explanation zipper)

                ZipperDelete zipper ->
                    changeZipper True (Zipper.delete zipper)

                ZipperSetButtonsAppearance whr zipper value ->
                    changeZipper False (Zipper.setButtonsAppearance whr value zipper)

                ZipperCreateSubFormulaNode zipper ->
                    changeZipper True (Zipper.createSubFormulaNode zipper)

                ZipperCreateSubCasesNode zipper ->
                    changeZipper True (Zipper.createSubCasesNode zipper)

                HistoryBack ->
                    History.prev model.history

                HistoryForward ->
                    History.next model.history
    in
    { model | history = newHistory }



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
    buttonAddHelper (ZipperCreateSubFormulaNode zipper)


buttonCreateContradictionCasesNode : Zipper.Zipper -> Html.Html Msg
buttonCreateContradictionCasesNode zipper =
    buttonAddCasesHelper (ZipperCreateSubCasesNode zipper)


buttonCreateGoalFormulaNode : Zipper.Zipper -> Html.Html Msg
buttonCreateGoalFormulaNode zipper =
    buttonAddHelper (ZipperCreateSubFormulaNode zipper)


buttonCreateGoalCasesNode : Zipper.Zipper -> Html.Html Msg
buttonCreateGoalCasesNode zipper =
    buttonAddCasesHelper (ZipperCreateSubCasesNode zipper)


buttonAddHelper : Msg -> Html.Html Msg
buttonAddHelper function =
    myButton function Button.outlineSuccess "+"


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    buttonAddHelper (ZipperAdd Proof.OnNode zipper)


buttonAddCasesHelper : Msg -> Html.Html Msg
buttonAddCasesHelper function =
    myButton function Button.outlineInfo "β"


buttonAddCases : Zipper.Zipper -> Html.Html Msg
buttonAddCases zipper =
    buttonAddCasesHelper (ZipperAddCases Proof.OnNode zipper)


buttonExplanation : Zipper.Zipper -> String -> Proof.Explanation -> Html.Html Msg
buttonExplanation zipper text explanation =
    myButton (ZipperExplanation zipper explanation) Button.outlineSuccess text


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    myButton (ZipperDelete zipper) Button.outlineDanger "x"


explanationButtons : Zipper.Zipper -> Proof.Explanation -> List (Html.Html Msg)
explanationButtons zipper explanation =
    let
        ( isPremise, isGoal, isRule, isContradiction ) =
            case explanation of
                Proof.Premise ->
                    ( True, False, False, False )

                Proof.Goal _ ->
                    ( False, True, False, False )

                Proof.Rule _ ->
                    ( False, False, True, False )

                Proof.Contradiction _ ->
                    ( False, False, False, True )
    in
    [ ButtonGroup.radioButtonGroup []
        [ ButtonGroup.radioButton
            isPremise
            [ Button.info, Button.onClick <| ZipperExplanation zipper Proof.Premise ]
            [ Html.text "Premise" ]
        , ButtonGroup.radioButton
            isGoal
            [ Button.info, Button.onClick <| ZipperExplanation zipper (Proof.Goal Nothing) ]
            [ Html.text "Goal" ]
        , ButtonGroup.radioButton
            isRule
            [ Button.info, Button.onClick <| ZipperExplanation zipper (Proof.Rule Nothing) ]
            [ Html.text "Consequence" ]
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
    let
        _ =
            Debug.log "TODO:" <| ((History.get model.history).zipper |> Zipper.root)
    in
    Html.div []
        [ if History.hasNext model.history then
            Button.button [ Button.secondary, Button.onClick HistoryForward ] [ Html.text "Step forward" ]
          else
            emptyNode
        , if History.hasPrev model.history then
            Button.button [ Button.primary, Button.onClick HistoryBack ] [ Html.text "Step back" ]
          else
            emptyNode
        , Html.hr [] []
        , (History.get model.history).zipper
            |> Zipper.root
            |> Zipper.reindexAll
            |> Zipper.matchAll
            |> Zipper.reindexAll
            |> Zipper.matchAll
            |> renderProof
        ]


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
        renderCase selectedCase text enterCaseFunction addCallback addBetaCallback editCallback buttonAppearance =
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

                ( buttons, inputButtonDesign ) =
                    if selectedCase.gui.showButtons then
                        ( Html.div []
                            [ buttonAddHelper addCallback
                            , casesButton
                            ]
                        , Button.info
                        )
                    else
                        ( emptyNode, Button.outlineInfo )

                buttonDown =
                    -- todo zoli
                    InputGroup.button
                        [ inputButtonDesign
                        , Button.onClick <| buttonAppearance (not selectedCase.gui.showButtons)
                        ]
                        [ Html.text "↓" ]
            in
            [ Html.h2 [] [ Html.text text ]
            , Grid.row []
                [ Grid.col [ Col.sm11 ]
                    [ InputGroup.config
                        -- todo: zoli
                        (InputGroup.text
                            [ Input.value selectedCase.text
                            , Input.onInput editCallback
                            , Input.placeholder "Formula"
                            , inputType
                            ]
                        )
                        |> InputGroup.predecessors [ buttonDown ]
                        |> InputGroup.view
                    , validationNode
                    , buttons
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
                    (ZipperAdd Proof.OnCase1 zipper)
                    (ZipperAddCases Proof.OnCase1 zipper)
                    (ZipperEdit Proof.OnCase1 zipper)
                    (ZipperSetButtonsAppearance Proof.OnCase1 zipper)
                )
            , Html.div [ Html.Attributes.class "inner-style" ]
                (renderCase case2
                    "Case 2"
                    Zipper.enterCase2
                    (ZipperAdd Proof.OnCase2 zipper)
                    (ZipperAddCases Proof.OnCase2 zipper)
                    (ZipperEdit Proof.OnCase2 zipper)
                    (ZipperSetButtonsAppearance Proof.OnCase2 zipper)
                )
            ]
        ]
    ]


validationNode : String -> String -> Html.Html Msg
validationNode text class =
    Html.div
        [ Html.Attributes.classList [ ( "block", True ), ( class, True ) ] ]
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
            case Proof.getStatus explanation formulaStep (Zipper.getBranchAbove zipper) of
                Err msg ->
                    invalidNode msg

                Ok msg ->
                    validNode msg

        buttonDown =
            InputGroup.button
                [ inputButtonDesign
                , Button.onClick <| ZipperSetButtonsAppearance Proof.OnNode zipper (not formulaStep.gui.showButtons)
                ]
                [ Html.text "↓" ]

        ( inputGroup, subProof ) =
            case explanation of
                Proof.Rule _ ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit Proof.OnNode zipper
                            , validationStatus
                            ]
                        )
                        |> InputGroup.predecessors [ buttonDown ]
                    , []
                    )

                Proof.Premise ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit Proof.OnNode zipper
                            ]
                        )
                        |> InputGroup.predecessors [ buttonDown, InputGroup.span [] [ Html.text "Premise:" ] ]
                    , []
                    )

                Proof.Goal proof ->
                    let
                        elements =
                            case proof of
                                Just _ ->
                                    renderStep (Zipper.enterSub zipper)

                                Nothing ->
                                    [ buttonCreateGoalFormulaNode zipper
                                    , buttonCreateGoalCasesNode zipper
                                    ]
                    in
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit Proof.OnNode zipper
                            ]
                        )
                        |> InputGroup.predecessors [ buttonDown, InputGroup.span [] [ Html.text "Goal:" ] ]
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            ([ Html.h4 [] [ Html.text "Prove the goal here" ] ]
                                ++ elements
                            )
                      ]
                    )

                Proof.Contradiction proof ->
                    let
                        elements =
                            case proof of
                                Just _ ->
                                    renderStep (Zipper.enterSub zipper)

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
                        |> InputGroup.predecessors [ buttonDown ]
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            ([ Html.h4 [] [ Html.text "Prove the formula above by assuming this formula" ]
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
