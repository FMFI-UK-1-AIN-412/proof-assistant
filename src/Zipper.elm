module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , changeExplanation
        , create
        , createContradictionFirstNode
        , delete
        , down
        , downOrNothing
        , editValue
        , enterCase1
        , enterCase2
        , enterContradiction
        , matchAll
        , reindexAll
        , root
        , up
        )

import Formula
import Proof


type Breadcrumb
    = GoDown Proof.Explanation Proof.FormulaStep
    | GoCase1 Proof.FormulaStep
    | GoCase2 Proof.FormulaStep
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


add : Proof.FormulaStep -> Zipper -> Zipper
add formulaStep zipper =
    { zipper | proof = Proof.addFormulaStep formulaStep zipper.proof }


addCases : Zipper -> Zipper
addCases zipper =
    { zipper | proof = Proof.addCases zipper.proof |> Maybe.withDefault zipper.proof }


downOrNothing : Zipper -> Maybe Zipper
downOrNothing zipper =
    case zipper.proof of
        Proof.FormulaNode exp nextStep ->
            case nextStep.next of
                Just nextProof ->
                    let
                        breadcrumb =
                            GoDown exp { nextStep | next = Nothing }
                    in
                    Just
                        { zipper
                            | proof = nextProof
                            , breadcrumbs = breadcrumb :: zipper.breadcrumbs
                        }

                Nothing ->
                    Nothing

        Proof.CasesNode _ _ ->
            Nothing


down : Zipper -> Zipper
down zipper =
    downOrNothing zipper |> Maybe.withDefault zipper


enterCase1OrNothing : Zipper -> Maybe Zipper
enterCase1OrNothing zipper =
    case zipper.proof of
        Proof.CasesNode case1 case2 ->
            let
                newProof =
                    Proof.FormulaNode (Proof.Rule Nothing) case1

                breadcrumb =
                    GoCase1 case2
            in
            Just { zipper | proof = newProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }

        Proof.FormulaNode _ _ ->
            Nothing


enterCase1 : Zipper -> Zipper
enterCase1 zipper =
    enterCase1OrNothing zipper |> Maybe.withDefault zipper


enterCase2OrNothing : Zipper -> Maybe Zipper
enterCase2OrNothing zipper =
    case zipper.proof of
        Proof.CasesNode case1 case2 ->
            let
                newProof =
                    Proof.FormulaNode (Proof.Rule Nothing) case2

                breadcrumb =
                    GoCase2 case1
            in
            Just { zipper | proof = newProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }

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
                    case maybeProof of
                        Nothing ->
                            Nothing

                        Just nextProof ->
                            let
                                breadcrumb =
                                    GoContradiction formulaStep
                            in
                            Just { zipper | proof = nextProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }


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

                GoCase1 step2 ->
                    case zipper.proof of
                        Proof.FormulaNode _ step1 ->
                            let
                                newProof =
                                    Proof.CasesNode step1 step2
                            in
                            Just { zipper | proof = newProof, breadcrumbs = rest }

                        Proof.CasesNode _ _ ->
                            Nothing

                GoCase2 step1 ->
                    case zipper.proof of
                        Proof.FormulaNode _ step2 ->
                            let
                                newProof =
                                    Proof.CasesNode step1 step2
                            in
                            Just { zipper | proof = newProof, breadcrumbs = rest }

                        Proof.CasesNode _ _ ->
                            Nothing

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
    -- todo: this is not implemented! finish it!
    case upOrNothing zipper of
        Nothing ->
            case downOrNothing zipper of
                Nothing ->
                    create <| Proof.createFormulaStep ""

                Just child ->
                    { child | breadcrumbs = [] }

        Just parent ->
            case downOrNothing zipper of
                Nothing ->
                    case parent.proof of
                        Proof.FormulaNode expl formStep ->
                            { parent | proof = Proof.FormulaNode expl { formStep | next = Nothing } }

                        Proof.CasesNode case1 case2 ->
                            -- todo
                            Debug.crash "WTF 1?" zipper

                Just child ->
                    case parent.proof of
                        Proof.FormulaNode expl formStep ->
                            let
                                newProof =
                                    { formStep | next = Just child.proof }
                            in
                            { parent | proof = Proof.FormulaNode expl newProof }

                        Proof.CasesNode case1 case2 ->
                            -- todo
                            Debug.crash "WTF 2?" zipper


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
    -- See, I warned you.
    newZipper5


reindex : Zipper -> Zipper
reindex zipper =
    let
        newIndex =
            case upOrNothing zipper of
                Nothing ->
                    1

                Just parent ->
                    case parent.proof of
                        Proof.FormulaNode _ data ->
                            data.index + 1

                        -- todo: fixme!
                        _ ->
                            888

        newProof =
            case zipper.proof of
                Proof.FormulaNode expl data ->
                    Proof.FormulaNode expl { data | index = newIndex }

                -- todo: fixme
                _ ->
                    zipper.proof
    in
    { zipper | proof = newProof }



-- Matcher specific


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
