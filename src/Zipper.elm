module Zipper
    exposing
        ( ProofType(..)
        , Steps(..)
        , Zipper
        , add
        , changeShowButtons
        , create
        , createElement
        , delete
        , down
        , downOrStop
        , edit
        , enterCase1OrStop
        , enterCase2OrStop
        , enterContradictionOrStop
        , getCase1Value
        , getCase2Value
        , getEmptyError
        , getError
        , getProofTypeFromSteps
        , getShowButtons
        , getValue
        , getVyplyvanieErrors
        , leaveContradictionOrStop
        , root
        , toggleCases
        , toggleContradiction
        , up
        , upOrStop
        )

import Formula
import Matcher
import Parser exposing (Parser)


-- Element


type alias Element =
    { value : String
    , formula : Result Parser.Error Formula.Formula
    , isPremis : Bool
    , showButton : Bool
    }


createElement : String -> Element
createElement string =
    { value = string
    , formula = Formula.parse string
    , isPremis = False
    , showButton = False
    }



-- Steps & ProofTypes


type ProofType
    = Normal Element
    | Contradiction Element Steps
    | Cases Element Steps Steps


type Steps
    = Last ProofType
    | Next ProofType Steps


addStep : Element -> Steps -> Steps
addStep element steps =
    case steps of
        Last proof ->
            Next proof <| Last (Normal element)

        Next proof nextStep ->
            Next proof <| Next (Normal element) nextStep


editStep : String -> Steps -> Steps
editStep value steps =
    let
        element =
            getElementFromSteps steps

        newElement =
            { element | value = value, formula = Formula.parse value }
    in
    setElementInSteps newElement steps


getElementFromProofType : ProofType -> Element
getElementFromProofType proofType =
    case proofType of
        Normal element ->
            element

        Contradiction element _ ->
            element

        Cases element _ _ ->
            element


setElementInProofType : Element -> ProofType -> ProofType
setElementInProofType element proofType =
    case proofType of
        Normal _ ->
            Normal element

        Contradiction _ steps ->
            Contradiction element steps

        Cases _ steps1 steps2 ->
            Cases element steps1 steps2


getElementFromSteps : Steps -> Element
getElementFromSteps =
    getElementFromProofType << getProofTypeFromSteps


setElementInSteps : Element -> Steps -> Steps
setElementInSteps element steps =
    setProofTypeInSteps
        (setElementInProofType element <| getProofTypeFromSteps steps)
        steps


getProofTypeFromSteps : Steps -> ProofType
getProofTypeFromSteps steps =
    case steps of
        Last proofType ->
            proofType

        Next proofType _ ->
            proofType


setProofTypeInSteps : ProofType -> Steps -> Steps
setProofTypeInSteps proofType steps =
    case steps of
        Last _ ->
            Last proofType

        Next _ steps ->
            Next proofType steps



-- Zipper


type Breadcrumb
    = NextStepBreadCrumb ProofType
    | LastContradictionBreadCrumb Element
    | NextContradictionBreadCrumb Element Steps
    | LastCase1BreadCrumb Element Steps
    | NextCase1BreadCrumb Element Steps Steps
    | LastCase2BreadCrumb Element Steps
    | NextCase2BreadCrumb Element Steps Steps


type alias Zipper =
    { steps : Steps, breadcrumbs : List Breadcrumb }


toggleContradiction : Zipper -> Zipper
toggleContradiction zipper =
    let
        proofType =
            getProofTypeFromSteps zipper.steps

        newContradiction =
            Last <| Normal <| createElement "contradict me"

        newProofType =
            case proofType of
                Normal element ->
                    Contradiction element newContradiction

                Contradiction element _ ->
                    Normal element

                Cases _ _ _ ->
                    -- cases cannot be contradicted directly
                    proofType

        newSteps =
            setProofTypeInSteps newProofType zipper.steps
    in
    { zipper | steps = newSteps }


toggleCases : Zipper -> Zipper
toggleCases zipper =
    let
        proofType =
            getProofTypeFromSteps zipper.steps

        newCase =
            Last <| Normal <| createElement "A case"

        newProofType =
            case proofType of
                Normal element ->
                    Cases element newCase newCase

                Cases element _ _ ->
                    Normal element

                Contradiction _ _ ->
                    -- contradiction cannot be cased directly
                    proofType

        newSteps =
            setProofTypeInSteps newProofType zipper.steps
    in
    { zipper | steps = newSteps }


getError : Zipper -> Maybe String
getError zipper =
    case (getElementFromSteps zipper.steps).formula of
        Ok _ ->
            Nothing

        Err error ->
            Just <| "Parsing failed: " ++ toString error


getEmptyError : Zipper -> Maybe String
getEmptyError zipper =
    if (getElementFromSteps zipper.steps).value == "" then
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
            case (getElementFromSteps zipper.steps).formula of
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
    case (getElementFromSteps zipper.steps).formula of
        Ok formula ->
            Matcher.isOk formula (previousFormulas zipper)

        Err str ->
            Just <| toString str


changeShowButtons : Bool -> Zipper -> Zipper
changeShowButtons bool zipper =
    let
        old_element =
            getElementFromSteps zipper.steps

        element =
            { old_element | showButton = bool }
    in
    { zipper | steps = setElementInSteps element zipper.steps }


getValue : Zipper -> String
getValue zipper =
    (getElementFromSteps zipper.steps).value


getShowButtons : Zipper -> Bool
getShowButtons zipper =
    (getElementFromSteps zipper.steps).showButton



-- Move around in zipper


down : Zipper -> Maybe Zipper
down zipper =
    case zipper.steps of
        Last _ ->
            Nothing

        Next proofType nextSteps ->
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
                        { steps = Next proofType zipper.steps
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
    case getProofTypeFromSteps zipper.steps of
        Normal _ ->
            Nothing

        Cases _ _ _ ->
            Nothing

        Contradiction element contradictionSteps ->
            let
                breadcrumb =
                    case zipper.steps of
                        Last _ ->
                            LastContradictionBreadCrumb element

                        Next _ nextProof ->
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
                        { steps = Last <| Contradiction element zipper.steps
                        , breadcrumbs = tail
                        }

                NextContradictionBreadCrumb element steps ->
                    Just
                        { steps = Next (Contradiction element zipper.steps) steps
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
    case getProofTypeFromSteps zipper.steps of
        Normal _ ->
            Nothing

        Contradiction _ _ ->
            Nothing

        Cases element case1 case2 ->
            let
                breadcrumb =
                    case zipper.steps of
                        Last _ ->
                            LastCase1BreadCrumb element case2

                        Next _ nextProof ->
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
    case getProofTypeFromSteps zipper.steps of
        Normal _ ->
            Nothing

        Contradiction _ _ ->
            Nothing

        Cases element case1 case2 ->
            let
                breadcrumb =
                    case zipper.steps of
                        Last _ ->
                            LastCase2BreadCrumb element case1

                        Next _ nextProof ->
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
                        { steps = Last <| Cases element zipper.steps case2
                        , breadcrumbs = tail
                        }

                NextCase1BreadCrumb element case2 nextProof ->
                    Just
                        { steps = Next (Cases element zipper.steps case2) nextProof
                        , breadcrumbs = tail
                        }

                LastCase2BreadCrumb element case1 ->
                    Just
                        { steps = Last <| Cases element case1 zipper.steps
                        , breadcrumbs = tail
                        }

                NextCase2BreadCrumb element case1 nextProof ->
                    Just
                        { steps = Next (Cases element case1 zipper.steps) nextProof
                        , breadcrumbs = tail
                        }


leaveCaseOrStop : Zipper -> Zipper
leaveCaseOrStop zipper =
    Maybe.withDefault zipper (leaveCase zipper)



-- Modify zipper


create : String -> Zipper
create value =
    { steps = Last <| Normal <| createElement value, breadcrumbs = [] }


add : Element -> Zipper -> Zipper
add element zipper =
    { zipper | steps = addStep element zipper.steps }


edit : String -> Zipper -> Zipper
edit value zipper =
    { zipper | steps = editStep value zipper.steps }


delete : Zipper -> Zipper
delete zipper =
    -- todo: this has to be refactored
    case up zipper of
        Nothing ->
            case leaveContradiction zipper of
                Nothing ->
                    case leaveCase zipper of
                        Nothing ->
                            case down zipper of
                                Nothing ->
                                    create ""

                                Just child ->
                                    { child | breadcrumbs = [] }

                        Just parent ->
                            case zipper.steps of
                                Last _ ->
                                    -- todo:
                                    zipper

                                Next _ _ ->
                                    -- todo:
                                    zipper

                Just parent ->
                    case zipper.steps of
                        Last _ ->
                            let
                                new =
                                    Last <| Normal (createElement "prove here")
                            in
                            { parent
                                | steps =
                                    setProofTypeInSteps
                                        (Contradiction (getElementFromSteps parent.steps) new)
                                        parent.steps
                            }

                        Next _ nextStep ->
                            { parent
                                | steps =
                                    setProofTypeInSteps
                                        (Contradiction (getElementFromSteps parent.steps) nextStep)
                                        parent.steps
                            }

        Just parent ->
            case zipper.steps of
                Last _ ->
                    { parent | steps = Last <| getProofTypeFromSteps parent.steps }

                Next _ nextStep ->
                    { parent | steps = Next (getProofTypeFromSteps parent.steps) nextStep }
