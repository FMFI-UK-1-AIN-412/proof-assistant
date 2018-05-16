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

import Bootstrap.Alert as Alert
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
    { history = History.new { zipper = Zipper.create <| Proof.createFormulaStep "" } }



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
    | ZipperEditGeneralization Zipper.Zipper String
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

                ZipperEditGeneralization zipper str ->
                    changeZipper False <| Zipper.editGeneralizationText str zipper

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
    myButton function Button.outlineSuccess "+ Single"


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    buttonAddHelper (ZipperAdd Proof.OnNode zipper)


buttonAddCasesHelper : Msg -> Html.Html Msg
buttonAddCasesHelper function =
    myButton function Button.outlineInfo "+ Cases"


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    myButton (ZipperDelete zipper) Button.outlineDanger "x Delete"


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

                Generalization _ _ ->
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
                , radioButton isAddUniversal "Generalization" (Generalization (Zipper.generateNewFreeVariable zipper) Nothing)
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
        myButton (ZipperSetCollpased whr zipper value) Button.outlineInfo "▽"
    else
        myButton (ZipperSetCollpased whr zipper value) Button.info "▷"



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
    (History.get model.history).zipper
        |> Zipper.root
        |> Zipper.reindexAll
        |> Zipper.matchAll
        |> Zipper.reindexAll
        |> Zipper.matchAll


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


renderEverythingProven : Zipper.Zipper -> Html.Html Msg
renderEverythingProven zipper =
    if Zipper.isEverythingProven zipper then
        Alert.simpleSuccess [] [ Html.text "Everything is proven." ]
    else
        Alert.simpleDanger [] [ Html.text "Something is not correct yet." ]


renderHistoryButtons : Model -> Html.Html Msg
renderHistoryButtons model =
    ButtonGroup.buttonGroup []
        [ ButtonGroup.button
            [ Button.secondary
            , Button.onClick HistoryBack
            , Button.disabled <| not <| History.hasPrev model.history
            ]
            [ Html.text "⇦ Undo" ]
        , ButtonGroup.button
            [ Button.secondary
            , Button.onClick HistoryForward
            , Button.disabled <| not <| History.hasNext model.history
            ]
            [ Html.text "Redo ⇨" ]
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
        [ renderEverythingProven zipper
        , Html.hr [] []
        , zipper |> renderProof
        ]


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.div [] (renderStep zipper) ]


renderStep : Zipper.Zipper -> List (Html.Html Msg)
renderStep zipper =
    case zipper.proof of
        FormulaNode explanation formulaStep _ ->
            renderFormulaNode zipper explanation formulaStep

        CasesNode case1 next1 case2 next2 ->
            renderCases zipper case1 next1 case2 next2


inptGrp maybeValidationStatus predecessors data editCallback =
    (InputGroup.config <|
        InputGroup.text <|
            [ Input.placeholder "Formula"
            , Input.value data.text
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


renderCases : Zipper.Zipper -> FormulaStep -> Maybe Proof -> FormulaStep -> Maybe Proof -> List (Html.Html Msg)
renderCases zipper case1 next1 case2 next2 =
    let
        renderCase selectedCase next text enterCaseFunction whr zipper =
            let
                ( casesButton, subProof ) =
                    case next of
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
                [ Html.p [] [ localCollapseButton, Html.text text ] ]
            else
                Html.p [] [ localCollapseButton, Html.text text ]
                    :: Html.div []
                        [ Form.group []
                            [ inptGrp (Just inputType) [ downButton ] selectedCase editCallback
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
        (renderCase case1 next1 "Case 1" Zipper.enterCase1 Proof.OnCase1 zipper)
    , Html.div [ Html.Attributes.class "inner-style" ]
        (renderCase case2 next2 "Case 2" Zipper.enterCase2 Proof.OnCase2 zipper)
    ]


renderFormulaNode : Zipper.Zipper -> Explanation -> FormulaStep -> List (Html.Html Msg)
renderFormulaNode zipper explanation formulaStep =
    let
        ( validationStatus, validationNode ) =
            case Proof.getStatus explanation formulaStep (Zipper.getBranchAbove zipper.breadcrumbs) of
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

        ( inputGroup, subProof ) =
            case explanation of
                Rule _ ->
                    ( inptGrp (Just validationStatus) [ buttonDownLocal ] formulaStep editCallback, [] )

                Premise ->
                    ( inptGrp (Just validationStatus) [ buttonDownLocal, InputGroup.span [] [ Html.text "Premise:" ] ] formulaStep editCallback, [] )

                Goal proof ->
                    let
                        assumptions =
                            case Proof.getImplicationAntecedent formulaStep of
                                Nothing ->
                                    []

                                Just assumption ->
                                    [ (InputGroup.config <|
                                        InputGroup.text <|
                                            [ Input.disabled True
                                            , Input.value assumption.text
                                            ]
                                      )
                                        |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Assumption:" ] ]
                                        |> InputGroup.view
                                    , Html.hr [] []
                                    ]
                    in
                    ( inptGrp (Just validationStatus) [ buttonDownLocal, InputGroup.span [] [ Html.text "Goal:" ] ] formulaStep editCallback
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            (Html.p [] [ localCollapseButton, Html.text "Proof" ]
                                :: assumptions
                                ++ subElements proof
                            )
                      ]
                    )

                Contradiction proof ->
                    let
                        assumptions =
                            [ (InputGroup.config <|
                                InputGroup.text <|
                                    [ Input.disabled True
                                    , Input.value <| "-" ++ formulaStep.text
                                    ]
                              )
                                |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Assumption:" ] ]
                                |> InputGroup.view
                            , Html.hr [] []
                            ]
                    in
                    ( inptGrp (Just validationStatus) [ buttonDownLocal ] formulaStep editCallback
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            (Html.p [] [ localCollapseButton, Html.text "Proof" ]
                                :: assumptions
                                ++ subElements proof
                            )
                      ]
                    )

                Generalization str proof ->
                    let
                        goals =
                            case Proof.getHelpTextAddUniversal formulaStep.formula str of
                                Err _ ->
                                    []

                                Ok goal ->
                                    let
                                        ( validationStatusFree, validationStatusNode ) =
                                            case Zipper.validateNewFreeVariable str zipper of
                                                Ok _ ->
                                                    ( Input.success, emptyNode )

                                                Err msg ->
                                                    invalidNode msg
                                    in
                                    [ Html.p []
                                        [ Html.text "Take any/arbitrary "
                                        , Input.text
                                            [ Input.value str
                                            , validationStatusFree
                                            , Input.attrs [ Html.Attributes.class "new-free-variable" ]
                                            , Input.onInput <| ZipperEditGeneralization zipper
                                            ]
                                        , Html.text " and prove: "
                                        , validationStatusNode
                                        ]
                                    , (InputGroup.config <|
                                        InputGroup.text <|
                                            [ Input.disabled True
                                            , Input.value goal
                                            ]
                                      )
                                        |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Goal:" ] ]
                                        |> InputGroup.view
                                    , Html.hr [] []
                                    ]
                    in
                    ( inptGrp (Just validationStatus) [ buttonDownLocal, InputGroup.span [] [ Html.text "Generalization:" ] ] formulaStep editCallback
                    , [ Html.div [ Html.Attributes.class "inner-style" ]
                            (Html.p [] [ localCollapseButton, Html.text "Proof" ]
                                :: goals
                                ++ subElements proof
                            )
                      ]
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
    Html.div []
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
