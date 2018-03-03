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
        , edit
        , getEmptyError
        , getError
        , getProofTypeFromSteps
        , getShowButtons
        , getValue
        , getVyplyvanieErrors
        , goContradiction
        , goContradictionOrStop
        , goDown
        , goDownOrStop
        , goOutContradictionOrStop
        , goRoot
        , goUp
        , goUpOrStop
        , toggleContradiction
        )

import Formula
import Matcher
import Parser exposing (Parser)


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


getElementFromSteps : Steps -> Element
getElementFromSteps =
    getElementFromProofType << getProofTypeFromSteps


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
    case goUp zipper of
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
            case goUp zipper of
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


getValue : Zipper -> String
getValue zipper =
    (getElementFromSteps zipper.steps).value


changeShowButtons : Bool -> Zipper -> Zipper
changeShowButtons bool zipper =
    let
        old_element =
            getElementFromSteps zipper.steps

        element =
            { old_element | showButton = bool }
    in
    { zipper | steps = setElementInSteps element zipper.steps }


getShowButtons : Zipper -> Bool
getShowButtons zipper =
    (getElementFromSteps zipper.steps).showButton


type Steps
    = Last ProofType
    | Next ProofType Steps


type ProofType
    = Normal Element
    | Contradiction Element Steps


getElementFromProofType : ProofType -> Element
getElementFromProofType proofType =
    case proofType of
        Normal element ->
            element

        Contradiction element _ ->
            element


getProofTypeFromSteps : Steps -> ProofType
getProofTypeFromSteps steps =
    case steps of
        Last proofType ->
            proofType

        Next proofType _ ->
            proofType


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

        newSteps =
            setProofTypeInSteps newProofType zipper.steps
    in
    { zipper | steps = newSteps }


type Breadcrumb
    = NextStepBreadCrumb ProofType
    | LastContradictionBreadCrumb Element
    | NextContradictionBreadCrumb Element Steps


type alias Zipper =
    { steps : Steps, breadcrumbs : List Breadcrumb }


create : String -> Zipper
create value =
    { steps = Last <| Normal <| createElement value, breadcrumbs = [] }


goDown : Zipper -> Maybe Zipper
goDown zipper =
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


goContradiction : Zipper -> Maybe Zipper
goContradiction zipper =
    case getProofTypeFromSteps zipper.steps of
        Normal _ ->
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


goContradictionOrStop : Zipper -> Zipper
goContradictionOrStop zipper =
    Maybe.withDefault zipper (goContradiction zipper)


goDownOrStop : Zipper -> Zipper
goDownOrStop zipper =
    Maybe.withDefault zipper (goDown zipper)


goUpOrStop : Zipper -> Zipper
goUpOrStop zipper =
    Maybe.withDefault zipper (goUp zipper)


goUp : Zipper -> Maybe Zipper
goUp zipper =
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


goOutContradiction : Zipper -> Maybe Zipper
goOutContradiction zipper =
    case zipper.breadcrumbs of
        [] ->
            Nothing

        head :: tail ->
            case head of
                NextStepBreadCrumb _ ->
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


goOutContradictionOrStop : Zipper -> Zipper
goOutContradictionOrStop zipper =
    Maybe.withDefault zipper (goOutContradiction zipper)


goRoot : Zipper -> Zipper
goRoot zipper =
    case goUp zipper of
        Nothing ->
            case goOutContradiction zipper of
                Nothing ->
                    zipper

                Just newZipper ->
                    goRoot newZipper

        Just newZipper ->
            goRoot newZipper


setProofTypeInSteps : ProofType -> Steps -> Steps
setProofTypeInSteps proofType steps =
    case steps of
        Last _ ->
            Last proofType

        Next _ steps ->
            Next proofType steps


setElementInProofType : Element -> ProofType -> ProofType
setElementInProofType element proofType =
    case proofType of
        Normal _ ->
            Normal element

        Contradiction _ steps ->
            Contradiction element steps


setElementInSteps : Element -> Steps -> Steps
setElementInSteps element steps =
    setProofTypeInSteps
        (setElementInProofType element <| getProofTypeFromSteps steps)
        steps


editStep : String -> Steps -> Steps
editStep value steps =
    let
        element =
            getElementFromSteps steps

        newElement =
            { element | value = value, formula = Formula.parse value }
    in
    setElementInSteps newElement steps


addStep : Element -> Steps -> Steps
addStep element steps =
    case steps of
        Last proof ->
            Next proof <| Last (Normal element)

        Next proof nextStep ->
            Next proof <| Next (Normal element) nextStep


add : Element -> Zipper -> Zipper
add element zipper =
    { zipper | steps = addStep element zipper.steps }


edit : String -> Zipper -> Zipper
edit value zipper =
    { zipper | steps = editStep value zipper.steps }


delete : Zipper -> Zipper
delete zipper =
    case goUp zipper of
        Nothing ->
            case goOutContradiction zipper of
                Nothing ->
                    case goDown zipper of
                        Nothing ->
                            create ""

                        Just child ->
                            { child | breadcrumbs = [] }

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
                    Debug.log "WTF2"
                        { parent | steps = Next (getProofTypeFromSteps parent.steps) nextStep }
