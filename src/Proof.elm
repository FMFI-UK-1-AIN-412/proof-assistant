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
        , validator
        )

import Formula
import List.Extra
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
    , gui = { showButtons = False }
    }


changeFormulaStepText : String -> FormulaStep -> FormulaStep
changeFormulaStepText text formulaStep =
    { formulaStep | text = text, formula = Formula.parse text }


type Explanation
    = Premise
    | Rule (Maybe Justification)
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



-- matcher


flatten : List ( FormulaStep, List FormulaStep ) -> List ( FormulaStep, FormulaStep )
flatten original =
    List.foldl (\( x, xs ) final -> List.map ((,) x) xs ++ final) [] original


type Justification
    = ModusPonens Int Int
    | ModusTolens Int Int
    | HypotheticalSyllogism Int Int
    | Conjuction Int Int
    | DisjunctiveSyllogism Int Int
    | Addition Int
    | Simplification Int


type alias Validator =
    FormulaStep -> List FormulaStep -> Maybe Justification


validator : Validator
validator step branch =
    binaryValidator step branch
        |> MaybeExtra.orElseLazy (\() -> unaryValidator step branch)
        |> MaybeExtra.orElseLazy (\() -> nonaryValidator step branch)



-- nonary


nonaryValidator : Validator
nonaryValidator step branch =
    Nothing



-- unary


unaryValidator : Validator
unaryValidator step branch =
    matchAnyFunctions1
        step
        branch
        [ matcherAdditionWTF
        , matcherSimplificationWTF
        ]


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



-- binary


binaryValidator : Validator
binaryValidator step branch =
    matchAnyFunctions2
        step
        (flatten (List.Extra.select branch))
        [ matcherModusPonensWTF
        , matcherModusTolensWTF
        , matcherHypotheticalSyllogismWTF
        , matcherConjunctionWTF
        , matcherDisjunctiveSyllogismWTF
        ]


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



---


matcherSimplificationWTF : UnaryMatcherHelper
matcherSimplificationWTF from toProve =
    helper1 matcherSimplification from toProve (Simplification from.index)


matcherAdditionWTF : UnaryMatcherHelper
matcherAdditionWTF from toProve =
    helper1 matcherAddition from toProve (Addition from.index)


matcherConjunctionWTF : BinaryMatcherHelper
matcherConjunctionWTF from1 from2 toProve =
    helper2 matcherConjunction from1 from2 toProve (Conjuction from1.index from2.index)


matcherModusPonensWTF : BinaryMatcherHelper
matcherModusPonensWTF from1 from2 toProve =
    helper2 matcherModusPonens from1 from2 toProve (ModusPonens from1.index from2.index)


matcherModusTolensWTF : BinaryMatcherHelper
matcherModusTolensWTF from1 from2 toProve =
    helper2 matcherModusTolens from1 from2 toProve (ModusTolens from1.index from2.index)


matcherHypotheticalSyllogismWTF : BinaryMatcherHelper
matcherHypotheticalSyllogismWTF from1 from2 toProve =
    helper2 matcherHypotheticalSyllogism from1 from2 toProve (HypotheticalSyllogism from1.index from2.index)


matcherDisjunctiveSyllogismWTF : BinaryMatcherHelper
matcherDisjunctiveSyllogismWTF from1 from2 toProve =
    helper2 matcherDisjunctiveSyllogism from1 from2 toProve (DisjunctiveSyllogism from1.index from2.index)


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

        Addition index ->
            "Justification by: Addition from formula " ++ toString index

        Simplification index ->
            "Justification by: Simplification from formula " ++ toString index


getStatus : Explanation -> FormulaStep -> Result String String
getStatus explanation formulaStep =
    if formulaStep.text == "" then
        Err <| "Formula should not be empty"
    else
        case formulaStep.formula of
            Err error ->
                Err <| "Could not parse: " ++ toString error

            Ok _ ->
                case explanation of
                    Premise ->
                        Ok ""

                    Rule maybeJustification ->
                        case maybeJustification of
                            Nothing ->
                                Err "Could not match for any rule"

                            Just matched ->
                                Ok <| matcherToStr matched

                    Contradiction _ ->
                        -- todo
                        Err "This is not implemented yet!"



-- matcher implemenatations


type alias BinaryMatcher =
    Formula.Formula -> Formula.Formula -> Formula.Formula -> Bool


type alias BinaryMatcherHelper =
    FormulaStep -> FormulaStep -> FormulaStep -> Maybe Justification


type alias UnaryMatcher =
    Formula.Formula -> Formula.Formula -> Bool


type alias UnaryMatcherHelper =
    FormulaStep -> FormulaStep -> Maybe Justification


helper1 : UnaryMatcher -> FormulaStep -> FormulaStep -> Justification -> Maybe Justification
helper1 func from toProve answer =
    case ( from.formula, toProve.formula ) of
        ( Ok fromOK, Ok toProveOK ) ->
            if func fromOK toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing


helper2 : BinaryMatcher -> FormulaStep -> FormulaStep -> FormulaStep -> Justification -> Maybe Justification
helper2 func from1 from2 toProve answer =
    case ( from1.formula, from2.formula, toProve.formula ) of
        ( Ok from1OK, Ok from2OK, Ok toProveOK ) ->
            if func from1OK from2OK toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing


matcherAddition : UnaryMatcher
matcherAddition from toProve =
    -- a => (a|b)
    case toProve of
        Formula.Disj a b ->
            (from == a) || (from == b)

        _ ->
            False


matcherSimplification : UnaryMatcher
matcherSimplification from toProve =
    -- (a & b) => (a) | (b)
    case from of
        Formula.Conj a b ->
            (toProve == a) || (toProve == b)

        _ ->
            False


matcherConjunction : BinaryMatcher
matcherConjunction from1 from2 toProve =
    -- (a) & (b) => (a & b)
    case toProve of
        Formula.Conj a b ->
            (from1 == a) && (from2 == b)

        _ ->
            False


matcherModusTolens : BinaryMatcher
matcherModusTolens from1 from2 toProve =
    -- (a -> b) & (-b) => (-a)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Neg b2, Formula.Neg a2 ) ->
            (b1 == b2) && (a1 == a2)

        _ ->
            False


matcherModusPonens : BinaryMatcher
matcherModusPonens from1 from2 toProve =
    -- (a -> b) & (a) => (b)
    case from1 of
        Formula.Impl a b ->
            (a == from2) && (b == toProve)

        _ ->
            False


matcherHypotheticalSyllogism : BinaryMatcher
matcherHypotheticalSyllogism from1 from2 toProve =
    -- (a -> b) & (b -> c) => (a -> c)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Impl b2 c2, Formula.Impl a3 c3 ) ->
            (a1 == a3) && (b1 == b2) && (c2 == c3)

        _ ->
            False


matcherDisjunctiveSyllogism : BinaryMatcher
matcherDisjunctiveSyllogism from1 from2 toProve =
    -- (p|q) & (-p) => q
    case ( from1, from2, toProve ) of
        ( Formula.Disj p1 q1, Formula.Neg p2, q2 ) ->
            (p1 == p2) && (q1 == q2)

        _ ->
            False



-- todo: add Constructive Dilemma - https://www.tutorialspoint.com/discrete_mathematics/rules_of_inference.htm
-- todo: add Destructive Dilemma - https://www.tutorialspoint.com/discrete_mathematics/rules_of_inference.htm
-- todo: add Grimaldy - https://github.com/ZoltanOnody/proof-assistant/pull/3#issuecomment-375382616
