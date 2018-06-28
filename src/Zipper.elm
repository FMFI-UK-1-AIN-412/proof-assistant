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
        , editGeneralizationText
        , editValue
        , enterCase1
        , enterCase2
        , enterSub
        , generateNewFreeVariable
        , getBranchAbove
        , isEverythingProven
        , matchAll
        , reindexAll
        , root
        , setButtonsAppearance
        , setCollapsed
        , up
        , validateCases
        , validateNewFreeVariable
        )

import Formula
import Core.Proof as Proof
import Core.Types as Types exposing (..)
import Core.Validator as Validator


type alias Zipper =
    { proof : Proof, breadcrumbs : List Breadcrumb }


type Breadcrumb
    = GoDown Explanation FormulaStep
    | GoCase1 FormulaStep FormulaStep (Maybe Proof)
    | GoCase2 FormulaStep (Maybe Proof) FormulaStep
    | GoContradiction FormulaStep (Maybe Proof)
    | GoGoalProof FormulaStep (Maybe Proof)
    | GoAddUniversal FormulaStep String (Maybe Proof)



-- Moving around


downOrNothing : Zipper -> Maybe Zipper
downOrNothing zipper =
    case zipper.proof of
        FormulaNode exp nextStep next ->
            Maybe.map
                (\nextProof ->
                    { zipper
                        | proof = nextProof
                        , breadcrumbs = GoDown exp nextStep :: zipper.breadcrumbs
                    }
                )
                next

        CasesNode _ _ _ _ ->
            Nothing


down : Zipper -> Zipper
down zipper =
    downOrNothing zipper |> Maybe.withDefault zipper


enterCase1OrNothing : Zipper -> Maybe Zipper
enterCase1OrNothing zipper =
    case zipper.proof of
        CasesNode case1 next1 case2 next2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase1 case1 case2 next2 :: zipper.breadcrumbs
                    }
                )
                next1

        FormulaNode _ _ _ ->
            Nothing


enterCase1 : Zipper -> Zipper
enterCase1 zipper =
    enterCase1OrNothing zipper |> Maybe.withDefault zipper


enterCase2OrNothing : Zipper -> Maybe Zipper
enterCase2OrNothing zipper =
    case zipper.proof of
        CasesNode case1 next1 case2 next2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase2 case1 next1 case2 :: zipper.breadcrumbs
                    }
                )
                next2

        FormulaNode _ _ _ ->
            Nothing


enterCase2 : Zipper -> Zipper
enterCase2 zipper =
    enterCase2OrNothing zipper |> Maybe.withDefault zipper


createSubNodeHelper : Proof -> Zipper -> Zipper
createSubNodeHelper node zipper =
    case zipper.proof of
        CasesNode _ _ _ _ ->
            zipper

        FormulaNode expl formStep next ->
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
                            { zipper | proof = FormulaNode (Goal <| Just node) formStep next }

                Contradiction conNode ->
                    case conNode of
                        Just _ ->
                            zipper

                        Nothing ->
                            { zipper | proof = FormulaNode (Contradiction <| Just node) formStep next }

                Generalization str proof ->
                    case proof of
                        Just _ ->
                            zipper

                        Nothing ->
                            { zipper | proof = FormulaNode (Generalization str <| Just node) formStep next }


createSubFormulaNode : Zipper -> Zipper
createSubFormulaNode zipper =
    createSubNodeHelper (FormulaNode (Rule Nothing) (Proof.createFormulaStep "") Nothing) zipper


createSubCasesNode : Zipper -> Zipper
createSubCasesNode zipper =
    createSubNodeHelper (CasesNode (Proof.createFormulaStep "") Nothing (Proof.createFormulaStep "") Nothing) zipper


enterSubOrNothing : Zipper -> Maybe Zipper
enterSubOrNothing zipper =
    case zipper.proof of
        CasesNode _ _ _ _ ->
            Nothing

        FormulaNode explanation formulaStep next ->
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
                                    GoGoalProof formulaStep next
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof

                Contradiction maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoContradiction formulaStep next
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof

                Generalization str maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoAddUniversal formulaStep str next
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
                    Just { zipper | proof = FormulaNode expl formulaStep (Just zipper.proof), breadcrumbs = rest }

                GoCase1 step1 step2 next2 ->
                    Just { zipper | proof = CasesNode step1 (Just zipper.proof) step2 next2, breadcrumbs = rest }

                GoCase2 step1 next1 step2 ->
                    Just { zipper | proof = CasesNode step1 next1 step2 (Just zipper.proof), breadcrumbs = rest }

                GoContradiction formulaStep next ->
                    Just
                        { zipper
                            | proof = FormulaNode (Contradiction <| Just zipper.proof) formulaStep next
                            , breadcrumbs = rest
                        }

                GoGoalProof formulaStep next ->
                    Just
                        { zipper
                            | proof = FormulaNode (Goal <| Just zipper.proof) formulaStep next
                            , breadcrumbs = rest
                        }

                GoAddUniversal formulaStep str next ->
                    Just
                        { zipper
                            | proof = FormulaNode (Generalization str <| Just zipper.proof) formulaStep next
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
    { proof = FormulaNode (Rule Nothing) formulaStep Nothing, breadcrumbs = [] }


changeExplanation : Explanation -> Zipper -> Zipper
changeExplanation explanation zipper =
    { zipper
        | proof =
            case zipper.proof of
                FormulaNode _ formStep next ->
                    FormulaNode explanation formStep next

                CasesNode _ _ _ _ ->
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
                                FormulaNode _ data next ->
                                    FormulaNode parentExpl parentFormulaStep next

                                CasesNode _ _ _ _ ->
                                    FormulaNode parentExpl parentFormulaStep Nothing

                        GoCase1 case1 case2 next2 ->
                            case zipper.proof of
                                FormulaNode _ data next ->
                                    CasesNode case1 next case2 next2

                                CasesNode _ _ _ _ ->
                                    CasesNode case1 Nothing case2 next2

                        GoCase2 case1 next1 case2 ->
                            case zipper.proof of
                                FormulaNode _ data next ->
                                    CasesNode case1 next1 case2 next

                                CasesNode _ _ _ _ ->
                                    CasesNode case1 next1 case2 Nothing

                        GoContradiction parentFormulaStep next ->
                            case zipper.proof of
                                FormulaNode _ data nextInn ->
                                    FormulaNode (Contradiction nextInn) parentFormulaStep next

                                CasesNode _ _ _ _ ->
                                    FormulaNode (Contradiction Nothing) parentFormulaStep next

                        GoGoalProof parentFormulaStep next ->
                            case zipper.proof of
                                FormulaNode _ data nextInn ->
                                    FormulaNode (Goal nextInn) parentFormulaStep next

                                CasesNode _ _ _ _ ->
                                    FormulaNode (Goal Nothing) parentFormulaStep next

                        GoAddUniversal parentFormulaStep str next ->
                            case zipper.proof of
                                FormulaNode _ data nextInn ->
                                    FormulaNode (Generalization str nextInn) parentFormulaStep next

                                CasesNode _ _ _ _ ->
                                    FormulaNode (Generalization str Nothing) parentFormulaStep next
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
                            FormulaNode _ data _ ->
                                data.index

                            CasesNode case1 _ case2 _ ->
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
                FormulaNode expl data next ->
                    { zipper | proof = FormulaNode expl { data | index = 1 } next }

                CasesNode case1 next1 case2 next2 ->
                    { zipper | proof = CasesNode { case1 | index = 1 } next1 { case2 | index = 2 } next2 }

        Just breadcrumb ->
            let
                getNewZipper newIndex1 =
                    case zipper.proof of
                        FormulaNode expl formStep next ->
                            { zipper | proof = FormulaNode expl { formStep | index = newIndex1 } next }

                        CasesNode case1 next1 case2 next2 ->
                            let
                                newIndex2 =
                                    (zipper |> enterCase1OrNothing |> getMaxValue newIndex1) + 1
                            in
                            { zipper | proof = CasesNode { case1 | index = newIndex1 } next1 { case2 | index = newIndex2 } next2 }
            in
            case breadcrumb of
                GoContradiction data _ ->
                    getNewZipper <| data.index + 1

                GoGoalProof data _ ->
                    getNewZipper <| data.index + 1

                GoAddUniversal data _ _ ->
                    getNewZipper <| data.index + 1

                GoDown _ data ->
                    getNewZipper <| (zipper |> up |> enterSubOrNothing |> getMaxValue data.index) + 1

                GoCase1 data _ _ ->
                    getNewZipper <| data.index + 1

                GoCase2 _ _ data ->
                    getNewZipper <| (zipper |> up |> enterCase1OrNothing |> getMaxValue data.index) + 1


matchAll : Zipper -> Zipper
matchAll zipper =
    applyAll match zipper


match : Zipper -> Zipper
match zipper =
    case zipper.proof of
        FormulaNode expl formulaStep next ->
            let
                maybeMatched =
                    Validator.validator formulaStep (getBranchAbove zipper.breadcrumbs)

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

                        Generalization _ _ ->
                            expl

                newProof =
                    FormulaNode newExpl formulaStep next
            in
            { zipper | proof = newProof }

        CasesNode _ _ _ _ ->
            zipper


validateCases : FormulaStep -> FormulaStep -> Zipper -> Result String String
validateCases case1 case2 zipper =
    case ( case1.formula, case2.formula ) of
        ( Ok formula1, Ok formula2 ) ->
            Validator.validatorCases formula1 formula2 (getBranchAbove zipper.breadcrumbs)

        _ ->
            Err "Invalid cases! Could not parse at least one formula."


getBranchAbove : List Breadcrumb -> List FormulaStep
getBranchAbove breadcrumbs =
    let
        function breadcrumb =
            case breadcrumb of
                GoDown _ data ->
                    Just data

                GoCase1 data _ _ ->
                    Just data

                GoCase2 _ _ data ->
                    Just data

                GoContradiction data _ ->
                    Just <| Proof.changeFormulaStepText ("-" ++ data.text) data

                GoGoalProof data _ ->
                    Proof.getImplicationAntecedent data

                GoAddUniversal _ _ _ ->
                    Nothing
    in
    List.filterMap identity <| List.map function breadcrumbs


validateNewFreeVariable : String -> Zipper -> Result String String
validateNewFreeVariable var zipper =
    if var == "" then
        Err "Variable cannot be empty"
    else if List.member var <| getFreeVariables zipper then
        Err "This is not a free variable"
    else
        Ok ""


getGeneratedVariablesAbove zipper =
    case List.head zipper.breadcrumbs of
        Nothing ->
            []

        Just breadcrumb ->
            case breadcrumb of
                GoDown (Generalization str _) data ->
                    str :: (zipper |> up |> getGeneratedVariablesAbove)

                _ ->
                    zipper |> up |> getGeneratedVariablesAbove


getFreeVariables : Zipper -> List String
getFreeVariables zipper =
    let
        branchAbove =
            getBranchAbove zipper.breadcrumbs

        branchBellow =
            List.foldl (++) [] (Proof.getAllBranches zipper.proof)

        generatedAbove =
            getGeneratedVariablesAbove zipper
    in
    Validator.getFreeVariables (branchAbove ++ branchBellow)
        ++ generatedAbove


generateNewFreeVariable : Zipper -> String
generateNewFreeVariable zipper =
    Validator.generateNewFreeVariable <| getFreeVariables zipper


isEverythingProven : Zipper -> Bool
isEverythingProven zipper =
    let
        this =
            case zipper.proof of
                Types.FormulaNode expl data _ ->
                    case Proof.getStatus expl data (getBranchAbove zipper.breadcrumbs) of
                        Ok _ ->
                            case expl of
                                Generalization variable _ ->
                                    case validateNewFreeVariable variable zipper of
                                        Ok _ ->
                                            True

                                        Err _ ->
                                            False

                                _ ->
                                    True

                        Err _ ->
                            False

                Types.CasesNode case1 _ case2 _ ->
                    case validateCases case1 case2 zipper of
                        Ok _ ->
                            True

                        Err _ ->
                            False

        chck func =
            case func zipper of
                Nothing ->
                    True

                Just childrenZipper ->
                    isEverythingProven childrenZipper

        children =
            List.map chck [ enterSubOrNothing, downOrNothing, enterCase1OrNothing, enterCase2OrNothing ]
    in
    -- See, I warned you.
    List.all identity (this :: children)


editGeneralizationText : String -> Zipper -> Zipper
editGeneralizationText str zipper =
    case zipper.proof of
        Types.FormulaNode (Types.Generalization _ subproof) data maybeNextProof ->
            { zipper | proof = Types.FormulaNode (Types.Generalization str subproof) data maybeNextProof }

        _ ->
            zipper
