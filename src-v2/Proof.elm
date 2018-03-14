module Proof
    exposing
        ( Explanation(..)
        , FormulaStep
        , GUI
        , Proof(..)
        , addCases
        , addFormulaStep
        , createFormulaStep
        , setShowButtons
        )

import Formula
import Parser exposing (Parser)


type alias GUI =
    { showButtons : Bool
    }


type alias FormulaStep =
    { text : String
    , formula : Result Parser.Error Formula.Formula
    , next : Maybe Proof
    , gui : GUI
    }


createFormulaStep : String -> FormulaStep
createFormulaStep text =
    { text = text
    , formula = Formula.parse text
    , next = Nothing
    , gui = { showButtons = False }
    }


type Explanation
    = Premise
    | Rule
    | Contradiction FormulaStep


type Proof
    = FormulaNode Explanation FormulaStep
    | CasesNode FormulaStep FormulaStep


setShowButtons : Bool -> FormulaStep -> FormulaStep
setShowButtons bool formulaStep =
    let
        gui =
            formulaStep.gui

        newGui =
            { gui | showButtons = bool }
    in
    { formulaStep | gui = newGui }


addFormulaStep : FormulaStep -> Proof -> Proof
addFormulaStep formulaStep proof =
    case proof of
        FormulaNode expl oldFormulaStep ->
            case oldFormulaStep.next of
                Nothing ->
                    FormulaNode expl { oldFormulaStep | next = Just <| FormulaNode Rule formulaStep }

                Just nextStep ->
                    let
                        newNext =
                            FormulaNode Rule { formulaStep | next = Just nextStep }
                    in
                    FormulaNode expl
                        { oldFormulaStep | next = Just newNext }

        CasesNode _ _ ->
            proof


addCases : Proof -> Maybe Proof
addCases proof =
    case proof of
        FormulaNode expl formulaStep ->
            case formulaStep.next of
                Just _ ->
                    Nothing

                Nothing ->
                    let
                        newFormulaStep =
                            { formulaStep | next = Just <| CasesNode (createFormulaStep "") (createFormulaStep "") }
                    in
                    Just <| FormulaNode expl newFormulaStep

        CasesNode _ _ ->
            Nothing
