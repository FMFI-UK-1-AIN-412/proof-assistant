module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , create
          --, delete
        , down
        , downOrNothing
        , edit
        , enterCase1
        , enterCase2
        , enterContradiction
          --, getElement
          --, getEmptyError
          --, getError
        , root
          --, toggleContradiction
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
    { proof = Proof.FormulaNode Proof.Rule formulaStep, breadcrumbs = [] }


edit : Proof.FormulaStep -> Zipper -> Zipper
edit formulaStep zipper =
    case zipper.proof of
        Proof.CasesNode _ _ ->
            zipper

        Proof.FormulaNode expl _ ->
            { zipper | proof = Proof.FormulaNode expl formulaStep }


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
                    Proof.FormulaNode Proof.Rule case1

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
                    Proof.FormulaNode Proof.Rule case2

                breadcrumb =
                    GoCase2 case1
            in
            Just { zipper | proof = newProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }

        Proof.FormulaNode _ _ ->
            Nothing


enterCase2 : Zipper -> Zipper
enterCase2 zipper =
    enterCase2OrNothing zipper |> Maybe.withDefault zipper


enterContradictionOrNothing : Zipper -> Maybe Zipper
enterContradictionOrNothing zipper =
    case zipper.proof of
        Proof.CasesNode _ _ ->
            Nothing

        Proof.FormulaNode explanation formulaStep ->
            case explanation of
                Proof.Premise ->
                    Nothing

                Proof.Rule ->
                    Nothing

                Proof.Contradiction contradictionFormulaStep ->
                    let
                        breadcrumb =
                            GoContradiction formulaStep

                        newProof =
                            Proof.FormulaNode Proof.Premise contradictionFormulaStep
                    in
                    Just { zipper | proof = newProof, breadcrumbs = breadcrumb :: zipper.breadcrumbs }


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
                    case zipper.proof of
                        Proof.FormulaNode _ tmp ->
                            let
                                explanation =
                                    Proof.Contradiction tmp

                                newProof =
                                    Proof.FormulaNode explanation formulaStep
                            in
                            Just { zipper | proof = newProof, breadcrumbs = rest }

                        Proof.CasesNode _ _ ->
                            Nothing

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
