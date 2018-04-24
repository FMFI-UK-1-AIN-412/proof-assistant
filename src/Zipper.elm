module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , changeExplanation
        , create
        , createSubCasesNode
        , createSubFormulaNode
        , delete
        , down
        , downOrNothing
        , editValue
        , enterCase1
        , enterCase2
        , enterSub
        , generateNewFreeVariable
        , getBranchAbove
        , matchAll
        , reindexAll
        , root
        , setButtonsAppearance
        , setCollapsed
        , up
        , validateCases
        )

import Formula
import Proof
import Types exposing (..)
import Validator


type alias Zipper =
    { proof : Proof, breadcrumbs : List Breadcrumb }


type Breadcrumb
    = GoDown Explanation FormulaStep
    | GoCase1 FormulaStep FormulaStep
    | GoCase2 FormulaStep FormulaStep
    | GoContradiction FormulaStep
    | GoGoalProof FormulaStep
    | GoAddUniversal FormulaStep String



-- Moving around


downOrNothing : Zipper -> Maybe Zipper
downOrNothing zipper =
    case zipper.proof of
        FormulaNode exp nextStep ->
            Maybe.map
                (\nextProof ->
                    { zipper
                        | proof = nextProof
                        , breadcrumbs = GoDown exp { nextStep | next = Nothing } :: zipper.breadcrumbs
                    }
                )
                nextStep.next

        CasesNode _ _ ->
            Nothing


down : Zipper -> Zipper
down zipper =
    downOrNothing zipper |> Maybe.withDefault zipper


enterCase1OrNothing : Zipper -> Maybe Zipper
enterCase1OrNothing zipper =
    case zipper.proof of
        CasesNode case1 case2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase1 { case1 | next = Nothing } case2 :: zipper.breadcrumbs
                    }
                )
                case1.next

        FormulaNode _ _ ->
            Nothing


enterCase1 : Zipper -> Zipper
enterCase1 zipper =
    enterCase1OrNothing zipper |> Maybe.withDefault zipper


enterCase2OrNothing : Zipper -> Maybe Zipper
enterCase2OrNothing zipper =
    case zipper.proof of
        CasesNode case1 case2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase2 case1 { case2 | next = Nothing } :: zipper.breadcrumbs
                    }
                )
                case2.next

        FormulaNode _ _ ->
            Nothing


enterCase2 : Zipper -> Zipper
enterCase2 zipper =
    enterCase2OrNothing zipper |> Maybe.withDefault zipper


createSubNodeHelper : Proof -> Zipper -> Zipper
createSubNodeHelper node zipper =
    case zipper.proof of
        CasesNode _ _ ->
            zipper

        FormulaNode expl formStep ->
            case expl of
                Premise ->
                    zipper

                Rule _ ->
                    zipper

                Goal goalNode ->
                    case goalNode of
                        Just _ ->
                            zipper

                        Nothing ->
                            { zipper | proof = FormulaNode (Goal <| Just node) formStep }

                Contradiction conNode ->
                    case conNode of
                        Just _ ->
                            zipper

                        Nothing ->
                            { zipper | proof = FormulaNode (Contradiction <| Just node) formStep }

                AddUniversalQuantifier str proof ->
                    case proof of
                        Just _ ->
                            zipper

                        Nothing ->
                            { zipper | proof = FormulaNode (AddUniversalQuantifier str <| Just node) formStep }


createSubFormulaNode : Zipper -> Zipper
createSubFormulaNode zipper =
    createSubNodeHelper (FormulaNode (Rule Nothing) (Proof.createFormulaStep "")) zipper


createSubCasesNode : Zipper -> Zipper
createSubCasesNode zipper =
    createSubNodeHelper (CasesNode (Proof.createFormulaStep "") (Proof.createFormulaStep "")) zipper


enterSubOrNothing : Zipper -> Maybe Zipper
enterSubOrNothing zipper =
    case zipper.proof of
        CasesNode _ _ ->
            Nothing

        FormulaNode explanation formulaStep ->
            case explanation of
                Premise ->
                    Nothing

                Rule _ ->
                    Nothing

                Goal maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoGoalProof formulaStep
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof

                Contradiction maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoContradiction formulaStep
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof

                AddUniversalQuantifier str maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoAddUniversal formulaStep str
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof


enterSub : Zipper -> Zipper
enterSub zipper =
    enterSubOrNothing zipper |> Maybe.withDefault zipper


upOrNothing : Zipper -> Maybe Zipper
upOrNothing zipper =
    case zipper.breadcrumbs of
        breadcrumb :: rest ->
            case breadcrumb of
                GoDown expl formulaStep ->
                    Just { zipper | proof = FormulaNode expl { formulaStep | next = Just zipper.proof }, breadcrumbs = rest }

                GoCase1 step1 step2 ->
                    Just { zipper | proof = CasesNode { step1 | next = Just zipper.proof } step2, breadcrumbs = rest }

                GoCase2 step1 step2 ->
                    Just { zipper | proof = CasesNode step1 { step2 | next = Just zipper.proof }, breadcrumbs = rest }

                GoContradiction formulaStep ->
                    Just
                        { zipper
                            | proof = FormulaNode (Contradiction <| Just zipper.proof) formulaStep
                            , breadcrumbs = rest
                        }

                GoGoalProof formulaStep ->
                    Just
                        { zipper
                            | proof = FormulaNode (Goal <| Just zipper.proof) formulaStep
                            , breadcrumbs = rest
                        }

                GoAddUniversal formulaStep str ->
                    Just
                        { zipper
                            | proof = FormulaNode (AddUniversalQuantifier str <| Just zipper.proof) formulaStep
                            , breadcrumbs = rest
                        }

        [] ->
            Nothing


up : Zipper -> Zipper
up zipper =
    upOrNothing zipper |> Maybe.withDefault zipper


root : Zipper -> Zipper
root zipper =
    case upOrNothing zipper of
        Just newZipper ->
            root newZipper

        Nothing ->
            zipper



-- Edit Zipper


create : FormulaStep -> Zipper
create formulaStep =
    { proof = FormulaNode (Rule Nothing) formulaStep, breadcrumbs = [] }


changeExplanation : Explanation -> Zipper -> Zipper
changeExplanation explanation zipper =
    { zipper
        | proof =
            case zipper.proof of
                FormulaNode _ formStep ->
                    FormulaNode explanation formStep

                CasesNode _ _ ->
                    zipper.proof
    }


editValue : Proof.Where -> String -> Zipper -> Zipper
editValue whr value zipper =
    { zipper | proof = Proof.applyFunction whr (Proof.changeFormulaStepText value) zipper.proof }


setButtonsAppearance : Proof.Where -> Bool -> Zipper -> Zipper
setButtonsAppearance whr value zipper =
    { zipper | proof = Proof.applyFunction whr (Proof.setShowButtons value) zipper.proof }


setCollapsed : Proof.Where -> Bool -> Zipper -> Zipper
setCollapsed whr value zipper =
    { zipper | proof = Proof.applyFunction whr (Proof.setCollapsed value) zipper.proof }


add : Proof.Where -> FormulaStep -> Zipper -> Zipper
add whr formulaStep zipper =
    { zipper | proof = Proof.addFormulaStep whr formulaStep zipper.proof }
        |> setButtonsAppearance whr False


addCases : Proof.Where -> Zipper -> Zipper
addCases whr zipper =
    { zipper | proof = Proof.addCases whr zipper.proof }
        |> setButtonsAppearance whr False


delete : Zipper -> Zipper
delete zipper =
    case zipper.breadcrumbs of
        [] ->
            case downOrNothing zipper of
                Nothing ->
                    create <| Proof.createFormulaStep ""

                Just child ->
                    { child | breadcrumbs = [] }

        breadcrumb :: rest ->
            let
                newProof =
                    case breadcrumb of
                        GoDown parentExpl parentFormulaStep ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    FormulaNode parentExpl { parentFormulaStep | next = data.next }

                                CasesNode _ _ ->
                                    FormulaNode parentExpl { parentFormulaStep | next = Nothing }

                        GoCase1 case1 case2 ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    CasesNode { case1 | next = data.next } case2

                                CasesNode _ _ ->
                                    CasesNode { case1 | next = Nothing } case2

                        GoCase2 case1 case2 ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    CasesNode case1 { case2 | next = data.next }

                                CasesNode _ _ ->
                                    CasesNode case1 { case2 | next = Nothing }

                        GoContradiction parentFormulaStep ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    FormulaNode (Contradiction data.next) parentFormulaStep

                                CasesNode _ _ ->
                                    FormulaNode (Contradiction Nothing) parentFormulaStep

                        GoGoalProof parentFormulaStep ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    FormulaNode (Goal data.next) parentFormulaStep

                                CasesNode _ _ ->
                                    FormulaNode (Goal Nothing) parentFormulaStep

                        GoAddUniversal parentFormulaStep str ->
                            case zipper.proof of
                                FormulaNode _ data ->
                                    FormulaNode (AddUniversalQuantifier str data.next) parentFormulaStep

                                CasesNode _ _ ->
                                    FormulaNode (AddUniversalQuantifier str Nothing) parentFormulaStep
            in
            { proof = newProof, breadcrumbs = rest }



-- Helpers


applyAll : (Zipper -> Zipper) -> Zipper -> Zipper
applyAll function zipper =
    let
        -- WARNING: Close your eyes, otherwise you'll have an heart attack!!!
        newZipper1 =
            function zipper

        newZipper2 =
            case enterSubOrNothing newZipper1 of
                Nothing ->
                    newZipper1

                Just childrenZipper ->
                    up (applyAll function childrenZipper)

        newZipper3 =
            case downOrNothing newZipper2 of
                Nothing ->
                    newZipper2

                Just childrenZipper ->
                    up (applyAll function childrenZipper)

        newZipper4 =
            case enterCase1OrNothing newZipper3 of
                Nothing ->
                    newZipper3

                Just childrenZipper ->
                    up (applyAll function childrenZipper)

        newZipper5 =
            case enterCase2OrNothing newZipper4 of
                Nothing ->
                    newZipper4

                Just childrenZipper ->
                    up (applyAll function childrenZipper)
    in
    -- See, I warned you.
    newZipper5


reindexAll : Zipper -> Zipper
reindexAll zipper =
    applyAll reindex zipper


getMaxValue : Int -> Maybe Zipper -> Int
getMaxValue default maybeZipper =
    case maybeZipper of
        Nothing ->
            default

        Just zipper ->
            let
                val1 =
                    max default
                        (case zipper.proof of
                            FormulaNode _ data ->
                                data.index

                            CasesNode case1 case2 ->
                                max case1.index case2.index
                        )

                val2 =
                    zipper |> downOrNothing |> getMaxValue val1

                val3 =
                    zipper |> enterCase1OrNothing |> getMaxValue val2

                val4 =
                    zipper |> enterCase2OrNothing |> getMaxValue val3

                val5 =
                    zipper |> enterSubOrNothing |> getMaxValue val4
            in
            val5


reindex : Zipper -> Zipper
reindex zipper =
    case List.head zipper.breadcrumbs of
        Nothing ->
            case zipper.proof of
                FormulaNode expl data ->
                    { zipper | proof = FormulaNode expl { data | index = 1 } }

                CasesNode case1 case2 ->
                    { zipper | proof = CasesNode { case1 | index = 1 } { case2 | index = 2 } }

        Just breadcrumb ->
            let
                getNewZipper newIndex1 =
                    case zipper.proof of
                        FormulaNode expl formStep ->
                            { zipper | proof = FormulaNode expl { formStep | index = newIndex1 } }

                        CasesNode case1 case2 ->
                            let
                                newIndex2 =
                                    (zipper |> enterCase1OrNothing |> getMaxValue newIndex1) + 1
                            in
                            { zipper | proof = CasesNode { case1 | index = newIndex1 } { case2 | index = newIndex2 } }
            in
            case breadcrumb of
                GoContradiction data ->
                    getNewZipper <| data.index + 1

                GoGoalProof data ->
                    getNewZipper <| data.index + 1

                GoAddUniversal data _ ->
                    getNewZipper <| data.index + 1

                GoDown _ data ->
                    getNewZipper <| (zipper |> up |> enterSubOrNothing |> getMaxValue data.index) + 1

                GoCase1 data _ ->
                    getNewZipper <| data.index + 1

                GoCase2 _ data ->
                    getNewZipper <| (zipper |> up |> enterCase1OrNothing |> getMaxValue data.index) + 1


matchAll : Zipper -> Zipper
matchAll zipper =
    applyAll match zipper


match : Zipper -> Zipper
match zipper =
    case zipper.proof of
        FormulaNode expl formulaStep ->
            let
                maybeMatched =
                    Validator.validator formulaStep (getBranchAbove zipper)

                newExpl =
                    case expl of
                        Rule _ ->
                            Rule maybeMatched

                        Premise ->
                            expl

                        Contradiction _ ->
                            expl

                        Goal _ ->
                            expl

                        AddUniversalQuantifier _ _ ->
                            expl

                newProof =
                    FormulaNode newExpl formulaStep
            in
            { zipper | proof = newProof }

        CasesNode _ _ ->
            zipper


validateCases : FormulaStep -> FormulaStep -> Zipper -> Result String String
validateCases case1 case2 zipper =
    case ( case1.formula, case2.formula ) of
        ( Ok formula1, Ok formula2 ) ->
            Validator.validatorCases formula1 formula2 (getBranchAbove zipper)

        _ ->
            Err "Invalid cases! This is not valid from any formula above"


getBranchAbove : Zipper -> List FormulaStep
getBranchAbove zipper =
    case List.head zipper.breadcrumbs of
        Nothing ->
            []

        Just breadcrumb ->
            let
                this =
                    case breadcrumb of
                        GoDown expl data ->
                            [ data ]

                        GoCase1 data _ ->
                            [ data ]

                        GoCase2 _ data ->
                            [ data ]

                        GoContradiction data ->
                            [ Proof.changeFormulaStepText ("-" ++ data.text) data ]

                        GoGoalProof data ->
                            []

                        GoAddUniversal data _ ->
                            []
            in
            this ++ (zipper |> up |> getBranchAbove)


generateNewFreeVariable : Zipper -> String
generateNewFreeVariable zipper =
    let
        freeVars =
            Validator.getFreeVariables (getBranchAbove zipper)
    in
    Validator.generateNewFreeVariable freeVars
