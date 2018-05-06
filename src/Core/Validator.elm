module Validator exposing (..)

import Formula
import Matcher
import Maybe.Extra as MaybeExtra
import Set
import Types exposing (..)


type alias Validator =
    FormulaStep -> List FormulaStep -> Maybe Justification


type alias NullaryMatcherHelper =
    FormulaStep -> Maybe Justification


type alias UnaryMatcherHelper =
    FormulaStep -> FormulaStep -> Maybe Justification


type alias BinaryMatcherHelper =
    FormulaStep -> FormulaStep -> FormulaStep -> Maybe Justification


validator : Validator
validator step branch =
    binaryValidator step branch
        |> MaybeExtra.orElseLazy (\() -> unaryValidator step branch)
        |> MaybeExtra.orElseLazy (\() -> nullaryValidator step branch)
        |> MaybeExtra.orElseLazy (\() -> speciallFirstOrderLogicValidator step branch)


nullaryValidator : Validator
nullaryValidator step branch =
    matchAnyFunctions0
        step
        [ runValidator0 Matcher.matcherAxiomP1 Axiom
        , runValidator0 Matcher.matcherAxiomP2 Axiom
        , runValidator0 Matcher.matcherAxiomP3 Axiom
        , runValidator0 Matcher.matcherAxiomP4 Axiom
        , runValidator0 Matcher.matcherAxiomQ6 Axiom
        ]


unaryValidator : Validator
unaryValidator step branch =
    matchAnyFunctions1
        step
        branch
        [ runValidator1 Matcher.matcherAddition Addition
        , runValidator1 Matcher.matcherSimplification Simplification
        , runValidator1 Matcher.matcherIdentity Identity
        , runValidator1 Matcher.matcherImplicationRemoval ImplicationRemoval
        , runValidator1 Matcher.matcherImplicationIntroduction ImplicationIntroduction
        , runValidator1 Matcher.matcherDoubleNegationRemoval DoubleNegationRemoval
        , runValidator1 Matcher.matcherDoubleNegationIntroduction DoubleNegationIntroduction
        , runValidator1 Matcher.matcherAddExistentialQuantifier FirstOrderAddExistentialQunatifier
        , runValidator1 Matcher.matcherRemoveUniversalQuantifier FirstOrderRemoveUniversalQunatifier
        ]


generateNewFreeVariable freeVariables =
    let
        newName num =
            "x" ++ toString num

        getNewFree last =
            if List.member (newName last) freeVariables then
                getNewFree (last + 1)
            else
                newName last
    in
    getNewFree 0


getFreeVariables branch =
    let
        freeVariablesInFormulas =
            List.map
                (\s ->
                    case s.formula of
                        Ok formula ->
                            Formula.freeFormula formula

                        Err _ ->
                            Set.empty
                )
                branch
    in
    Set.toList <| List.foldr Set.union Set.empty freeVariablesInFormulas


speciallFirstOrderLogicValidator : Validator
speciallFirstOrderLogicValidator step branch =
    let
        function formula branch =
            case branch of
                [] ->
                    Nothing

                head :: tail ->
                    case head.formula of
                        Ok formula2 ->
                            if Matcher.matcherRemoveExistentialQuantifier formula2 formula (getFreeVariables branch) then
                                Just <| FirstOrderRemoveExistentialQunatifier head.index
                            else
                                function formula tail

                        Err _ ->
                            function formula tail
    in
    case step.formula of
        Ok formula ->
            function formula branch

        Err _ ->
            Nothing


matcherRemoveExistentialQuantifier : FormulaStep -> List FormulaStep -> List UnaryMatcherHelper -> Maybe Justification
matcherRemoveExistentialQuantifier toProve allCombinations functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst1 toProve allCombinations function of
                Just x ->
                    Just x

                Nothing ->
                    matchAnyFunctions1 toProve allCombinations rest


binaryValidator : Validator
binaryValidator step branch =
    matchAnyFunctions2
        step
        (cartesian branch branch)
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


cartesian : List a -> List b -> List ( a, b )
cartesian xs ys =
    List.concatMap (\x -> List.map (\y -> ( x, y )) ys) xs



-- Showing matched or error messages


matcherToStr : Justification -> String
matcherToStr matched =
    case matched of
        ModusPonens index1 index2 ->
            "Modus Ponens from formulas " ++ toString index1 ++ " and " ++ toString index2

        ModusTolens index1 index2 ->
            "Modus Tolens from formulas " ++ toString index1 ++ " and " ++ toString index2

        HypotheticalSyllogism index1 index2 ->
            "Hypothetical Syllogism from formulas " ++ toString index1 ++ " and " ++ toString index2

        Conjuction index1 index2 ->
            "Conjuction from formulas " ++ toString index1 ++ " and " ++ toString index2

        DisjunctiveSyllogism index1 index2 ->
            "Disjunctive Syllogism from formulas " ++ toString index1 ++ " and " ++ toString index2

        ConstructiveDilemma index1 index2 ->
            "Constructive Dilemma from formulas " ++ toString index1 ++ " and " ++ toString index2

        DestructiveDilemma index1 index2 ->
            "Destructive Dilemma from formulas " ++ toString index1 ++ " and " ++ toString index2

        Grimaldi1 index1 index2 ->
            "Grimaldi1 from formulas " ++ toString index1 ++ " and " ++ toString index2

        Grimaldi2 index1 index2 ->
            "Grimaldi2 from formulas " ++ toString index1 ++ " and " ++ toString index2

        Addition index ->
            "Addition from formula " ++ toString index

        Simplification index ->
            "Simplification from formula " ++ toString index

        Identity index ->
            "This formula already appears on step " ++ toString index

        ImplicationRemoval index ->
            "Implication removed from formula " ++ toString index

        ImplicationIntroduction index ->
            "Implication introducted from formula " ++ toString index

        DoubleNegationRemoval index ->
            "Double negation removed from formula " ++ toString index

        DoubleNegationIntroduction index ->
            "Double negation introducted from formula " ++ toString index

        FirstOrderRemoveUniversalQunatifier index ->
            "Universal quantifier removed from formula " ++ toString index

        FirstOrderRemoveExistentialQunatifier index ->
            "Existential quantifier removed from formula " ++ toString index

        FirstOrderAddExistentialQunatifier index ->
            "Existential quantifier added from formula " ++ toString index

        Axiom ->
            "This is an axiom"


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
            Err "Invalid cases! This is not valid from any formula above, cases node must match formula (A|B)"

        this :: rest ->
            case this.formula of
                Ok (Formula.Disj a b) ->
                    if (formula1 == a && formula2 == b) || (formula1 == b && formula2 == a) then
                        Ok <| "This is valid from formula " ++ toString this.index
                    else
                        validatorCases formula1 formula2 rest

                _ ->
                    validatorCases formula1 formula2 rest
