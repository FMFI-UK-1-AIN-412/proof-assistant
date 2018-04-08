module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , addCasesToCase1
        , addCasesToCase2
        , addStepToCase1
        , addStepToCase2
        , changeExplanation
        , create
        , createContradictionFirstNode
        , delete
        , down
        , downOrNothing
        , editValue
        , editValueCase1
        , editValueCase2
        , enterCase1
        , enterCase2
        , enterContradiction
        , matchAll
        , reindexAll
        , root
        , setButtonsAppearance
        , up
        )

import Formula
import Proof


type Breadcrumb
    = GoDown Proof.Explanation Proof.FormulaStep
    | GoCase1 Proof.FormulaStep Proof.FormulaStep
    | GoCase2 Proof.FormulaStep Proof.FormulaStep
    | GoContradiction Proof.FormulaStep


type alias Zipper =
    { proof : Proof.Proof, breadcrumbs : List Breadcrumb }


create : Proof.FormulaStep -> Zipper
create formulaStep =
    { proof = Proof.FormulaNode (Proof.Rule Nothing) formulaStep, breadcrumbs = [] }


changeExplanation : Proof.Explanation -> Zipper -> Zipper
changeExplanation explanation zipper =
    { zipper
        | proof =
            case zipper.proof of
                Proof.FormulaNode _ formStep ->
                    Proof.FormulaNode explanation formStep

                Proof.CasesNode _ _ ->
                    zipper.proof
    }


setButtonsAppearance : Bool -> Zipper -> Zipper
setButtonsAppearance value zipper =
    let
        newProof =
            case zipper.proof of
                Proof.CasesNode _ _ ->
                    zipper.proof

                Proof.FormulaNode expl formulaStep ->
                    Proof.FormulaNode expl (Proof.setShowButtons value formulaStep)
    in
    { zipper | proof = newProof }


add : Proof.FormulaStep -> Zipper -> Zipper
add formulaStep zipper =
    { zipper | proof = Proof.addFormulaStep formulaStep zipper.proof }


addStepToCase1 : Proof.FormulaStep -> Zipper -> Zipper
addStepToCase1 formulaStep zipper =
    { zipper | proof = Proof.addFormulaStepCase1 formulaStep zipper.proof }


addStepToCase2 : Proof.FormulaStep -> Zipper -> Zipper
addStepToCase2 formulaStep zipper =
    { zipper | proof = Proof.addFormulaStepCase2 formulaStep zipper.proof }


addCases : Zipper -> Zipper
addCases zipper =
    { zipper | proof = Proof.addCases zipper.proof |> Maybe.withDefault zipper.proof }


addCasesToCase1 : Zipper -> Zipper
addCasesToCase1 zipper =
    { zipper | proof = Proof.addCasesToCase1 zipper.proof |> Maybe.withDefault zipper.proof }


addCasesToCase2 : Zipper -> Zipper
addCasesToCase2 zipper =
    { zipper | proof = Proof.addCasesToCase2 zipper.proof |> Maybe.withDefault zipper.proof }


downOrNothing : Zipper -> Maybe Zipper
downOrNothing zipper =
    case zipper.proof of
        Proof.FormulaNode exp nextStep ->
            Maybe.map
                (\nextProof ->
                    { zipper
                        | proof = nextProof
                        , breadcrumbs = GoDown exp { nextStep | next = Nothing } :: zipper.breadcrumbs
                    }
                )
                nextStep.next

        Proof.CasesNode _ _ ->
            Nothing


down : Zipper -> Zipper
down zipper =
    downOrNothing zipper |> Maybe.withDefault zipper


enterCase1OrNothing : Zipper -> Maybe Zipper
enterCase1OrNothing zipper =
    case zipper.proof of
        Proof.CasesNode case1 case2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase1 { case1 | next = Nothing } case2 :: zipper.breadcrumbs
                    }
                )
                case1.next

        Proof.FormulaNode _ _ ->
            Nothing


enterCase1 : Zipper -> Zipper
enterCase1 zipper =
    enterCase1OrNothing zipper |> Maybe.withDefault zipper


enterCase2OrNothing : Zipper -> Maybe Zipper
enterCase2OrNothing zipper =
    case zipper.proof of
        Proof.CasesNode case1 case2 ->
            Maybe.map
                (\newProof ->
                    { zipper
                        | proof = newProof
                        , breadcrumbs = GoCase2 case1 { case2 | next = Nothing } :: zipper.breadcrumbs
                    }
                )
                case2.next

        Proof.FormulaNode _ _ ->
            Nothing


enterCase2 : Zipper -> Zipper
enterCase2 zipper =
    enterCase2OrNothing zipper |> Maybe.withDefault zipper


createContradictionFirstNode : Zipper -> Zipper
createContradictionFirstNode zipper =
    case zipper.proof of
        Proof.CasesNode _ _ ->
            zipper

        Proof.FormulaNode expl formStep ->
            case expl of
                Proof.Premise ->
                    zipper

                Proof.Rule _ ->
                    zipper

                Proof.Contradiction conNode ->
                    case conNode of
                        Just _ ->
                            zipper

                        Nothing ->
                            let
                                wtf =
                                    Proof.FormulaNode (Proof.Rule Nothing) (Proof.createFormulaStep "")

                                newProof =
                                    Proof.FormulaNode (Proof.Contradiction <| Just wtf) formStep
                            in
                            { zipper | proof = newProof }


enterContradictionOrNothing : Zipper -> Maybe Zipper
enterContradictionOrNothing zipper =
    case zipper.proof of
        Proof.CasesNode _ _ ->
            Nothing

        Proof.FormulaNode explanation formulaStep ->
            case explanation of
                Proof.Premise ->
                    Nothing

                Proof.Rule _ ->
                    Nothing

                Proof.Contradiction maybeProof ->
                    Maybe.map
                        (\nextProof ->
                            let
                                breadcrumb =
                                    GoContradiction formulaStep
                            in
                            { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }
                        )
                        maybeProof


enterContradiction : Zipper -> Zipper
enterContradiction zipper =
    enterContradictionOrNothing zipper |> Maybe.withDefault zipper


upOrNothing : Zipper -> Maybe Zipper
upOrNothing zipper =
    case zipper.breadcrumbs of
        breadcrumb :: rest ->
            case breadcrumb of
                GoDown expl formulaStep ->
                    let
                        newFormulaStep =
                            { formulaStep | next = Just zipper.proof }

                        newProof =
                            Proof.FormulaNode expl newFormulaStep
                    in
                    Just { zipper | proof = newProof, breadcrumbs = rest }

                GoCase1 step1 step2 ->
                    Just { zipper | proof = Proof.CasesNode { step1 | next = Just zipper.proof } step2, breadcrumbs = rest }

                GoCase2 step1 step2 ->
                    Just { zipper | proof = Proof.CasesNode step1 { step2 | next = Just zipper.proof }, breadcrumbs = rest }

                GoContradiction formulaStep ->
                    Just
                        { zipper
                            | proof = Proof.FormulaNode (Proof.Contradiction <| Just zipper.proof) formulaStep
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
            case breadcrumb of
                GoDown parentExpl parentFormulaStep ->
                    case zipper.proof of
                        Proof.FormulaNode _ data ->
                            { proof = Proof.FormulaNode parentExpl { parentFormulaStep | next = data.next }
                            , breadcrumbs = rest
                            }

                        Proof.CasesNode _ _ ->
                            { proof = Proof.FormulaNode parentExpl { parentFormulaStep | next = Nothing }
                            , breadcrumbs = rest
                            }

                GoCase1 case1 case2 ->
                    case zipper.proof of
                        Proof.FormulaNode _ data ->
                            { proof = Proof.CasesNode { case1 | next = data.next } case2
                            , breadcrumbs = rest
                            }

                        Proof.CasesNode _ _ ->
                            { proof = Proof.CasesNode { case1 | next = Nothing } case2
                            , breadcrumbs = rest
                            }

                GoCase2 case1 case2 ->
                    case zipper.proof of
                        Proof.FormulaNode _ data ->
                            { proof = Proof.CasesNode case1 { case2 | next = data.next }
                            , breadcrumbs = rest
                            }

                        Proof.CasesNode _ _ ->
                            { proof = Proof.CasesNode case1 { case2 | next = Nothing }
                            , breadcrumbs = rest
                            }

                GoContradiction parentFormulaStep ->
                    case zipper.proof of
                        Proof.FormulaNode _ data ->
                            { proof = Proof.FormulaNode (Proof.Contradiction data.next) parentFormulaStep
                            , breadcrumbs = rest
                            }

                        Proof.CasesNode _ _ ->
                            { proof = Proof.FormulaNode (Proof.Contradiction Nothing) parentFormulaStep
                            , breadcrumbs = rest
                            }


editValue : String -> Zipper -> Zipper
editValue value zipper =
    let
        newProof =
            case zipper.proof of
                Proof.CasesNode _ _ ->
                    zipper.proof

                Proof.FormulaNode expl formulaStep ->
                    Proof.FormulaNode expl <| Proof.changeFormulaStepText value formulaStep
    in
    { zipper | proof = newProof }


editValueCase1 : String -> Zipper -> Zipper
editValueCase1 value zipper =
    let
        newProof =
            case zipper.proof of
                Proof.CasesNode case1 case2 ->
                    Proof.CasesNode (Proof.changeFormulaStepText value case1) case2

                Proof.FormulaNode _ _ ->
                    zipper.proof
    in
    { zipper | proof = newProof }


editValueCase2 : String -> Zipper -> Zipper
editValueCase2 value zipper =
    let
        newProof =
            case zipper.proof of
                Proof.CasesNode case1 case2 ->
                    Proof.CasesNode case1 (Proof.changeFormulaStepText value case2)

                Proof.FormulaNode _ _ ->
                    zipper.proof
    in
    { zipper | proof = newProof }


reindexAll : Zipper -> Zipper
reindexAll zipper =
    let
        newZipper1 =
            reindex zipper

        newZipper2 =
            case downOrNothing newZipper1 of
                Nothing ->
                    newZipper1

                Just childrenZipper ->
                    up (reindexAll childrenZipper)

        newZipper3 =
            case enterContradictionOrNothing newZipper2 of
                Nothing ->
                    newZipper2

                Just childrenZipper ->
                    up (reindexAll childrenZipper)

        newZipper4 =
            case enterCase1OrNothing newZipper3 of
                Nothing ->
                    newZipper3

                Just childrenZipper ->
                    up (reindexAll childrenZipper)

        newZipper5 =
            case enterCase2OrNothing newZipper4 of
                Nothing ->
                    newZipper4

                Just childrenZipper ->
                    up (reindexAll childrenZipper)
    in
    newZipper5


reindex : Zipper -> Zipper
reindex zipper =
    case List.head zipper.breadcrumbs of
        Nothing ->
            case zipper.proof of
                Proof.FormulaNode expl data ->
                    { zipper | proof = Proof.FormulaNode expl { data | index = 1 } }

                Proof.CasesNode case1 case2 ->
                    { zipper | proof = Proof.CasesNode { case1 | index = 1 } { case2 | index = 2 } }

        Just breadcrumb ->
            case breadcrumb of
                GoDown parentExpl parentFormulaStep ->
                    case zipper.proof of
                        Proof.FormulaNode expl formStep ->
                            { zipper | proof = Proof.FormulaNode expl { formStep | index = parentFormulaStep.index + 1 } }

                        Proof.CasesNode _ _ ->
                            Debug.log "Not sure wether implemented correctly!" zipper

                GoCase1 _ formulaStep ->
                    -- todo: fixme
                    zipper

                GoCase2 formulaStep _ ->
                    -- todo: fixme
                    zipper

                GoContradiction formulaStep ->
                    -- todo: fixme
                    zipper


matchAll : Zipper -> Zipper
matchAll zipper =
    -- WARNING: Close your eyes, otherwise you'll have an heart attack!!!
    let
        newZipper1 =
            match zipper

        newZipper2 =
            case downOrNothing newZipper1 of
                Nothing ->
                    newZipper1

                Just childrenZipper ->
                    up (matchAll childrenZipper)

        newZipper3 =
            case enterContradictionOrNothing newZipper2 of
                Nothing ->
                    newZipper2

                Just childrenZipper ->
                    up (matchAll childrenZipper)

        newZipper4 =
            case enterCase1OrNothing newZipper3 of
                Nothing ->
                    newZipper3

                Just childrenZipper ->
                    up (matchAll childrenZipper)

        newZipper5 =
            case enterCase2OrNothing newZipper4 of
                Nothing ->
                    newZipper4

                Just childrenZipper ->
                    up (matchAll childrenZipper)
    in
    -- See, I warned you.
    newZipper5


match : Zipper -> Zipper
match zipper =
    case zipper.proof of
        Proof.FormulaNode expl formulaStep ->
            let
                newExpl =
                    case expl of
                        Proof.Rule _ ->
                            Proof.Rule matched

                        Proof.Premise ->
                            expl

                        Proof.Contradiction _ ->
                            expl

                matched =
                    callMatcher <| findFormulas zipper

                newProof =
                    Proof.FormulaNode newExpl formulaStep
            in
            { zipper | proof = newProof }

        Proof.CasesNode _ _ ->
            zipper


callMatcher : List Proof.FormulaStep -> Maybe Proof.Justification
callMatcher formulaSteps =
    case formulaSteps of
        toProve :: from ->
            Proof.validator toProve from

        [] ->
            Nothing


findFormulas : Zipper -> List Proof.FormulaStep
findFormulas zipper =
    let
        this =
            case zipper.proof of
                Proof.FormulaNode expl formulaStep ->
                    Just formulaStep

                Proof.CasesNode _ _ ->
                    Nothing
    in
    case this of
        Just formulaStep ->
            case upOrNothing zipper of
                Nothing ->
                    [ formulaStep ]

                Just parentZipper ->
                    formulaStep :: findFormulas parentZipper

        Nothing ->
            case upOrNothing zipper of
                Nothing ->
                    []

                Just parentZipper ->
                    findFormulas parentZipper
