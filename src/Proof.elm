module Proof
    exposing
        ( Explanation(..)
        , FormulaStep
        , GUI
        , Justification(..)
        , Proof(..)
        , addCases
        , addCasesToCase1
        , addCasesToCase2
        , addFormulaStep
        , addFormulaStepCase1
        , addFormulaStepCase2
        , addFormulaStepToFromulaStep
        , changeFormulaStepText
        , createFormulaStep
        , getStatus
        , setShowButtons
        , tryParseFormula
        , validator
        , validatorCases
        )

import Formula
import List.Extra
import Matcher
import Maybe.Extra as MaybeExtra
import Parser exposing (Parser)


type alias GUI =
    { showButtons : Bool
    }


type alias FormulaStep =
    { text : String
    , formula : Result Parser.Error Formula.Formula
    , next : Maybe Proof
    , index : Int
    , gui : GUI
    }


createFormulaStep : String -> FormulaStep
createFormulaStep text =
    { text = text
    , formula = Formula.parse text
    , index = 0
    , next = Nothing
    , gui = { showButtons = True }
    }


changeFormulaStepText : String -> FormulaStep -> FormulaStep
changeFormulaStepText text formulaStep =
    { formulaStep | text = text, formula = Formula.parse text }


type Explanation
    = Premise
    | Rule (Maybe Justification)
    | Goal (Maybe Proof)
    | Contradiction (Maybe Proof)


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


addFormulaStepToFromulaStep : FormulaStep -> FormulaStep -> FormulaStep
addFormulaStepToFromulaStep toAdd original =
    case original.next of
        Nothing ->
            { original | next = Just <| FormulaNode (Rule Nothing) toAdd }

        Just nextStep ->
            let
                newNext =
                    FormulaNode (Rule Nothing) { toAdd | next = Just nextStep }
            in
            { original | next = Just newNext }


addFormulaStep : FormulaStep -> Proof -> Proof
addFormulaStep formulaStep proof =
    case proof of
        FormulaNode expl oldFormulaStep ->
            FormulaNode expl (addFormulaStepToFromulaStep formulaStep oldFormulaStep)

        CasesNode _ _ ->
            proof


addFormulaStepCase1 : FormulaStep -> Proof -> Proof
addFormulaStepCase1 formulaStep proof =
    case proof of
        FormulaNode _ _ ->
            proof

        CasesNode case1 case2 ->
            CasesNode (addFormulaStepToFromulaStep formulaStep case1) case2


addFormulaStepCase2 : FormulaStep -> Proof -> Proof
addFormulaStepCase2 formulaStep proof =
    case proof of
        FormulaNode _ _ ->
            proof

        CasesNode case1 case2 ->
            CasesNode case1 (addFormulaStepToFromulaStep formulaStep case2)


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


addCasesToCase1 : Proof -> Maybe Proof
addCasesToCase1 proof =
    case proof of
        FormulaNode _ _ ->
            Nothing

        CasesNode case1 case2 ->
            case case1.next of
                Just _ ->
                    Nothing

                Nothing ->
                    let
                        newCase1 =
                            { case1 | next = Just <| CasesNode (createFormulaStep "") (createFormulaStep "") }
                    in
                    Just <| CasesNode newCase1 case2


addCasesToCase2 : Proof -> Maybe Proof
addCasesToCase2 proof =
    case proof of
        FormulaNode _ _ ->
            Nothing

        CasesNode case1 case2 ->
            case case2.next of
                Just _ ->
                    Nothing

                Nothing ->
                    let
                        newCase2 =
                            { case2 | next = Just <| CasesNode (createFormulaStep "") (createFormulaStep "") }
                    in
                    Just <| CasesNode case1 newCase2



-- Matcher & Justification types


type Justification
    = ModusPonens Int Int
    | ModusTolens Int Int
    | HypotheticalSyllogism Int Int
    | Conjuction Int Int
    | DisjunctiveSyllogism Int Int
    | Addition Int
    | SameFormula Int
    | Simplification Int
    | ImplicationRemoval Int
    | DoubleNegation Int
    | ConstructiveDilemma Int Int
    | DestructiveDilemma Int Int
    | Grimaldi1 Int Int
    | Grimaldi2 Int Int
    | Axiom


type alias Validator =
    FormulaStep -> List FormulaStep -> Maybe Justification


type alias NullaryMatcherHelper =
    FormulaStep -> Maybe Justification


type alias UnaryMatcherHelper =
    FormulaStep -> FormulaStep -> Maybe Justification


type alias BinaryMatcherHelper =
    FormulaStep -> FormulaStep -> FormulaStep -> Maybe Justification



-- Validator logic


validator : Validator
validator step branch =
    binaryValidator step branch
        |> MaybeExtra.orElseLazy (\() -> unaryValidator step branch)
        |> MaybeExtra.orElseLazy (\() -> nullaryValidator step branch)


nullaryValidator : Validator
nullaryValidator step branch =
    matchAnyFunctions0
        step
        [ runValidator0 Matcher.matcherAxiom1 Axiom ]


unaryValidator : Validator
unaryValidator step branch =
    matchAnyFunctions1
        step
        branch
        [ runValidator1 Matcher.matcherAddition Addition
        , runValidator1 Matcher.matcherSimplification Simplification
        , runValidator1 Matcher.matcherSameFormula SameFormula
        , runValidator1 Matcher.matcherImplicationRemoval ImplicationRemoval
        , runValidator1 Matcher.matcherDoubleNegation DoubleNegation
        ]


binaryValidator : Validator
binaryValidator step branch =
    matchAnyFunctions2
        step
        (flatten <| List.Extra.select branch)
        [ runValidator2 Matcher.matcherModusPonens ModusPonens
        , runValidator2 Matcher.matcherModusTolens ModusTolens
        , runValidator2 Matcher.matcherHypotheticalSyllogism HypotheticalSyllogism
        , runValidator2 Matcher.matcherConjunction Conjuction
        , runValidator2 Matcher.matcherDisjunctiveSyllogism DisjunctiveSyllogism
        , runValidator2 Matcher.matcherConstructiveDilemma ConstructiveDilemma
        , runValidator2 Matcher.matcherDestructiveDilemma DestructiveDilemma
        , runValidator2 Matcher.matcherGrimaldi1 Grimaldi1
        , runValidator2 Matcher.matcherGrimaldi2 Grimaldi2
        ]


flatten : List ( FormulaStep, List FormulaStep ) -> List ( FormulaStep, FormulaStep )
flatten original =
    List.foldl (\( x, xs ) final -> List.map ((,) x) xs ++ final) [] original



-- Showing matched or error messages


matcherToStr : Justification -> String
matcherToStr matched =
    case matched of
        ModusPonens index1 index2 ->
            "Justification by: Modus Ponens from formulas " ++ toString index1 ++ " and " ++ toString index2

        ModusTolens index1 index2 ->
            "Justification by: Modus Tolens from formulas " ++ toString index1 ++ " and " ++ toString index2

        HypotheticalSyllogism index1 index2 ->
            "Justification by: Hypothetical Syllogism from formulas " ++ toString index1 ++ " and " ++ toString index2

        Conjuction index1 index2 ->
            "Justification by: Conjuction from formulas " ++ toString index1 ++ " and " ++ toString index2

        DisjunctiveSyllogism index1 index2 ->
            "Justification by: Disjunctive Syllogism from formulas " ++ toString index1 ++ " and " ++ toString index2

        ConstructiveDilemma index1 index2 ->
            "Justification by: Constructive Dilemma from formulas " ++ toString index1 ++ " and " ++ toString index2

        DestructiveDilemma index1 index2 ->
            "Justification by: Destructive Dilemma from formulas " ++ toString index1 ++ " and " ++ toString index2

        Grimaldi1 index1 index2 ->
            "Justification by: Grimaldi1 from formulas " ++ toString index1 ++ " and " ++ toString index2

        Grimaldi2 index1 index2 ->
            "Justification by: Grimaldi2 from formulas " ++ toString index1 ++ " and " ++ toString index2

        Addition index ->
            "Justification by: Addition from formula " ++ toString index

        Simplification index ->
            "Justification by: Simplification from formula " ++ toString index

        SameFormula index ->
            "This formula already appears on step " ++ toString index

        ImplicationRemoval index ->
            "Implication removed from formula " ++ toString index

        DoubleNegation index ->
            "Double negation removed from formula " ++ toString index

        Axiom ->
            "Justification by: Axiom"


tryParseFormula : FormulaStep -> Maybe String
tryParseFormula formulaStep =
    if formulaStep.text == "" then
        Just "Formula should not be empty"
    else
        case formulaStep.formula of
            Err error ->
                Just <| "Could not parse: " ++ toString error

            Ok _ ->
                Nothing


getStatus : Explanation -> FormulaStep -> Result String String
getStatus explanation formulaStep =
    case tryParseFormula formulaStep of
        Just errorMsg ->
            Err errorMsg

        Nothing ->
            case explanation of
                Premise ->
                    Ok ""

                Goal proof ->
                    -- todo: toto ma byt OK iba ak je Goal niekde oznacny za validny
                    Err "This is not implemented yet!"

                Rule maybeJustification ->
                    case maybeJustification of
                        Nothing ->
                            Err "Could not match for any rule"

                        Just matched ->
                            Ok <| matcherToStr matched

                Contradiction _ ->
                    -- todo
                    Err "This is not implemented yet!"



-- helpers


runValidator0 : Matcher.NullaryMatcher -> Justification -> FormulaStep -> Maybe Justification
runValidator0 matcherFunction answerFunction toProve =
    helper0 matcherFunction toProve answerFunction


runValidator1 : Matcher.UnaryMatcher -> (Int -> Justification) -> FormulaStep -> FormulaStep -> Maybe Justification
runValidator1 matcherFunction answerFunction from toProve =
    helper1 matcherFunction from toProve (answerFunction from.index)


runValidator2 : Matcher.BinaryMatcher -> (Int -> Int -> Justification) -> FormulaStep -> FormulaStep -> FormulaStep -> Maybe Justification
runValidator2 matcherFunction answerFunction from1 from2 toProve =
    helper2 matcherFunction from1 from2 toProve (answerFunction from1.index from2.index)


matchAnyFunctions0 : FormulaStep -> List NullaryMatcherHelper -> Maybe Justification
matchAnyFunctions0 toProve functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst0 toProve function of
                Just x ->
                    Just x

                Nothing ->
                    matchAnyFunctions0 toProve rest


matchAnyFunctions1 : FormulaStep -> List FormulaStep -> List UnaryMatcherHelper -> Maybe Justification
matchAnyFunctions1 toProve allCombinations functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst1 toProve allCombinations function of
                Just x ->
                    Just x

                Nothing ->
                    matchAnyFunctions1 toProve allCombinations rest


matchAnyFunctions2 : FormulaStep -> List ( FormulaStep, FormulaStep ) -> List BinaryMatcherHelper -> Maybe Justification
matchAnyFunctions2 toProve allCombinations functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst2 toProve allCombinations function of
                Just x ->
                    Just x

                Nothing ->
                    matchAnyFunctions2 toProve allCombinations rest


matchFirst0 : FormulaStep -> NullaryMatcherHelper -> Maybe Justification
matchFirst0 step function =
    function step


matchFirst1 : FormulaStep -> List FormulaStep -> UnaryMatcherHelper -> Maybe Justification
matchFirst1 step branch function =
    case branch of
        [] ->
            Nothing

        this :: rest ->
            case function this step of
                Nothing ->
                    matchFirst1 step rest function

                Just x ->
                    Just x


matchFirst2 : FormulaStep -> List ( FormulaStep, FormulaStep ) -> BinaryMatcherHelper -> Maybe Justification
matchFirst2 step branch function =
    case branch of
        [] ->
            Nothing

        this :: rest ->
            case function (Tuple.first this) (Tuple.second this) step of
                Nothing ->
                    matchFirst2 step rest function

                Just x ->
                    Just x


helper0 : Matcher.NullaryMatcher -> FormulaStep -> Justification -> Maybe Justification
helper0 func toProve answer =
    case toProve.formula of
        Ok toProveOK ->
            if func toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing


helper1 : Matcher.UnaryMatcher -> FormulaStep -> FormulaStep -> Justification -> Maybe Justification
helper1 func from toProve answer =
    case ( from.formula, toProve.formula ) of
        ( Ok fromOK, Ok toProveOK ) ->
            if func fromOK toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing


helper2 : Matcher.BinaryMatcher -> FormulaStep -> FormulaStep -> FormulaStep -> Justification -> Maybe Justification
helper2 func from1 from2 toProve answer =
    case ( from1.formula, from2.formula, toProve.formula ) of
        ( Ok from1OK, Ok from2OK, Ok toProveOK ) ->
            if func from1OK from2OK toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing



-- Cases validator


validatorCases : Formula.Formula -> Formula.Formula -> List FormulaStep -> Result String String
validatorCases formula1 formula2 branch =
    case branch of
        [] ->
            Err "Invalid cases! This is not valid from any formula above"

        this :: rest ->
            case this.formula of
                Ok (Formula.Disj a b) ->
                    if (formula1 == a && formula2 == b) || (formula1 == b && formula2 == a) then
                        Ok <| "This is valid from formula " ++ toString this.index
                    else
                        validatorCases formula1 formula2 rest

                _ ->
                    validatorCases formula1 formula2 rest
