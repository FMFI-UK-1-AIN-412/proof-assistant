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
            |> Zipper.add (Proof.createFormulaStep "a")
            |> Zipper.down
            |> Zipper.add (Proof.createFormulaStep "b")
            |> Zipper.down
            |> Zipper.addCases
            |> Zipper.enterCase1
            |> Zipper.add (Proof.createFormulaStep "c")
    }



-- Update


type Msg
    = ZipperEdit Zipper.Zipper String
    | ZipperAdd Zipper.Zipper
    | ZipperAddCases Zipper.Zipper
    | ZipperExplanation Zipper.Zipper Proof.Explanation
    | ZipperDelete Zipper.Zipper
    | ZipperShowButtons Zipper.Zipper Bool


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperEdit zipper value ->
            let
                newProof =
                    case zipper.proof of
                        Proof.CasesNode _ _ ->
                            zipper.proof

                        Proof.FormulaNode expl formulaStep ->
                            Proof.FormulaNode expl { formulaStep | text = value }

                newZipper =
                    { zipper | proof = newProof }
            in
            { model | zipper = newZipper }

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
                Proof.Rule ->
                    ( True, False, False )

                Proof.Premise ->
                    ( False, True, False )

                Proof.Contradiction _ ->
                    ( False, False, True )
    in
    [ ButtonGroup.radioButtonGroup []
        [ ButtonGroup.radioButton
            isRule
            [ Button.primary, Button.onClick <| ZipperExplanation zipper Proof.Rule ]
            [ Html.text "Rule" ]
        , ButtonGroup.radioButton
            isPremise
            [ Button.primary, Button.onClick <| ZipperExplanation zipper Proof.Premise ]
            [ Html.text "Premise" ]
        , ButtonGroup.radioButton
            isContradiction
            [ Button.primary, Button.onClick <| ZipperExplanation zipper (Proof.Contradiction (Proof.createFormulaStep "")) ]
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
    Form.form [] [ Html.div [] [ renderStep zipper ] ]


renderStep : Zipper.Zipper -> Html.Html Msg
renderStep zipper =
    case zipper.proof of
        Proof.FormulaNode explanation formulaStep ->
            renderFormulaNode zipper explanation formulaStep

        Proof.CasesNode case1 case2 ->
            renderCases zipper case1 case2


renderCases : Zipper.Zipper -> Proof.FormulaStep -> Proof.FormulaStep -> Html.Html Msg
renderCases zipper case1 case2 =
    Html.div []
        [ Html.p []
            [ Html.text "Delete the 2 cases bellow"
            , buttonDelete zipper
            ]
        , Html.div [ innerStyle ]
            [ Html.h2 [] [ Html.text "Case 1" ]
            , renderStep <| Zipper.enterCase1 zipper
            ]
        , Html.div [ innerStyle ]
            [ Html.h2 [] [ Html.text "Case 2" ]
            , renderStep <| Zipper.enterCase2 zipper
            ]
        ]


renderFormulaNode : Zipper.Zipper -> Proof.Explanation -> Proof.FormulaStep -> Html.Html Msg
renderFormulaNode zipper explanation formulaStep =
    let
        ( inputGroup, subProof ) =
            case explanation of
                Proof.Rule ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit zipper
                            ]
                        )
                    , emptyNode
                    )

                Proof.Premise ->
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.placeholder "Formula"
                            , Input.value formulaStep.text
                            , Input.onInput <| ZipperEdit zipper
                            ]
                        )
                        |> InputGroup.predecessors [ InputGroup.span [] [ Html.text "Premis:" ] ]
                    , emptyNode
                    )

                Proof.Contradiction _ ->
                    -- todo: zobrazit contradiction vetvu!
                    ( InputGroup.config
                        (InputGroup.text
                            [ Input.disabled True
                            , Input.value formulaStep.text
                            ]
                        )
                    , Html.div [ innerStyle ]
                        [ Html.h2 [] [ Html.text "Proov by contradiction" ]
                        , renderStep <| Zipper.enterContradiction zipper
                        ]
                    )

        ( nextNode, isLast ) =
            case Zipper.downOrNothing zipper of
                Just newZipper ->
                    ( renderStep newZipper, False )

                Nothing ->
                    ( emptyNode, True )
    in
    Html.div []
        [ Form.group []
            [ inputGroup
                |> InputGroup.successors
                    [ InputGroup.button
                        [ Button.outlineInfo
                        , Button.onClick <| ZipperShowButtons zipper (not formulaStep.gui.showButtons)
                        ]
                        [ Html.text "?" ]
                    ]
                |> InputGroup.view
            ]
        , if formulaStep.gui.showButtons then
            buttonsList zipper explanation isLast
          else
            emptyNode
        , subProof
        , nextNode
        ]



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
