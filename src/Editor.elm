module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

import Bootstrap.Button as Button
import Bootstrap.ButtonGroup as ButtonGroup
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
    }



-- Update


type Msg
    = ZipperEdit Zipper.Zipper String
    | ZipperAdd Zipper.Zipper
    | ZipperAddCases Zipper.Zipper
    | ZipperExplanation Zipper.Zipper Proof.Explanation
    | ZipperDelete Zipper.Zipper
    | ZipperShowButtons Zipper.Zipper Bool
    | ZipperCreateContradictionFirstNode Zipper.Zipper


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperEdit zipper value ->
            { model | zipper = Zipper.editValue value zipper }

        ZipperAdd zipper ->
            { model | zipper = Zipper.add (Proof.createFormulaStep "") zipper }

        ZipperAddCases zipper ->
            { model | zipper = Zipper.addCases zipper }

        ZipperExplanation zipper explanation ->
            { model | zipper = Zipper.changeExplanation explanation zipper }

        ZipperDelete zipper ->
            { model | zipper = Zipper.delete zipper }

        ZipperShowButtons zipper value ->
            let
                newProofForZipper =
                    case zipper.proof of
                        Proof.CasesNode _ _ ->
                            zipper.proof

                        Proof.FormulaNode expl formulaStep ->
                            Proof.FormulaNode expl (Proof.setShowButtons value formulaStep)

                newZipper =
                    { zipper | proof = newProofForZipper }
            in
            { model | zipper = newZipper }

        ZipperCreateContradictionFirstNode zipper ->
            { model | zipper = Zipper.createContradictionFirstNode zipper }



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


buttonCreateContradictionFirstNode : Zipper.Zipper -> Html.Html Msg
buttonCreateContradictionFirstNode zipper =
    myButton (ZipperCreateContradictionFirstNode zipper) Button.outlineSuccess "+"


buttonAdd : Zipper.Zipper -> Html.Html Msg
buttonAdd zipper =
    myButton (ZipperAdd zipper) Button.outlineSuccess "+"


buttonAddCases : Zipper.Zipper -> Html.Html Msg
buttonAddCases zipper =
    myButton (ZipperAddCases zipper) Button.outlineInfo "β"


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
        buttons =
            [ buttonAdd zipper
            , if includeCasesButton then
                buttonAddCases zipper
              else
                emptyNode
            , buttonDelete zipper
            ]
                ++ explanationButtons zipper explanation
    in
    Html.div [ Html.Attributes.style [ ( "margin-bottom", "20px" ), ( "margin-top", "-10px" ) ] ] buttons


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
    renderProof <| Zipper.root model.zipper


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
    [ Html.p [ Html.Attributes.class "text-right" ]
        [ Html.text "Delete the 2 cases bellow"
        , Html.span [ Html.Attributes.class "ml-2" ] [ buttonDelete zipper ]
        ]
    , Html.div [ innerStyle ]
        (Html.h2 [] [ Html.text "Case 1" ]
            :: renderStep (Zipper.enterCase1 zipper)
        )
    , Html.div [ innerStyle ]
        (Html.h2 [] [ Html.text "Case 2" ]
            :: renderStep (Zipper.enterCase2 zipper)
        )
    ]


validationNode : String -> String -> Html.Html Msg
validationNode text class =
    Html.div
        [ Html.Attributes.class class
        , Html.Attributes.style [ ( "display", "block" ) ]
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
                Err errMsg ->
                    invalidNode errMsg

                Ok okMsg ->
                    validNode okMsg

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
                                    [ buttonCreateContradictionFirstNode zipper ]
                    in
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.disabled True
                            , Input.value formulaStep.text
                            ]
                        )
                    , [ Html.div [ innerStyle ]
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
    [ Form.group []
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
        ++ nextNode



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
