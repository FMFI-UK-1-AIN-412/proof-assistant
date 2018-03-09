module Zipper
    exposing
        ( Zipper
        , add
        , addCasesOrStop
        , create
        , delete
        , down
        , downOrStop
        , edit
        , enterCase1OrStop
        , enterCase2OrStop
        , enterContradictionOrStop
        , getElement
        , getEmptyError
        , getError
        , leaveContradictionOrStop
        , root
        , toggleContradiction
        , up
        , upOrStop
        )

import Formula
import Matcher
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

        newContradiction =
            Proof.Last <| Proof.Normal <| Proof.createElement "contradict me"

        naybeNewProofType =
            case maybeProofType of
                Nothing ->
                    Nothing

                Just proofType ->
                    case proofType of
                        Proof.Normal element ->
                            Just <| Proof.Contradiction element newContradiction

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


addCases : Zipper -> Maybe Zipper
addCases zipper =
    let
        proof =
            Proof.Last <| Proof.Normal <| Proof.createElement ""

        newCases =
            Proof.Cases proof proof
    in
    case zipper.steps of
        Proof.Last proofType ->
            Just { zipper | steps = Proof.Next proofType newCases }

        Proof.Next _ _ ->
            Nothing

        Proof.Cases _ _ ->
            Nothing


addCasesOrStop : Zipper -> Zipper
addCasesOrStop zipper =
    Maybe.withDefault zipper (addCases zipper)


getElement : Zipper -> Maybe Proof.Element
getElement zipper =
    Proof.getElementFromSteps zipper.steps



---- Move around in zipper


down : Zipper -> Maybe Zipper
down zipper =
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


downOrStop : Zipper -> Zipper
downOrStop zipper =
    Maybe.withDefault zipper (down zipper)


up : Zipper -> Maybe Zipper
up zipper =
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


upOrStop : Zipper -> Zipper
upOrStop zipper =
    Maybe.withDefault zipper (up zipper)


root : Zipper -> Zipper
root zipper =
    case up zipper of
        Nothing ->
            zipper

        Just newZipper ->
            root newZipper


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



---- contradiction


enterContradiction : Zipper -> Maybe Zipper
enterContradiction zipper =
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


enterContradictionOrStop : Zipper -> Zipper
enterContradictionOrStop zipper =
    Maybe.withDefault zipper (enterContradiction zipper)


leaveContradiction : Zipper -> Maybe Zipper
leaveContradiction zipper =
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


leaveContradictionOrStop : Zipper -> Zipper
leaveContradictionOrStop zipper =
    Maybe.withDefault zipper (leaveContradiction zipper)



-- Cases


enterCase1 : Zipper -> Maybe Zipper
enterCase1 zipper =
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


enterCase1OrStop : Zipper -> Zipper
enterCase1OrStop zipper =
    Maybe.withDefault zipper (enterCase1 zipper)


enterCase2 : Zipper -> Maybe Zipper
enterCase2 zipper =
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


enterCase2OrStop : Zipper -> Zipper
enterCase2OrStop zipper =
    Maybe.withDefault zipper (enterCase2 zipper)



--Modify zipper


create : String -> Zipper
create value =
    { steps = Proof.Last <| Proof.Normal <| Proof.createElement value, breadcrumbs = [] }


add : Proof.Element -> Zipper -> Zipper
add element zipper =
    { zipper | steps = Proof.addStep element zipper.steps }


delete : Zipper -> Zipper
delete zipper =
    case up zipper of
        Nothing ->
            case down zipper of
                Nothing ->
                    create ""

                Just child ->
                    { child | breadcrumbs = [] }

        Just parent ->
            case zipper.steps of
                Proof.Last proofType ->
                    -- todo
                    Debug.log "a"
                        zipper

                Proof.Next _ nextSteps ->
                    Debug.log "b"
                        { zipper | steps = nextSteps }

                Proof.Cases case1 case2 ->
                    -- todo
                    Debug.log "c"
                        zipper


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
