module Zipper
    exposing
        ( Zipper
        , add
        , addCases
        , create
        , delete
        , down
        , edit
        , enterCase1
        , enterCase2
        , enterContradiction
        , getElement
        , getEmptyError
        , getError
        , leaveContradiction
        , root
        , toggleContradiction
        , up
        )

import Formula
import Proof


type Breadcrumb
    = NextStepBreadCrumb Proof.ProofType
    | LastContradictionBreadCrumb Proof.Element
    | NextContradictionBreadCrumb Proof.Element Proof.Steps
    | Case1BreadCrumb Proof.Steps
    | Case2BreadCrumb Proof.Steps


type alias Zipper =
    { steps : Proof.Steps, breadcrumbs : List Breadcrumb }


toggleContradiction : Zipper -> Zipper
toggleContradiction zipper =
    let
        maybeProofType =
            Proof.getProofTypeFromSteps zipper.steps

        naybeNewProofType =
            case maybeProofType of
                Nothing ->
                    Nothing

                Just proofType ->
                    case proofType of
                        Proof.Normal element ->
                            Just <| Proof.Contradiction element Proof.defaultProofStep

                        Proof.Contradiction element _ ->
                            Just <| Proof.Normal element

        newZipper =
            case naybeNewProofType of
                Nothing ->
                    zipper

                Just newProofType ->
                    { zipper | steps = Proof.setProofTypeInSteps newProofType zipper.steps }
    in
    newZipper


addCasesOrNothing : Zipper -> Maybe Zipper
addCasesOrNothing zipper =
    case zipper.steps of
        Proof.Last proofType ->
            Just { zipper | steps = Proof.Next proofType <| Proof.Cases Proof.defaultProofStep Proof.defaultProofStep }

        Proof.Next _ _ ->
            Nothing

        Proof.Cases _ _ ->
            Nothing


addCases : Zipper -> Zipper
addCases zipper =
    Maybe.withDefault zipper (addCasesOrNothing zipper)


getElement : Zipper -> Maybe Proof.Element
getElement zipper =
    Proof.getElementFromSteps zipper.steps



-- Move around in zipper


downOrNothing : Zipper -> Maybe Zipper
downOrNothing zipper =
    case zipper.steps of
        Proof.Last _ ->
            Nothing

        Proof.Cases _ _ ->
            Nothing

        Proof.Next proofType nextSteps ->
            let
                breadcrumb =
                    NextStepBreadCrumb proofType

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = nextSteps, breadcrumbs = breadcrumbs }


down : Zipper -> Zipper
down zipper =
    Maybe.withDefault zipper (downOrNothing zipper)


upOrNothing : Zipper -> Maybe Zipper
upOrNothing zipper =
    case zipper.breadcrumbs of
        [] ->
            Nothing

        head :: tail ->
            case head of
                NextStepBreadCrumb proofType ->
                    Just
                        { steps = Proof.Next proofType zipper.steps
                        , breadcrumbs = tail
                        }

                LastContradictionBreadCrumb element ->
                    Just
                        { steps = Proof.Last <| Proof.Contradiction element zipper.steps
                        , breadcrumbs = tail
                        }

                NextContradictionBreadCrumb element steps ->
                    Just
                        { steps = Proof.Next (Proof.Contradiction element zipper.steps) steps
                        , breadcrumbs = tail
                        }

                Case1BreadCrumb case2 ->
                    Just
                        { steps = Proof.Cases zipper.steps case2
                        , breadcrumbs = tail
                        }

                Case2BreadCrumb case1 ->
                    Just
                        { steps = Proof.Cases case1 zipper.steps
                        , breadcrumbs = tail
                        }


up : Zipper -> Zipper
up zipper =
    Maybe.withDefault zipper (upOrNothing zipper)


root : Zipper -> Zipper
root zipper =
    case upOrNothing zipper of
        Nothing ->
            zipper

        Just newZipper ->
            root newZipper



-- Contradiction


enterContradictionOrNothing : Zipper -> Maybe Zipper
enterContradictionOrNothing zipper =
    case zipper.steps of
        Proof.Last proofType ->
            case proofType of
                Proof.Normal _ ->
                    Nothing

                Proof.Contradiction element contradictionSteps ->
                    Just
                        { zipper
                            | steps = contradictionSteps
                            , breadcrumbs = LastContradictionBreadCrumb element :: zipper.breadcrumbs
                        }

        Proof.Next proofType nextProof ->
            case proofType of
                Proof.Normal _ ->
                    Nothing

                Proof.Contradiction element contradictionSteps ->
                    Just
                        { zipper
                            | steps = contradictionSteps
                            , breadcrumbs = NextContradictionBreadCrumb element nextProof :: zipper.breadcrumbs
                        }

        Proof.Cases _ _ ->
            Nothing


enterContradiction : Zipper -> Zipper
enterContradiction zipper =
    Maybe.withDefault zipper (enterContradictionOrNothing zipper)


leaveContradictionOrNothing : Zipper -> Maybe Zipper
leaveContradictionOrNothing zipper =
    case zipper.breadcrumbs of
        [] ->
            Nothing

        head :: tail ->
            case head of
                NextStepBreadCrumb _ ->
                    Nothing

                Case1BreadCrumb _ ->
                    Nothing

                Case2BreadCrumb _ ->
                    Nothing

                LastContradictionBreadCrumb element ->
                    Just
                        { steps = Proof.Last <| Proof.Contradiction element zipper.steps
                        , breadcrumbs = tail
                        }

                NextContradictionBreadCrumb element steps ->
                    Just
                        { steps = Proof.Next (Proof.Contradiction element zipper.steps) steps
                        , breadcrumbs = tail
                        }


leaveContradiction : Zipper -> Zipper
leaveContradiction zipper =
    Maybe.withDefault zipper (leaveContradictionOrNothing zipper)



-- Cases


enterCase1OrNothing : Zipper -> Maybe Zipper
enterCase1OrNothing zipper =
    case zipper.steps of
        Proof.Last _ ->
            Nothing

        Proof.Next _ _ ->
            Nothing

        Proof.Cases case1 case2 ->
            let
                breadcrumb =
                    Case1BreadCrumb case2

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = case1, breadcrumbs = breadcrumbs }


enterCase1 : Zipper -> Zipper
enterCase1 zipper =
    Maybe.withDefault zipper (enterCase1OrNothing zipper)


enterCase2OrNothing : Zipper -> Maybe Zipper
enterCase2OrNothing zipper =
    case zipper.steps of
        Proof.Last _ ->
            Nothing

        Proof.Next _ _ ->
            Nothing

        Proof.Cases case1 case2 ->
            let
                breadcrumb =
                    Case2BreadCrumb case1

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = case2, breadcrumbs = breadcrumbs }


enterCase2 : Zipper -> Zipper
enterCase2 zipper =
    Maybe.withDefault zipper (enterCase2OrNothing zipper)



-- Modify zipper


create : String -> Zipper
create value =
    { steps = Proof.Last <| Proof.Normal <| Proof.createElement value, breadcrumbs = [] }


add : Proof.Element -> Zipper -> Zipper
add element zipper =
    { zipper | steps = Proof.addStep element zipper.steps }


edit : Proof.Element -> Zipper -> Zipper
edit element zipper =
    let
        maybeNewSteps =
            Proof.setElementInSteps element zipper.steps

        newSteps =
            case maybeNewSteps of
                Nothing ->
                    zipper.steps

                Just new ->
                    new
    in
    { zipper | steps = newSteps }


delete : Zipper -> Zipper
delete zipper =
    -- todo: implement
    case upOrNothing zipper of
        Nothing ->
            case downOrNothing zipper of
                Nothing ->
                    Debug.crash "j" <| create ""

                Just child ->
                    Debug.crash "k" <| { child | breadcrumbs = [] }

        Just parent ->
            case zipper.steps of
                Proof.Last proofType ->
                    case parent.steps of
                        Proof.Last parentProofType ->
                            Debug.crash "a" zipper

                        Proof.Next parentElement parentNextSteps ->
                            Debug.log "b" { parent | steps = Proof.Last parentElement }

                        Proof.Cases parentCase1 parentCase2 ->
                            let
                                newCase =
                                    Proof.Last <| Proof.Normal <| Proof.createElement ""

                                ( case1, case2 ) =
                                    if zipper.steps == parentCase1 then
                                        ( newCase, parentCase2 )
                                    else
                                        ( parentCase1, newCase )
                            in
                            Debug.log "c" { parent | steps = Proof.Cases case1 case2 }

                Proof.Next _ nextSteps ->
                    case parent.steps of
                        Proof.Last parentProofType ->
                            Debug.crash "d" zipper

                        Proof.Next parentElement parentNextSteps ->
                            Debug.log "e" { parent | steps = Proof.Next parentElement nextSteps }

                        Proof.Cases parentCase1 parentCase2 ->
                            Debug.crash "f" zipper

                Proof.Cases case1 case2 ->
                    case parent.steps of
                        Proof.Last parentProofType ->
                            Debug.crash "g" zipper

                        Proof.Next parentElement parentNextSteps ->
                            Debug.log "h" { parent | steps = Proof.Last parentElement }

                        Proof.Cases parentCase1 parentCase2 ->
                            Debug.crash "i" zipper


getError : Zipper -> Maybe String
getError zipper =
    case Proof.getElementFromSteps zipper.steps of
        Nothing ->
            Nothing

        Just element ->
            case element.formula of
                Ok _ ->
                    Nothing

                Err error ->
                    Just <| "Parsing failed: " ++ toString error


getEmptyError : Zipper -> Maybe String
getEmptyError zipper =
    case Proof.getElementFromSteps zipper.steps of
        Nothing ->
            Nothing

        Just element ->
            if element.value == "" then
                Just "Input should not be empty."
            else
                Nothing
