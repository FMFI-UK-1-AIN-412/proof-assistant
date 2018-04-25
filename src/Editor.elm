module Editor
    exposing
        ( Model
        , Msg(..)
        , getProof
        , initialModel
        , render
        , renderHistoryButtons
        , setProof
        , subscriptions
        , update
        )

import Bootstrap.Button as Button
import Bootstrap.ButtonGroup as ButtonGroup
import Bootstrap.Form as Form
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Exporting.Json.Decode
import Exporting.Json.Encode
import Exporting.Ports
import Formula exposing (..)
import History
import Html
import Html.Attributes
import Html.Events
import Http
import Json.Decode
import Json.Encode
import Parser exposing (..)
import Proof
import Types exposing (..)
import Zipper


-- Model


type alias OldModel =
    { zipper : Zipper.Zipper }


type alias Model =
    { history : History.History OldModel }


initialModel : Model
initialModel =
    { history =
        History.new
            { zipper =
                -- Empty
                --Zipper.create <| Proof.createFormulaStep ""
                -- First order logic
                --{ proof = FormulaNode Premise { text = "a", formula = Ok (Atom "a" []), index = 1, next = Just (FormulaNode Premise { text = "\\exists x f(x)", formula = Ok (Exists "x" (Atom "f" [ Var "x" ])), index = 2, next = Just (FormulaNode (Rule (Just (ModusPonens 1 1))) { text = "f(a)", formula = Ok (Atom "f" [ Var "a" ]), index = 3, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
                -- Cases proof
                --{ proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode (Goal (Just (FormulaNode (Rule (Just (ImplicationRemoval 1))) { text = "(-a|-b)", formula = Ok (Disj (Neg (Atom "a" [])) (Neg (Atom "b" []))), index = 3, next = Just (CasesNode { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Just (FormulaNode (Rule (Just (Conjuction 4 4))) { text = "(-a&-a)", formula = Ok (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))), index = 5, next = Just (FormulaNode (Rule (Just (Addition 5))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 6, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } } { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 7, next = Just (FormulaNode (Rule (Just (Addition 7))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 8, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "((-a&-a)|-b)", formula = Ok (Disj (Conj (Neg (Atom "a" [])) (Neg (Atom "a" []))) (Neg (Atom "b" []))), index = 2, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
                -- Contradiction Proof
                --{ proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode Premise { text = "(a->b)", formula = Ok (Impl (Atom "a" []) (Atom "b" [])), index = 2, next = Just (FormulaNode (Goal (Just (FormulaNode (Contradiction (Just (FormulaNode (Rule (Just (DoubleNegation 4))) { text = "a", formula = Ok (Atom "a" []), index = 5, next = Just (FormulaNode (Rule (Just (ModusPonens 2 5))) { text = "b", formula = Ok (Atom "b" []), index = 6, next = Just (FormulaNode (Rule (Just (ModusPonens 1 5))) { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 7, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Nothing, gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 3, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
                --{ proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode Premise { text = "(a->b)", formula = Ok (Impl (Atom "a" []) (Atom "b" [])), index = 2, next = Just (FormulaNode (Goal (Just (FormulaNode (Contradiction (Just (FormulaNode (Rule (Just (DoubleNegation 4))) { text = "a", formula = Ok (Atom "a" []), index = 5, next = Just (FormulaNode (Rule (Just (ModusPonens 2 5))) { text = "b", formula = Ok (Atom "b" []), index = 6, next = Just (FormulaNode (Rule (Just (ModusPonens 1 5))) { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 7, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Nothing, gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 3, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
                --{ proof = FormulaNode Premise { text = "(a->-b)", formula = Ok (Impl (Atom "a" []) (Neg (Atom "b" []))), index = 1, next = Just (FormulaNode Premise { text = "(a->b)", formula = Ok (Impl (Atom "a" []) (Atom "b" [])), index = 2, next = Just (FormulaNode Premise { text = "(-a->c)", formula = Ok (Impl (Neg (Atom "a" [])) (Atom "c" [])), index = 3, next = Just (FormulaNode (Goal (Just (FormulaNode (Contradiction (Just (FormulaNode (Rule (Just (DoubleNegation 7))) { text = "a", formula = Ok (Atom "a" []), index = 8, next = Just (FormulaNode (Rule (Just (ModusPonens 2 8))) { text = "b", formula = Ok (Atom "b" []), index = 9, next = Just (FormulaNode (Rule (Just (ModusPonens 1 8))) { text = "-b", formula = Ok (Neg (Atom "b" [])), index = 10, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 7, next = Nothing, gui = { showButtons = False, collapsed = False } }))) { text = "-a", formula = Ok (Neg (Atom "a" [])), index = 4, next = Just (FormulaNode (Goal (Just (FormulaNode (Rule (Just (ModusPonens 3 4))) { text = "c", formula = Ok (Atom "c" []), index = 6, next = Nothing, gui = { showButtons = False, collapsed = False } }))) { text = "c", formula = Ok (Atom "c" []), index = 5, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
                -- First oreder logic
                { proof = FormulaNode Premise { text = "\\forall x P(x)", formula = Ok (ForAll "x" (Atom "P" [ Var "x" ])), index = 1, next = Just (FormulaNode Premise { text = "\\forall x (P(x) -> Q(x))", formula = Ok (ForAll "x" (Impl (Atom "P" [ Var "x" ]) (Atom "Q" [ Var "x" ]))), index = 2, next = Just (FormulaNode (Goal (Just (FormulaNode (AddUniversalQuantifier "x0" (Just (FormulaNode (Rule (Just (FirstOrderRemoveUniversalQunatifier 1))) { text = "P(x0)", formula = Ok (Atom "P" [ Var "x0" ]), index = 7, next = Just (FormulaNode (Rule (Just (FirstOrderRemoveUniversalQunatifier 2))) { text = "(P(x0)->Q(x0))", formula = Ok (Impl (Atom "P" [ Var "x0" ]) (Atom "Q" [ Var "x0" ])), index = 8, next = Just (FormulaNode (Rule (Just (ModusPonens 8 7))) { text = "Q(x0)", formula = Ok (Atom "Q" [ Var "x0" ]), index = 9, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "\\forall x Q(x)", formula = Ok (ForAll "x" (Atom "Q" [ Var "x" ])), index = 4, next = Just (FormulaNode (Rule (Just (FirstOrderRemoveUniversalQunatifier 4))) { text = "Q(freeVar)", formula = Ok (Atom "Q" [ Var "freeVar" ]), index = 5, next = Just (FormulaNode (Rule (Just (SameFormula 4))) { text = "\\forall x Q(x)", formula = Ok (ForAll "x" (Atom "Q" [ Var "x" ])), index = 6, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }))) { text = "\\forall x Q(x)", formula = Ok (ForAll "x" (Atom "Q" [ Var "x" ])), index = 3, next = Nothing, gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }), gui = { showButtons = False, collapsed = False } }, breadcrumbs = [] }
            }
    }



-- Update


type Msg
    = ZipperEdit Proof.Where Zipper.Zipper String
    | ZipperAdd Proof.Where Zipper.Zipper
    | ZipperAddCases Proof.Where Zipper.Zipper
    | ZipperExplanation Zipper.Zipper Explanation
    | ZipperDelete Zipper.Zipper
    | ZipperSetButtonsAppearance Proof.Where Zipper.Zipper Bool
    | ZipperSetCollpased Proof.Where Zipper.Zipper Bool
    | ZipperCreateSubFormulaNode Zipper.Zipper
    | ZipperCreateSubCasesNode Zipper.Zipper
    | HistoryBack
    | HistoryForward


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        changeZipper needSave newZipper =
            if needSave then
                ( History.save { zipper = newZipper } model.history, Cmd.none )
            else
                ( History.replace { zipper = newZipper } model.history, Cmd.none )

        ( newHistory, command ) =
            case msg of
                ZipperEdit whr zipper value ->
                    changeZipper False <| Zipper.editValue whr value zipper

                ZipperAdd whr zipper ->
                    changeZipper True <| Zipper.add whr (Proof.createFormulaStep "") zipper

                ZipperAddCases whr zipper ->
                    changeZipper True <| Zipper.addCases whr zipper

                ZipperExplanation zipper explanation ->
                    changeZipper True <| Zipper.changeExplanation explanation zipper

                ZipperDelete zipper ->
                    changeZipper True <| Zipper.delete zipper

                ZipperSetButtonsAppearance whr zipper value ->
                    changeZipper False <| Zipper.setButtonsAppearance whr value zipper

                ZipperSetCollpased whr zipper value ->
                    changeZipper False <| Zipper.setCollapsed whr value zipper

                ZipperCreateSubFormulaNode zipper ->
                    changeZipper True <| Zipper.createSubFormulaNode zipper

                ZipperCreateSubCasesNode zipper ->
                    changeZipper True <| Zipper.createSubCasesNode zipper

                HistoryBack ->
                    ( History.prev model.history, Cmd.none )

                HistoryForward ->
                    ( History.next model.history, Cmd.none )
    in
    ( { model | history = newHistory }, command )



-- Helpers


hr : Html.Html Msg
hr =
    Html.hr [] []


emptyNode : Html.Html Msg
emptyNode =
    Html.text ""



-- Button helpers


myButton : Msg -> Button.Option Msg -> String -> Html.Html Msg
myButton onClick buttonStyle text =
    Button.button
        [ Button.attrs [ Html.Attributes.class "mr-2" ]
        , Button.onClick onClick
        , buttonStyle
        ]
        [ Html.text text ]


buttonAddHelper : Msg -> Html.Html Msg
buttonAddHelper function =
    myButton function Button.outlineSuccess "+"


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    buttonAddHelper (ZipperAdd Proof.OnNode zipper)


buttonAddCasesHelper : Msg -> Html.Html Msg
buttonAddCasesHelper function =
    myButton function Button.outlineInfo "β"


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    myButton (ZipperDelete zipper) Button.outlineDanger "x"


buttonsList : Zipper.Zipper -> Explanation -> Bool -> Html.Html Msg
buttonsList zipper explanation includeCasesButton =
    let
        ( isPremise, isGoal, isRule, isContradiction, isAddUniversal ) =
            case explanation of
                Premise ->
                    ( True, False, False, False, False )

                Goal _ ->
                    ( False, True, False, False, False )

                Rule _ ->
                    ( False, False, True, False, False )

                Contradiction _ ->
                    ( False, False, False, True, False )

                AddUniversalQuantifier _ _ ->
                    ( False, False, False, False, True )

        radioButton isActive text explanationType =
            ButtonGroup.radioButton
                isActive
                [ Button.info, Button.onClick <| ZipperExplanation zipper explanationType ]
                [ Html.text text ]

        explanationButtons =
            [ ButtonGroup.radioButtonGroup []
                [ radioButton isPremise "Premise" Premise
                , radioButton isGoal "Goal" (Goal Nothing)
                , radioButton isRule "Consequence" (Rule Nothing)
                , radioButton isContradiction "Contradiction" (Contradiction Nothing)
                , radioButton isAddUniversal "Add universal quantifier" (AddUniversalQuantifier (Zipper.generateNewFreeVariable zipper) Nothing)
                ]
            ]

        casesButton =
            if includeCasesButton then
                buttonAddCasesHelper (ZipperAddCases Proof.OnNode zipper)
            else
                emptyNode

        buttons =
            [ buttonAdd zipper
            , casesButton
            , buttonDelete zipper
            ]
                ++ explanationButtons
    in
    Html.div [ Html.Attributes.class "button-list" ] buttons


buttonDown buttonType callback =
    InputGroup.button
        [ buttonType, Button.onClick callback ]
        [ Html.text "▼" ]


collapseButton : Bool -> Proof.Where -> Zipper.Zipper -> Html.Html Msg
collapseButton value whr zipper =
    if value then
        myButton (ZipperSetCollpased whr zipper value) Button.outlineInfo "🡅"
    else
        myButton (ZipperSetCollpased whr zipper value) Button.info "🡇"



-- Validation helpers


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


getZipper : Model -> Zipper.Zipper
getZipper model =
    (History.get model.history).zipper |> Zipper.root


getProof : Model -> Proof
getProof model =
    (getZipper model).proof


setProof : Proof -> Model -> Model
setProof proof model =
    let
        zipper =
            { proof = proof, breadcrumbs = [] }

        history =
            History.save { zipper = zipper } model.history
    in
    { model | history = history }



-- Render functions


renderHistoryButtons : Model -> Html.Html Msg
renderHistoryButtons model =
    ButtonGroup.buttonGroup []
        [ ButtonGroup.button
            [ Button.secondary
            , Button.onClick HistoryForward
            , Button.disabled <| not <| History.hasNext model.history
            ]
            [ Html.text "Step forward" ]
        , ButtonGroup.button
            [ Button.secondary
            , Button.onClick HistoryBack
            , Button.disabled <| not <| History.hasPrev model.history
            ]
            [ Html.text "Step back" ]
        ]


render : Model -> Html.Html Msg
render model =
    let
        zipper =
            getZipper model

        _ =
            Debug.log "MODEL:" <| zipper
    in
    Html.div []
        [ zipper
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
        FormulaNode explanation formulaStep ->
            renderFormulaNode zipper explanation formulaStep

        CasesNode case1 case2 ->
            renderCases zipper case1 case2


inptGrp disabled maybeValidationStatus predecessors data editCallback =
    (InputGroup.config <|
        InputGroup.text <|
            [ Input.placeholder "Formula"
            , Input.value data.text
            , Input.disabled disabled
            , Input.onInput editCallback
            ]
                ++ (case maybeValidationStatus of
                        Just validationStatus ->
                            [ validationStatus ]

                        Nothing ->
                            []
                   )
    )
        |> InputGroup.predecessors predecessors
        |> InputGroup.successors [ InputGroup.span [] [ Html.text <| "(" ++ toString data.index ++ ")" ] ]


renderCases : Zipper.Zipper -> FormulaStep -> FormulaStep -> List (Html.Html Msg)
renderCases zipper case1 case2 =
    let
        renderCase selectedCase text enterCaseFunction whr zipper =
            let
                ( casesButton, subProof ) =
                    case selectedCase.next of
                        Just _ ->
                            ( emptyNode, renderStep <| enterCaseFunction zipper )

                        Nothing ->
                            ( buttonAddCasesHelper <| ZipperAddCases whr zipper, [] )

                ( inputType, validationNode ) =
                    case Proof.tryParseFormula selectedCase of
                        Just errMsg ->
                            invalidNode errMsg

                        Nothing ->
                            validNode ""

                ( buttons, inputButtonDesign ) =
                    if selectedCase.gui.showButtons then
                        ( Html.div []
                            [ buttonAddHelper <| ZipperAdd whr zipper
                            , casesButton
                            ]
                        , Button.info
                        )
                    else
                        ( emptyNode, Button.outlineInfo )

                editCallback =
                    ZipperEdit whr zipper

                downButton =
                    buttonDown inputButtonDesign (ZipperSetButtonsAppearance whr zipper (not selectedCase.gui.showButtons))

                localCollapseButton =
                    collapseButton (not selectedCase.gui.collapsed) whr zipper
            in
            if selectedCase.gui.collapsed then
                [ Html.h4 [] [ localCollapseButton, Html.text text ] ]
            else
                Html.h4 [] [ localCollapseButton, Html.text text ]
                    :: Html.div []
                        [ Form.group []
                            [ inptGrp False (Just inputType) [ downButton ] selectedCase editCallback
                                |> InputGroup.view
                            , validationNode
                            , buttons
                            ]
                        ]
                    :: subProof

        ( _, validationNode ) =
            case Zipper.validateCases case1 case2 zipper of
                Ok msg ->
                    validNode msg

                Err msg ->
                    invalidNode msg
    in
    [ Html.p [ Html.Attributes.class "text-right" ]
        [ Html.text "Delete the 2 cases bellow"
        , Html.span [ Html.Attributes.class "ml-2" ] [ buttonDelete zipper ]
        ]
    , validationNode
    , Html.div [ Html.Attributes.class "inner-style" ]
        (renderCase case1 "Case 1" Zipper.enterCase1 Proof.OnCase1 zipper)
    , Html.div [ Html.Attributes.class "inner-style" ]
        (renderCase case2 "Case 2" Zipper.enterCase2 Proof.OnCase2 zipper)
    ]


renderFormulaNode : Zipper.Zipper -> Explanation -> FormulaStep -> List (Html.Html Msg)
renderFormulaNode zipper explanation formulaStep =
    let
        ( validationStatus, validationNode ) =
            case Proof.getStatus explanation formulaStep (Zipper.getBranchAbove zipper) of
                Err msg ->
                    invalidNode msg

                Ok msg ->
                    validNode msg

        buttonDownLocal =
            buttonDown
                inputButtonDesign
                (ZipperSetButtonsAppearance Proof.OnNode zipper (not formulaStep.gui.showButtons))

        editCallback =
            ZipperEdit Proof.OnNode zipper

        subElements proof =
            if not formulaStep.gui.collapsed then
                case proof of
                    Just _ ->
                        renderStep (Zipper.enterSub zipper)

                    Nothing ->
                        [ buttonAddHelper (ZipperCreateSubFormulaNode zipper)
                        , buttonAddCasesHelper (ZipperCreateSubCasesNode zipper)
                        ]
            else
                []

        localCollapseButton =
            collapseButton (not formulaStep.gui.collapsed) Proof.OnNode zipper

        ( inputGroup, subProof, someClass ) =
            case explanation of
                Rule _ ->
                    ( inptGrp False (Just validationStatus) [ buttonDownLocal ] formulaStep editCallback, [], "" )

                Premise ->
                    ( inptGrp False Nothing [ buttonDownLocal, InputGroup.span [] [ Html.text "Premise:" ] ] formulaStep editCallback, [], "" )

                Goal proof ->
                    ( inptGrp False Nothing [ buttonDownLocal, InputGroup.span [] [ Html.text "Goal:" ] ] formulaStep editCallback
                    , [ Html.div []
                            (Html.h4 [] [ localCollapseButton, Html.text "Proof" ]
                                :: subElements proof
                            )
                      ]
                    , "inner-style"
                    )

                Contradiction proof ->
                    ( inptGrp True Nothing [ buttonDownLocal ] formulaStep editCallback
                    , [ Html.div []
                            (Html.h4 [] [ localCollapseButton, Html.text "Proof by contradiction" ]
                                :: Input.text
                                    [ Input.disabled True
                                    , Input.value <| "-" ++ formulaStep.text
                                    ]
                                :: hr
                                :: subElements proof
                            )
                      ]
                    , "inner-style"
                    )

                AddUniversalQuantifier str proof ->
                    ( inptGrp False Nothing [ buttonDownLocal, InputGroup.span [] [ Html.text "Add universal:" ] ] formulaStep editCallback
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            (Html.h4 [] [ localCollapseButton, Html.text ("Assume " ++ str ++ " is a new free variable.") ]
                                :: subElements proof
                            )
                      ]
                    , "inner-style"
                    )

        ( nextNodes, isLast ) =
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
    Html.div [ Html.Attributes.class someClass ]
        (Form.group []
            [ inputGroup |> InputGroup.view
            , validationNode
            ]
            :: buttons
            :: subProof
        )
        :: nextNodes



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
