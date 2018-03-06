module Zipper
    exposing
        ( Zipper
        , add
        , create
        , delete
        , down
        , downOrStop
        , edit
        , enterCase1OrStop
        , enterCase2OrStop
        , enterContradictionOrStop
        , getCase1Value
        , getCase2Value
        , getElement
        , getEmptyError
        , getError
        , getGUI
        , getValue
        , getVyplyvanieErrors
        , leaveContradictionOrStop
        , root
        , setElement
        , setGUI
        , toggleCases
        , toggleContradiction
        , up
        , upOrStop
        )

import Formula
import Matcher
import Proof


getElement : Zipper -> Proof.Element
getElement zipper =
    Proof.getElementFromSteps zipper.steps


type Breadcrumb
    = NextStepBreadCrumb Proof.ProofType
    | LastContradictionBreadCrumb Proof.Element
    | NextContradictionBreadCrumb Proof.Element Proof.Steps
    | LastCase1BreadCrumb Proof.Element Proof.Steps
    | NextCase1BreadCrumb Proof.Element Proof.Steps Proof.Steps
    | LastCase2BreadCrumb Proof.Element Proof.Steps
    | NextCase2BreadCrumb Proof.Element Proof.Steps Proof.Steps


type alias Zipper =
    { steps : Proof.Steps, breadcrumbs : List Breadcrumb }


toggleContradiction : Zipper -> Zipper
toggleContradiction zipper =
    let
        proofType =
            Proof.getProofTypeFromSteps zipper.steps

        newContradiction =
            Proof.Last <| Proof.Normal <| Proof.createElement "contradict me"

        newProofType =
            case proofType of
                Proof.Normal element ->
                    Proof.Contradiction element newContradiction

                Proof.Contradiction element _ ->
                    Proof.Normal element

                Proof.Cases _ _ _ ->
                    -- cases cannot be contradicted directly
                    proofType

        newSteps =
            Proof.setProofTypeInSteps newProofType zipper.steps
    in
    { zipper | steps = newSteps }


toggleCases : Zipper -> Zipper
toggleCases zipper =
    let
        proofType =
            Proof.getProofTypeFromSteps zipper.steps

        newCase =
            Proof.Last <| Proof.Normal <| Proof.createElement ""

        newProofType =
            case proofType of
                Proof.Normal element ->
                    Proof.Cases element newCase newCase

                Proof.Cases element _ _ ->
                    Proof.Normal element

                Proof.Contradiction _ _ ->
                    -- contradiction cannot be cased directly
                    proofType

        newSteps =
            Proof.setProofTypeInSteps newProofType zipper.steps
    in
    { zipper | steps = newSteps }


getError : Zipper -> Maybe String
getError zipper =
    case (Proof.getElementFromSteps zipper.steps).formula of
        Ok _ ->
            Nothing

        Err error ->
            Just <| "Parsing failed: " ++ toString error


getEmptyError : Zipper -> Maybe String
getEmptyError zipper =
    if (Proof.getElementFromSteps zipper.steps).value == "" then
        Just "Input should not be empty."
    else
        Nothing


previousFormulas : Zipper -> List Formula.Formula
previousFormulas zipper =
    -- todo: aj v hlavnej vetve
    case up zipper of
        Nothing ->
            []

        Just newZipper ->
            previousFormulasTmp newZipper


previousFormulasTmp : Zipper -> List Formula.Formula
previousFormulasTmp zipper =
    -- todo: aj v hlavnej vetve
    let
        this =
            case (Proof.getElementFromSteps zipper.steps).formula of
                Ok formula ->
                    [ formula ]

                Err _ ->
                    []

        rest =
            case up zipper of
                Nothing ->
                    []

                Just newZipper ->
                    previousFormulasTmp newZipper
    in
    this ++ rest


getVyplyvanieErrors : Zipper -> Maybe String
getVyplyvanieErrors zipper =
    case (Proof.getElementFromSteps zipper.steps).formula of
        Ok formula ->
            Matcher.isOk formula (previousFormulas zipper)

        Err str ->
            Just <| toString str


getValue : Zipper -> String
getValue zipper =
    (Proof.getElementFromSteps zipper.steps).value


getGUI : Zipper -> Proof.GUI
getGUI zipper =
    (Proof.getElementFromSteps zipper.steps).gui


setGUI : Proof.GUI -> Zipper -> Zipper
setGUI gui zipper =
    let
        oldElement =
            Proof.getElementFromSteps zipper.steps

        element =
            { oldElement | gui = gui }
    in
    setElement element zipper


setElement : Proof.Element -> Zipper -> Zipper
setElement element zipper =
    { zipper | steps = Proof.setElementInSteps element zipper.steps }



-- Move around in zipper


down : Zipper -> Maybe Zipper
down zipper =
    case zipper.steps of
        Proof.Last _ ->
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

                LastContradictionBreadCrumb _ ->
                    Nothing

                NextContradictionBreadCrumb _ _ ->
                    Nothing

                LastCase1BreadCrumb _ _ ->
                    Nothing

                NextCase1BreadCrumb _ _ _ ->
                    Nothing

                LastCase2BreadCrumb _ _ ->
                    Nothing

                NextCase2BreadCrumb _ _ _ ->
                    Nothing


upOrStop : Zipper -> Zipper
upOrStop zipper =
    Maybe.withDefault zipper (up zipper)


root : Zipper -> Zipper
root zipper =
    -- todo: refactor
    case up zipper of
        Nothing ->
            case leaveContradiction zipper of
                Nothing ->
                    case leaveCase zipper of
                        Nothing ->
                            zipper

                        Just newZipper ->
                            root newZipper

                Just newZipper ->
                    root newZipper

        Just newZipper ->
            root newZipper



-- contradiction


enterContradiction : Zipper -> Maybe Zipper
enterContradiction zipper =
    case Proof.getProofTypeFromSteps zipper.steps of
        Proof.Normal _ ->
            Nothing

        Proof.Cases _ _ _ ->
            Nothing

        Proof.Contradiction element contradictionSteps ->
            let
                breadcrumb =
                    case zipper.steps of
                        Proof.Last _ ->
                            LastContradictionBreadCrumb element

                        Proof.Next _ nextProof ->
                            NextContradictionBreadCrumb element nextProof

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = contradictionSteps, breadcrumbs = breadcrumbs }


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

                LastCase1BreadCrumb _ _ ->
                    Nothing

                NextCase1BreadCrumb _ _ _ ->
                    Nothing

                LastCase2BreadCrumb _ _ ->
                    Nothing

                NextCase2BreadCrumb _ _ _ ->
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



-- cases


getCase1Value : Zipper -> String
getCase1Value zipper =
    -- todo
    "todo: Case1"


getCase2Value : Zipper -> String
getCase2Value zipper =
    -- todo
    "todo: Case2"


enterCase1 : Zipper -> Maybe Zipper
enterCase1 zipper =
    case Proof.getProofTypeFromSteps zipper.steps of
        Proof.Normal _ ->
            Nothing

        Proof.Contradiction _ _ ->
            Nothing

        Proof.Cases element case1 case2 ->
            let
                breadcrumb =
                    case zipper.steps of
                        Proof.Last _ ->
                            LastCase1BreadCrumb element case2

                        Proof.Next _ nextProof ->
                            NextCase1BreadCrumb element case2 nextProof

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = case1, breadcrumbs = breadcrumbs }


enterCase1OrStop : Zipper -> Zipper
enterCase1OrStop zipper =
    Maybe.withDefault zipper (enterCase1 zipper)


enterCase2 : Zipper -> Maybe Zipper
enterCase2 zipper =
    case Proof.getProofTypeFromSteps zipper.steps of
        Proof.Normal _ ->
            Nothing

        Proof.Contradiction _ _ ->
            Nothing

        Proof.Cases element case1 case2 ->
            let
                breadcrumb =
                    case zipper.steps of
                        Proof.Last _ ->
                            LastCase2BreadCrumb element case1

                        Proof.Next _ nextProof ->
                            NextCase2BreadCrumb element case1 nextProof

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | steps = case2, breadcrumbs = breadcrumbs }


enterCase2OrStop : Zipper -> Zipper
enterCase2OrStop zipper =
    Maybe.withDefault zipper (enterCase2 zipper)


leaveCase : Zipper -> Maybe Zipper
leaveCase zipper =
    case zipper.breadcrumbs of
        [] ->
            Nothing

        head :: tail ->
            case head of
                NextStepBreadCrumb _ ->
                    Nothing

                LastContradictionBreadCrumb _ ->
                    Nothing

                NextContradictionBreadCrumb _ _ ->
                    Nothing

                LastCase1BreadCrumb element case2 ->
                    Just
                        { steps = Proof.Last <| Proof.Cases element zipper.steps case2
                        , breadcrumbs = tail
                        }

                NextCase1BreadCrumb element case2 nextProof ->
                    Just
                        { steps = Proof.Next (Proof.Cases element zipper.steps case2) nextProof
                        , breadcrumbs = tail
                        }

                LastCase2BreadCrumb element case1 ->
                    Just
                        { steps = Proof.Last <| Proof.Cases element case1 zipper.steps
                        , breadcrumbs = tail
                        }

                NextCase2BreadCrumb element case1 nextProof ->
                    Just
                        { steps = Proof.Next (Proof.Cases element case1 zipper.steps) nextProof
                        , breadcrumbs = tail
                        }


leaveCaseOrStop : Zipper -> Zipper
leaveCaseOrStop zipper =
    Maybe.withDefault zipper (leaveCase zipper)



-- Modify zipper


create : String -> Zipper
create value =
    { steps = Proof.Last <| Proof.Normal <| Proof.createElement value, breadcrumbs = [] }


add : Proof.Element -> Zipper -> Zipper
add element zipper =
    { zipper | steps = Proof.addStep element zipper.steps }


edit : String -> Zipper -> Zipper
edit value zipper =
    { zipper | steps = Proof.editStep value zipper.steps }


getParentForDelete : Zipper -> Maybe Zipper
getParentForDelete zipper =
    case up zipper of
        Nothing ->
            case leaveContradiction zipper of
                Nothing ->
                    case leaveCase zipper of
                        Nothing ->
                            Nothing

                        Just parent ->
                            Just parent

                Just parent ->
                    Just parent

        Just parent ->
            Just parent


delete : Zipper -> Zipper
delete zipper =
    case getParentForDelete zipper of
        Nothing ->
            case down zipper of
                Nothing ->
                    create ""

                Just child ->
                    { child | breadcrumbs = [] }

        Just parent ->
            let
                proofType =
                    Proof.getProofTypeFromSteps parent.steps

                newStep =
                    Proof.Last <| Proof.Normal (Proof.createElement "")
            in
            case proofType of
                Proof.Normal _ ->
                    case zipper.steps of
                        Proof.Last _ ->
                            { parent | steps = Proof.Last proofType }

                        Proof.Next _ nextStep ->
                            { parent | steps = Proof.Next proofType nextStep }

                Proof.Contradiction element _ ->
                    let
                        nextStep =
                            case zipper.steps of
                                Proof.Last _ ->
                                    newStep

                                Proof.Next _ nextStep ->
                                    nextStep
                    in
                    { parent | steps = Proof.setProofTypeInSteps (Proof.Contradiction element nextStep) parent.steps }

                Proof.Cases element case1 case2 ->
                    let
                        nextStep =
                            case zipper.steps of
                                Proof.Last _ ->
                                    newStep

                                Proof.Next _ nextStep ->
                                    nextStep
                    in
                    if case1 == zipper.steps then
                        { parent | steps = Proof.setProofTypeInSteps (Proof.Cases element nextStep case2) parent.steps }
                    else
                        { parent | steps = Proof.setProofTypeInSteps (Proof.Cases element case1 nextStep) parent.steps }
