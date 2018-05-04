module Proof
    exposing
        ( Where(..)
        , addCases
        , addFormulaStep
        , applyFunction
        , changeFormulaStepText
        , createFormulaStep
        , getAllBranches
        , getStatus
        , setCollapsed
        , setShowButtons
        , tryParseFormula
        )

import Dict
import Formula
import List.Extra
import Matcher
import Parser exposing (Parser)
import Types exposing (..)
import Validator


type Where
    = OnNode
    | OnCase1
    | OnCase2



-- Editing FormulaStep


createFormulaStep : String -> FormulaStep
createFormulaStep text =
    { text = text
    , formula = Formula.parse text
    , index = 0
    , next = Nothing
    , gui = { showButtons = True, collapsed = False }
    }


changeFormulaStepText : String -> FormulaStep -> FormulaStep
changeFormulaStepText text formulaStep =
    { formulaStep | text = text, formula = Formula.parse text }


setShowButtons : Bool -> FormulaStep -> FormulaStep
setShowButtons bool formulaStep =
    let
        gui =
            formulaStep.gui

        newGui =
            { gui | showButtons = bool }
    in
    { formulaStep | gui = newGui }


setCollapsed : Bool -> FormulaStep -> FormulaStep
setCollapsed bool formulaStep =
    let
        gui =
            formulaStep.gui

        newGui =
            { gui | collapsed = bool }
    in
    { formulaStep | gui = newGui }



-- Editing Proof


applyFunction : Where -> (FormulaStep -> FormulaStep) -> Proof -> Proof
applyFunction whr function proof =
    case proof of
        CasesNode case1 case2 ->
            case whr of
                OnNode ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase1 ->
                    CasesNode (function case1) case2

                OnCase2 ->
                    CasesNode case1 (function case2)

        FormulaNode expl data ->
            case whr of
                OnNode ->
                    FormulaNode expl (function data)

                OnCase1 ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase2 ->
                    Debug.crash "This was not supposed to be called!" proof


addFormulaStep : Where -> FormulaStep -> Proof -> Proof
addFormulaStep whr toAdd proof =
    let
        function original =
            case original.next of
                Nothing ->
                    { original | next = Just <| FormulaNode (Rule Nothing) toAdd }

                Just nextStep ->
                    { original | next = Just <| FormulaNode (Rule Nothing) { toAdd | next = Just nextStep } }
    in
    applyFunction whr function proof


addCases : Where -> Proof -> Proof
addCases whr proof =
    let
        function data =
            case data.next of
                Just _ ->
                    data

                Nothing ->
                    { data | next = Just <| CasesNode (createFormulaStep "") (createFormulaStep "") }
    in
    applyFunction whr function proof



-- Get Proof status


getErrorOrFormula : FormulaStep -> Result String Formula.Formula
getErrorOrFormula formulaStep =
    if formulaStep.text == "" then
        Err "Formula should not be empty"
    else
        case formulaStep.formula of
            Err error ->
                Err <| "Could not parse: " ++ toString error

            Ok formula ->
                Ok formula


tryParseFormula : FormulaStep -> Maybe String
tryParseFormula data =
    case getErrorOrFormula data of
        Ok _ ->
            Nothing

        Err err ->
            Just err


getStatus : Explanation -> FormulaStep -> List FormulaStep -> Result String String
getStatus explanation data branchAbove =
    case getErrorOrFormula data of
        Err err ->
            Err err

        Ok formula ->
            case explanation of
                Premise ->
                    Ok ""

                Rule maybeJustification ->
                    getStatusRule maybeJustification

                Goal maybeProof ->
                    getStatusGoal formula maybeProof

                Contradiction contradiction ->
                    getStatusContradiction branchAbove data contradiction

                Generalization newVariable proof ->
                    getStatusAddUniversal formula proof newVariable


getStatusAddUniversal : Formula.Formula -> Maybe Proof -> String -> Result String String
getStatusAddUniversal formula maybeProof newVariable =
    case maybeProof of
        Nothing ->
            Err "Prove the generalization in the sub-proof"

        Just proof ->
            let
                toBeMatched =
                    case formula of
                        Formula.ForAll premenna f ->
                            let
                                sub =
                                    Dict.fromList [ ( premenna, Formula.Var newVariable ) ]
                            in
                            case Formula.substitute sub f of
                                Ok formula ->
                                    Just <| formula

                                Err _ ->
                                    Nothing

                        _ ->
                            Nothing

                equal this =
                    case this.formula of
                        Ok thisFormula ->
                            toBeMatched == Just thisFormula

                        Err _ ->
                            False

                function branch =
                    List.any identity (List.map equal branch)

                allBranches =
                    getAllBranches proof
            in
            if List.all function <| allBranches then
                Ok "Generalization was proven to be correct"
            else if List.length allBranches == 1 then
                Err "Generalization not yet proven"
            else
                Err "Generalization not yet proven in all branches"


getStatusRule : Maybe Justification -> Result String String
getStatusRule maybeJustification =
    case maybeJustification of
        Nothing ->
            Err "Could not match any rule"

        Just matched ->
            Ok <| Validator.matcherToStr matched


getStatusGoal : Formula.Formula -> Maybe Proof -> Result String String
getStatusGoal formula maybeProof =
    case maybeProof of
        Nothing ->
            Err "Prove the goal in the sub-proof"

        Just proof ->
            let
                equal this =
                    case this.formula of
                        Ok thisFormula ->
                            formula == thisFormula

                        Err _ ->
                            False

                function branch =
                    List.any identity (List.map equal branch)

                allBranches =
                    getAllBranches proof

                _ =
                    Debug.log "wow" <| printBranches allBranches
            in
            if List.all function <| allBranches then
                Ok "The goal was proven"
            else if List.length allBranches == 1 then
                Err "Goal is not yet proven"
            else
                Err "Goal is not yet proven in all branches"


getStatusContradiction : List FormulaStep -> FormulaStep -> Maybe Proof -> Result String String
getStatusContradiction branchAbove formulaStep maybeProof =
    case maybeProof of
        Nothing ->
            Err "Contradiction not found"

        Just proof ->
            let
                zneguj data =
                    changeFormulaStepText ("-" ++ data.text) data

                allBranches =
                    List.map (\brach -> branchAbove ++ [ zneguj formulaStep ] ++ brach) (getAllBranches proof)

                equal first second =
                    Formula.Neg first == second || first == Formula.Neg second

                iterate elem lst =
                    List.any identity (List.map (equal elem) lst)

                splited branch =
                    List.Extra.select <| List.filterMap (.formula >> Result.toMaybe) branch

                function branch =
                    List.any (\( x, xs ) -> iterate x xs) (splited branch)
            in
            if List.all function allBranches then
                Ok "Contradiction is valid"
            else
                Err "Contradiction not found"


getAllBranches : Proof -> List (List FormulaStep)
getAllBranches proof =
    case proof of
        FormulaNode _ data ->
            case data.next of
                Nothing ->
                    [ [ data ] ]

                Just next ->
                    List.map (\lst -> data :: lst) <| getAllBranches next

        CasesNode case1 case2 ->
            case ( case1.next, case2.next ) of
                ( Nothing, Nothing ) ->
                    [ [ case1 ], [ case2 ] ]

                ( Just next1, Nothing ) ->
                    [ case2 ] :: List.map (\lst -> case1 :: lst) (getAllBranches next1)

                ( Nothing, Just next2 ) ->
                    [ case1 ] :: List.map (\lst -> case1 :: lst) (getAllBranches next2)

                ( Just next1, Just next2 ) ->
                    List.map (\lst -> case1 :: lst) (getAllBranches next1)
                        ++ List.map (\lst -> case2 :: lst) (getAllBranches next2)



-- Debuging functions


printBranches : List (List FormulaStep) -> String
printBranches branches =
    "[" ++ String.join ", " (List.map printBranch branches) ++ "]"


printBranch : List FormulaStep -> String
printBranch branch =
    "[" ++ String.join ", " (List.map .text branch) ++ "]"
