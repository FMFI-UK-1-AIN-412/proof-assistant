module Editor exposing (Model, Msg(..), initialModel, render, subscriptions, update)

--import ErrorHandler

import Bootstrap.Button as Button
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
    | ZipperContradiction Zipper.Zipper
    | ZipperDelete Zipper.Zipper
    | ZipperShowButtons Zipper.Zipper Bool


update : Msg -> Model -> Model
update msg model =
    case msg of
        ZipperEdit zipper value ->
            -- todo
            model

        ZipperAdd zipper ->
            { model | zipper = Zipper.add (Proof.createFormulaStep "") zipper }

        ZipperAddCases zipper ->
            -- todo
            model

        ZipperExplanation zipper explanation ->
            -- todo
            model

        ZipperContradiction zipper ->
            -- todo
            model

        ZipperDelete zipper ->
            -- todo
            model

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


myButton onClick style text =
    Button.button
        [ Button.attrs [ Html.Attributes.class "ml-1" ]
        , Button.onClick onClick
        , style
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


buttonContradiction : Zipper.Zipper -> String -> Html.Html Msg
buttonContradiction zipper text =
    myButton (ZipperContradiction zipper) Button.outlineDanger text


buttonDelete : Zipper.Zipper -> Html.Html Msg
buttonDelete zipper =
    myButton (ZipperDelete zipper) Button.outlineDanger "x"


buttonsList : Zipper.Zipper -> Proof.FormulaStep -> Bool -> Html.Html Msg
buttonsList zipper element includeCasesButton =
    let
        buttons =
            [ buttonAdd zipper
            , if includeCasesButton then
                buttonAddCases zipper
              else
                emptyNode
            , buttonDelete zipper
            , buttonContradiction zipper "Contradict"
            ]
    in
    if element.gui.showButtons then
        Html.div [] buttons
    else
        emptyNode


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
        ( nextNode, isLast ) =
            case Zipper.downOrNothing zipper of
                Just newZipper ->
                    ( renderStep newZipper, False )

                Nothing ->
                    ( emptyNode, True )
    in
    Html.div []
        [ Form.group []
            [ InputGroup.config
                (InputGroup.text
                    [ Input.placeholder "Formula"
                    , Input.value formulaStep.text
                    , Input.onInput <| ZipperEdit zipper
                    ]
                )
                --|> predecessor
                |> InputGroup.successors
                    [ InputGroup.button
                        [ Button.outlineInfo
                        , Button.onClick <| ZipperShowButtons zipper (not formulaStep.gui.showButtons)
                        ]
                        [ Html.text "?" ]
                    ]
                |> InputGroup.view
            ]
        , buttonsList zipper formulaStep isLast
        , nextNode
        ]



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
