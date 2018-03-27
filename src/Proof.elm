module Proof
    exposing
        ( Explanation(..)
        , FormulaStep
        , GUI
        , Justification(..)
        , Proof(..)
        , addCases
        , addFormulaStep
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


addFormulaStep : FormulaStep -> Proof -> Proof
addFormulaStep formulaStep proof =
    case proof of
        FormulaNode expl oldFormulaStep ->
            case oldFormulaStep.next of
                Nothing ->
                    FormulaNode expl { oldFormulaStep | next = Just <| FormulaNode (Rule Nothing) formulaStep }

                Just nextStep ->
                    let
                        newNext =
                            FormulaNode (Rule Nothing) { formulaStep | next = Just nextStep }
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



-- matcher


flatten : List ( FormulaStep, List FormulaStep ) -> List ( FormulaStep, FormulaStep )
flatten original =
    List.foldl (\( x, xs ) final -> List.map ((,) x) xs ++ final) [] original


type Justification
    = ModusPonens Int Int
    | Transitivity Int Int


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
    Nothing



-- binary


binaryValidator : Validator
binaryValidator step branch =
    matchAnyFunctions
        step
        (flatten (List.Extra.select branch))
        [ matcherModusPonensWTF
        , matcherTransitivityWTF
        ]


matchFirst : FormulaStep -> List ( FormulaStep, FormulaStep ) -> BinaryMatcherHelper -> Maybe Justification
matchFirst step branch function =
    case branch of
        [] ->
            Nothing

        this :: rest ->
            case function (Tuple.first this) (Tuple.second this) step of
                Nothing ->
                    matchFirst step rest function

                Just x ->
                    Just x


matchAnyFunctions : FormulaStep -> List ( FormulaStep, FormulaStep ) -> List BinaryMatcherHelper -> Maybe Justification
matchAnyFunctions toProve allCombinations functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst toProve allCombinations function of
                Just x ->
                    Just x

                Nothing ->
                    matchAnyFunctions toProve allCombinations rest



---


matcherModusPonensWTF : BinaryMatcherHelper
matcherModusPonensWTF from1 from2 toProve =
    helper matcherModusPonens from1 from2 toProve (ModusPonens from1.index from2.index)


matcherTransitivityWTF : BinaryMatcherHelper
matcherTransitivityWTF from1 from2 toProve =
    helper matcherTransitivity from1 from2 toProve (Transitivity from1.index from2.index)


matcherToStr : Justification -> String
matcherToStr matched =
    case matched of
        ModusPonens index1 index2 ->
            "Justification by: Modus Ponens from formulas " ++ toString index1 ++ " and " ++ toString index2

        Transitivity index1 index2 ->
            "Justification by: Transitivity from formulas " ++ toString index1 ++ " and " ++ toString index2


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


helper : BinaryMatcher -> FormulaStep -> FormulaStep -> FormulaStep -> Justification -> Maybe Justification
helper func from1 from2 toProve answer =
    case ( from1.formula, from2.formula, toProve.formula ) of
        ( Ok from1OK, Ok from2OK, Ok toProveOK ) ->
            if func from1OK from2OK toProveOK then
                Just answer
            else
                Nothing

        _ ->
            Nothing


matcherModusPonens : BinaryMatcher
matcherModusPonens from1 from2 toProve =
    -- (a -> b) & (a) => (b)
    case from1 of
        Formula.Impl a b ->
            (a == from2) && (b == toProve)

        _ ->
            False


matcherTransitivity : BinaryMatcher
matcherTransitivity from1 from2 toProve =
    -- (a -> b) & (b -> c) => (a -> c)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Impl b2 c2, Formula.Impl a3 c3 ) ->
            (a1 == a3) && (b1 == b2) && (c2 == c3)

        _ ->
            False
