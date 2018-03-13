module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , create
          --, delete
        , down
          --, edit
          --, enterCase1
          --, enterCase2
          --, enterContradiction
          --, getElement
          --, getEmptyError
          --, getError
          --, leaveContradiction
        , root
          --, toggleContradiction
        , up
        )

import Formula
import Proof


type Breadcrumb
    = GoDown Proof.Explanation Proof.FormulaStep


type alias Zipper =
    { proof : Proof.Proof, breadcrumbs : List Breadcrumb }


create : Proof.FormulaStep -> Zipper
create formulaStep =
    { proof = Proof.FormulaNode Proof.Rule formulaStep, breadcrumbs = [] }


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
