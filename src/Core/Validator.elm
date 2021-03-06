module Core.Validator exposing (..)

import Core.Matcher as Matcher
import Formula
import Maybe.Extra as MaybeExtra
import Set
import Core.Types exposing (..)


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
        [ runValidator0 Matcher.matcherAxiomA1 (Axiom "φ → (ψ → φ)")
        , runValidator0 Matcher.matcherAxiomA2 (Axiom "(φ → (ψ → ξ)) → ((φ → ψ) → (φ → ξ))")
        , runValidator0 Matcher.matcherAxiomA3 (Axiom "(¬φ → ¬ψ) → ((¬φ → ψ) → φ))")
        , runValidator0 Matcher.matcherAxiomA4 (Axiom "(ϕ ∧ ψ) → ϕ")
        , runValidator0 Matcher.matcherAxiomA5 (Axiom "ϕ → (ψ → (ϕ ∧ ψ))")
        , runValidator0 Matcher.matcherAxiomA6 (Axiom "ϕ → (ϕ ∨ ψ)")
        , runValidator0 Matcher.matcherAxiomA7 (Axiom " (ϕ → ξ) → ((ψ → ξ) → ((ϕ ∨ ψ) → ξ))")
        , runValidator0 Matcher.matcherAxiomQ6 (Axiom "∀x(φ → ψ) → (∀x(φ) → ∀x(ψ))")
        , runValidator0 Matcher.matcherOnlyTwoOptions (Justification0 "Tautology")
        ]


unaryValidator : Validator
unaryValidator step branch =
    matchAnyFunctions1
        step
        branch
        [ runValidator1 Matcher.matcherAddition (Justification1 "Addition")
        , runValidator1 Matcher.matcherSimplification (Justification1 "Simplification")
        , runValidator1 Matcher.matcherIdentity (Justification1 "Identity")
        , runValidator1 Matcher.matcherImplicationRemoval (Justification1 "Implication removed")
        , runValidator1 Matcher.matcherImplicationIntroduction (Justification1 "Implication introduction (1)")
        , runValidator1 Matcher.matcherImplicationIntroduction2 (Justification1 "Implication introduction (2)")
        , runValidator1 Matcher.matcherImplicationIntroduction3 (Justification1 "Implication introduction (3)")
        , runValidator1 Matcher.matcherDoubleNegationRemoval (Justification1 "Double negation removed")
        , runValidator1 Matcher.matcherDoubleNegationIntroduction (Justification1 "Double negation introduction")
        , runValidator1 Matcher.matcherAddExistentialQuantifier (Justification1 "Existential quantifier added")
        , runValidator1 Matcher.matcherRemoveUniversalQuantifier (Justification1 "Universal quantifier removed")
        , runValidator1 Matcher.matcherComutative (Justification1 "Commutative")
        , runValidator1 Matcher.matcherIdempotency (Justification1 "Idempotency")
        , runValidator1 Matcher.matcherDeMorgan (Justification1 "De Morgan rule")
        , runValidator1 Matcher.matcherDeMorganFirstOrder (Justification1 "De Morgan rule")
        , runValidator1 Matcher.matcherAssociativity (Justification1 "Associativity")
        , runValidator1 Matcher.matcherDistributive (Justification1 "Distributivity")
        ]


binaryValidator : Validator
binaryValidator step branch =
    matchAnyFunctions2
        step
        (cartesian branch branch)
        [ runValidator2 Matcher.matcherModusPonens (Justification2 "Modus Ponens")
        , runValidator2 Matcher.matcherModusTolens (Justification2 "Modus Tolens")
        , runValidator2 Matcher.matcherHypotheticalSyllogism (Justification2 "Hypothetical Syllogism")
        , runValidator2 Matcher.matcherConjunction (Justification2 "Conjuction")
        , runValidator2 Matcher.matcherDisjunctiveSyllogism (Justification2 "Disjunctive Syllogism")
        , runValidator2 Matcher.matcherConstructiveDilemma (Justification2 "Constructive Dilemma")
        , runValidator2 Matcher.matcherDestructiveDilemma (Justification2 "Destructive Dilemma")
        , runValidator2 Matcher.matcherGrimaldiContradiction (Justification2 "Contradiction")
        , runValidator2 Matcher.matcherGrimaldiCases (Justification2 "Cases")
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
        function data =
            case data.formula of
                Ok formula ->
                    Formula.freeFormula formula

                Err _ ->
                    Set.empty

        freeVariablesInFormulas =
            List.map function branch
    in
    Set.toList <| List.foldr Set.union Set.empty freeVariablesInFormulas


speciallFirstOrderLogicValidator : Validator
speciallFirstOrderLogicValidator step branch =
    let
        freeVariables =
            getFreeVariables branch

        function formula others =
            case others of
                [] ->
                    Nothing

                head :: tail ->
                    case head.formula of
                        Ok formula2 ->
                            if Matcher.matcherRemoveExistentialQuantifier formula2 formula freeVariables then
                                Just <| Justification1 "Existential quantifier removed" head.index
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


cartesian : List a -> List b -> List ( a, b )
cartesian xs ys =
    List.concatMap (\x -> List.map (\y -> ( x, y )) ys) xs



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
                        Ok <| "This is derived from formula " ++ toString this.index
                    else
                        validatorCases formula1 formula2 rest

                _ ->
                    validatorCases formula1 formula2 rest



-- Justification to string


matcherToStr : Justification -> String
matcherToStr matched =
    case matched of
        Axiom str ->
            "Created by substitution to axiom " ++ str

        Justification0 str ->
            "This is a " ++ str

        Justification1 str index ->
            str ++ " from formula " ++ toString index

        Justification2 str index1 index2 ->
            str ++ " from formulas " ++ toString index1 ++ " and " ++ toString index2



-- Helpers


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
