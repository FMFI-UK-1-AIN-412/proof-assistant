module Proof
    exposing
        ( Where(..)
        , addCases
        , addFormulaStep
        , applyFunction
        , changeFormulaStepText
        , createFormulaStep
        , getAllBranches
        , getHelpTextAddUniversal
        , getImplicationAntecedent
        , getStatus
        , setCollapsed
        , setShowButtons
        , tryParseFormula
        )

import Core.Matcher as Matcher
import Dict
import Formula
import List.Extra
import Parser
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
        CasesNode case1 next1 case2 next2 ->
            case whr of
                OnNode ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase1 ->
                    CasesNode (function case1) next1 case2 next2

                OnCase2 ->
                    CasesNode case1 next1 (function case2) next2

        FormulaNode expl data next ->
            case whr of
                OnNode ->
                    FormulaNode expl (function data) next

                OnCase1 ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase2 ->
                    Debug.crash "This was not supposed to be called!" proof


setNextProof : Where -> (Maybe Proof -> Maybe Proof) -> Proof -> Proof
setNextProof whr function proof =
    case proof of
        CasesNode case1 next1 case2 next2 ->
            case whr of
                OnNode ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase1 ->
                    CasesNode case1 (function next1) case2 next2

                OnCase2 ->
                    CasesNode case1 next1 case2 (function next2)

        FormulaNode expl data next ->
            case whr of
                OnNode ->
                    FormulaNode expl data (function next)

                OnCase1 ->
                    Debug.crash "This was not supposed to be called!" proof

                OnCase2 ->
                    Debug.crash "This was not supposed to be called!" proof


addFormulaStep : Where -> FormulaStep -> Proof -> Proof
addFormulaStep whr toAdd proof =
    let
        function next =
            case next of
                Nothing ->
                    Just <| FormulaNode (Rule Nothing) toAdd Nothing

                Just nextStep ->
                    Just <| FormulaNode (Rule Nothing) toAdd (Just nextStep)
    in
    setNextProof whr function proof


addCases : Where -> Proof -> Proof
addCases whr proof =
    let
        function next =
            case next of
                Just prf ->
                    Just prf

                Nothing ->
                    Just <| CasesNode (createFormulaStep "") Nothing (createFormulaStep "") Nothing
    in
    setNextProof whr function proof



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

                Goal proof ->
                    getStatusGoal branchAbove formula proof

                Contradiction proof ->
                    getStatusContradiction branchAbove formula proof

                Generalization newVariable proof ->
                    getStatusAddUniversal formula proof newVariable


provenText : String -> List Bool -> Result String String
provenText str list =
    if List.all identity list then
        Ok <| str ++ " is proven"
    else if not <| List.any identity list then
        Err <| str ++ " is not proven yet"
    else
        Err <| str ++ " is only proven in " ++ toString (List.length <| List.filter identity list) ++ " out of " ++ toString (List.length list) ++ " branches"


getHelpTextAddUniversal : Result Parser.Error Formula.Formula -> String -> Result String String
getHelpTextAddUniversal maybeFormula const =
    case maybeFormula of
        Ok (Formula.ForAll var formula) ->
            case Formula.substitute (Dict.fromList [ ( var, Formula.Var const ) ]) formula of
                Ok f ->
                    Ok <| Formula.strFormula f

                Err _ ->
                    Err ""

        _ ->
            Err ""


getStatusAddUniversal : Formula.Formula -> Maybe Proof -> String -> Result String String
getStatusAddUniversal formula maybeProof newVariable =
    case formula of
        Formula.ForAll _ _ ->
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
                    provenText "Generalization" <| List.map function allBranches

        _ ->
            Err "Generalization must have the ∀x(φ) format"


getStatusRule : Maybe Justification -> Result String String
getStatusRule maybeJustification =
    case maybeJustification of
        Nothing ->
            Err "Could not match any rule"

        Just matched ->
            Ok <| Validator.matcherToStr matched


getStatusGC : List FormulaStep -> Formula.Formula -> Proof -> List Bool
getStatusGC branchAbove formula proof =
    let
        parsedBranchAbove =
            List.filterMap (.formula >> Result.toMaybe) branchAbove

        -- Direct Proof
        isDirectProof : List Formula.Formula -> Bool
        isDirectProof branch =
            List.any identity (List.map ((==) formula) branch)

        -- By contradiction
        isNegation : Formula.Formula -> Formula.Formula -> Bool
        isNegation first second =
            Formula.Neg first == second || first == Formula.Neg second

        isFormulaInContradiction : Formula.Formula -> List Formula.Formula -> Bool
        isFormulaInContradiction elem branch =
            List.any identity (List.map (isNegation elem) branch)

        branchForContradiction : List Formula.Formula -> List Formula.Formula
        branchForContradiction branch =
            parsedBranchAbove ++ [ Formula.Neg formula ] ++ branch

        isContradictionProof : List Formula.Formula -> Bool
        isContradictionProof branch =
            List.any (\( x, xs ) -> isFormulaInContradiction x xs) (List.Extra.select <| branchForContradiction branch)

        -- Proof
        isValidOnBranch : List FormulaStep -> Bool
        isValidOnBranch branch =
            let
                parsedFormulas =
                    List.filterMap (.formula >> Result.toMaybe) branch
            in
            isDirectProof parsedFormulas || isContradictionProof parsedFormulas
    in
    List.map isValidOnBranch <| getAllBranches proof


getStatusGoal : List FormulaStep -> Formula.Formula -> Maybe Proof -> Result String String
getStatusGoal branchAbove formula maybeProof =
    case maybeProof of
        Nothing ->
            Err "Prove the goal in the sub-proof"

        Just proof ->
            provenText "The goal" <| getStatusGC branchAbove formula proof


getStatusContradiction : List FormulaStep -> Formula.Formula -> Maybe Proof -> Result String String
getStatusContradiction branchAbove formula maybeProof =
    case maybeProof of
        Nothing ->
            Err "Contradiction not found"

        Just proof ->
            provenText "Contradiction" <| getStatusGC branchAbove formula proof


getAllBranches : Proof -> List (List FormulaStep)
getAllBranches proof =
    case proof of
        FormulaNode _ data maybeNext ->
            case maybeNext of
                Nothing ->
                    [ [ data ] ]

                Just next ->
                    List.map (\lst -> data :: lst) <| getAllBranches next

        CasesNode case1 maybeNext1 case2 maybeNext2 ->
            case ( maybeNext1, maybeNext2 ) of
                ( Nothing, Nothing ) ->
                    [ [ case1 ], [ case2 ] ]

                ( Just next1, Nothing ) ->
                    [ case2 ] :: List.map (\lst -> case1 :: lst) (getAllBranches next1)

                ( Nothing, Just next2 ) ->
                    [ case1 ] :: List.map (\lst -> case1 :: lst) (getAllBranches next2)

                ( Just next1, Just next2 ) ->
                    List.map (\lst -> case1 :: lst) (getAllBranches next1)
                        ++ List.map (\lst -> case2 :: lst) (getAllBranches next2)


getImplicationAntecedent : FormulaStep -> Maybe FormulaStep
getImplicationAntecedent data =
    case data.formula of
        Ok (Formula.Impl a b) ->
            let
                newData =
                    createFormulaStep (Formula.strFormula a)
            in
            -- Todo: this is not intuitive but whatever.
            Just { newData | index = data.index }

        _ ->
            Nothing



-- Debuging functions


printBranches : List (List FormulaStep) -> String
printBranches branches =
    "[" ++ String.join ", " (List.map printBranch branches) ++ "]"


printBranch : List FormulaStep -> String
printBranch branch =
    "[" ++ String.join ", " (List.map .text branch) ++ "]"
