module Proof
    exposing
        ( Explanation(..)
        , FormulaStep
        , GUI
        , Matched(..)
        , Proof(..)
        , addCases
        , addFormulaStep
        , changeFormulaStepText
        , createFormulaStep
        , getStatus
        , matcher
        , setShowButtons
        )

import Formula
import List.Extra
import Parser exposing (Parser)


type alias GUI =
    { showButtons : Bool
    }


type alias FormulaStep =
    { text : String
    , formula : Result Parser.Error Formula.Formula
    , next : Maybe Proof
    , matched : Maybe Matched
    , gui : GUI
    }


createFormulaStep : String -> FormulaStep
createFormulaStep text =
    { text = text
    , formula = Formula.parse text
    , next = Nothing
    , matched = Nothing
    , gui = { showButtons = False }
    }


changeFormulaStepText : String -> FormulaStep -> FormulaStep
changeFormulaStepText text formulaStep =
    { formulaStep | text = text, formula = Formula.parse text }


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



-- matcher


type Matched
    = ModusPonens Int Int
    | Transitivity Int Int


flatten2 : FormulaStep -> List FormulaStep -> List ( FormulaStep, FormulaStep )
flatten2 element list =
    case list of
        first :: rest ->
            ( element, first ) :: flatten2 element rest

        [] ->
            []


flatten : List ( FormulaStep, List FormulaStep ) -> List ( FormulaStep, FormulaStep )
flatten original =
    case original of
        first :: rest ->
            uncurry flatten2 first ++ flatten rest

        [] ->
            []


matchFirst :
    FormulaStep
    -> List ( FormulaStep, FormulaStep )
    -> (FormulaStep -> FormulaStep -> FormulaStep -> Maybe Matched)
    -> Maybe Matched
matchFirst toProve fromList function =
    case fromList of
        [] ->
            Nothing

        this :: rest ->
            case function (Tuple.first this) (Tuple.second this) toProve of
                Nothing ->
                    matchFirst toProve rest function

                Just x ->
                    Just x


matchManyFunctions toProve allCombinations functions =
    case functions of
        [] ->
            Nothing

        function :: rest ->
            case matchFirst toProve allCombinations function of
                Just x ->
                    Just x

                Nothing ->
                    matchManyFunctions toProve allCombinations rest


matcher : FormulaStep -> List FormulaStep -> Maybe Matched
matcher toProve from =
    let
        allCombinations =
            flatten (List.Extra.select from)
    in
    matchManyFunctions
        toProve
        allCombinations
        [ matcherModusPonens
        , matcherTransitivity
        ]


matcherToStr : Matched -> String
matcherToStr matched =
    case matched of
        ModusPonens index1 index2 ->
            "Matched by: Modus Ponens from formulas " ++ toString index1 ++ " and " ++ toString index2

        Transitivity index1 index2 ->
            "Matched by: Transitivity from formulas " ++ toString index1 ++ " and " ++ toString index2


getStatus : Explanation -> FormulaStep -> Result String String
getStatus explanation formulaStep =
    -- todo: yoyo: potrebujem tu mat aj Explanation vsak?
    case formulaStep.formula of
        Err error ->
            Err <| "Could not parse: " ++ toString error

        Ok _ ->
            case explanation of
                Premise ->
                    Ok ""

                Rule ->
                    case formulaStep.matched of
                        Nothing ->
                            Err "Could not match for any rule"

                        Just matched ->
                            Ok <| matcherToStr matched

                Contradiction _ ->
                    -- todo
                    Err "This is not implemented yet!"



-- matcher implemenatations


helper :
    (Formula.Formula -> Formula.Formula -> Formula.Formula -> Maybe Matched)
    -> FormulaStep
    -> FormulaStep
    -> FormulaStep
    -> Maybe Matched
helper func from1 from2 toProve =
    case from1.formula of
        Err _ ->
            Nothing

        Ok from1OK ->
            case from2.formula of
                Err _ ->
                    Nothing

                Ok from2OK ->
                    case toProve.formula of
                        Err _ ->
                            Nothing

                        Ok toProveOK ->
                            func from1OK from2OK toProveOK


matcherModusPonensOK : Formula.Formula -> Formula.Formula -> Formula.Formula -> Maybe Matched
matcherModusPonensOK from1 from2 toProve =
    -- (a -> b) & (a) => (b)
    case from1 of
        Formula.Impl a b ->
            if (a == from2) && (b == toProve) then
                Just <| ModusPonens 1 2
            else
                Nothing

        _ ->
            Nothing


matcherModusPonens : FormulaStep -> FormulaStep -> FormulaStep -> Maybe Matched
matcherModusPonens from1 from2 toProve =
    helper matcherModusPonensOK from1 from2 toProve


matcherTransitivityOK : Formula.Formula -> Formula.Formula -> Formula.Formula -> Maybe Matched
matcherTransitivityOK from1 from2 toProve =
    -- (a -> b) & (b -> c) => (a -> c)
    case from1 of
        Formula.Impl a1 b1 ->
            case from2 of
                Formula.Impl b2 c2 ->
                    case toProve of
                        Formula.Impl a3 c3 ->
                            if (a1 == a3) && (b1 == b2) && (c2 == c3) then
                                Just <| Transitivity 1 2
                            else
                                Nothing

                        _ ->
                            Nothing

                _ ->
                    Nothing

        _ ->
            Nothing


matcherTransitivity : FormulaStep -> FormulaStep -> FormulaStep -> Maybe Matched
matcherTransitivity from1 from2 toProve =
    helper matcherTransitivityOK from1 from2 toProve
