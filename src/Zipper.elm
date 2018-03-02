module Zipper
    exposing
        ( ProofStep(..)
        , Zipper
        , add
        , changeShowButtons
        , create
        , createElement
        , createPremis
        , delete
        , edit
        , getEmptyError
        , getError
        , getShowButtons
        , getValue
        , getVyplyvanieErrors
        , goContradiction
        , goDown
        , goDownOrStop
        , goRoot
        , goUp
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


createPremis : String -> Element
createPremis string =
    { value = string, formula = Formula.parse string, isPremis = True, showButton = False }


createElement : String -> Element
createElement string =
    { value = string, formula = Formula.parse string, isPremis = False, showButton = False }


getError : Zipper -> Maybe String
getError zipper =
    case (getElementFromProof zipper.proof).formula of
        Ok _ ->
            Nothing

        Err error ->
            Just <| "Parsing failed: " ++ toString error


getEmptyError : Zipper -> Maybe String
getEmptyError zipper =
    if (getElementFromProof zipper.proof).value == "" then
        Just "Input should not be empty."
    else
        Nothing


previousFormulas : Zipper -> List Formula.Formula
previousFormulas zipper =
    case goUp zipper of
        Nothing ->
            []

        Just newZipper ->
            previousFormulasTmp newZipper


previousFormulasTmp : Zipper -> List Formula.Formula
previousFormulasTmp zipper =
    let
        this =
            case (getElementFromProof zipper.proof).formula of
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
    case (getElementFromProof zipper.proof).formula of
        Ok formula ->
            Matcher.isOk formula (previousFormulas zipper)

        Err str ->
            Just <| toString str


getValue : Zipper -> String
getValue zipper =
    (getElementFromProof zipper.proof).value


changeShowButtons : Bool -> Zipper -> Zipper
changeShowButtons bool zipper =
    let
        old_element =
            getElementFromProof zipper.proof

        element =
            { old_element | showButton = bool }
    in
    { zipper | proof = setProofElement element zipper.proof }


getShowButtons : Zipper -> Bool
getShowButtons zipper =
    (getElementFromProof zipper.proof).showButton


type ProofStep
    = LastStep Element
    | NextStep Element ProofStep
    | LastStepContradiction Element ProofStep
    | NextStepContradiction Element ProofStep ProofStep


getElementFromProof : ProofStep -> Element
getElementFromProof proof =
    case proof of
        LastStep element ->
            element

        NextStep element _ ->
            element

        LastStepContradiction element _ ->
            element

        NextStepContradiction element _ _ ->
            element


toggleContradiction : Zipper -> Zipper
toggleContradiction zipper =
    let
        newProof =
            case zipper.proof of
                NextStep element nextStep ->
                    NextStepContradiction element nextStep (LastStep <| createElement "prove here")

                NextStepContradiction element nextStep contradiction ->
                    NextStep element nextStep

                LastStep element ->
                    LastStepContradiction element (LastStep <| createElement "prove here")

                LastStepContradiction element _ ->
                    LastStep element
    in
    { zipper | proof = newProof }


type Breadcrumb
    = NextStepBreadCrumb Element
    | SkipContradictionBreadCrumb Element ProofStep
    | GoNextStepContradictionBreadCrumb Element ProofStep
    | GoLastStepContradictionBreadCrumb Element


type alias Zipper =
    { proof : ProofStep, breadcrumbs : List Breadcrumb }


create : String -> Zipper
create value =
    { proof = LastStep <| createElement value, breadcrumbs = [] }


goDown : Zipper -> Maybe Zipper
goDown zipper =
    case zipper.proof of
        LastStep _ ->
            Nothing

        NextStep element nextStep ->
            let
                breadcrumb =
                    NextStepBreadCrumb element

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | proof = nextStep, breadcrumbs = breadcrumbs }

        LastStepContradiction _ _ ->
            Nothing

        NextStepContradiction element nextStep contradiction ->
            let
                breadcrumb =
                    SkipContradictionBreadCrumb element contradiction

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            Just { zipper | proof = nextStep, breadcrumbs = breadcrumbs }


goContradiction : Zipper -> Zipper
goContradiction zipper =
    case zipper.proof of
        LastStep _ ->
            zipper

        NextStep _ _ ->
            zipper

        LastStepContradiction element contradiction ->
            let
                breadcrumb =
                    GoLastStepContradictionBreadCrumb element

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            { zipper | proof = contradiction, breadcrumbs = breadcrumbs }

        NextStepContradiction element nextStep contradiction ->
            let
                breadcrumb =
                    GoNextStepContradictionBreadCrumb element nextStep

                breadcrumbs =
                    breadcrumb :: zipper.breadcrumbs
            in
            { zipper | proof = contradiction, breadcrumbs = breadcrumbs }


goDownOrStop : Zipper -> Zipper
goDownOrStop zipper =
    Maybe.withDefault zipper (goDown zipper)


goUp : Zipper -> Maybe Zipper
goUp zipper =
    case zipper.breadcrumbs of
        [] ->
            Nothing

        head :: tail ->
            case head of
                NextStepBreadCrumb element ->
                    let
                        newProof =
                            NextStep element zipper.proof
                    in
                    Just { proof = newProof, breadcrumbs = tail }

                SkipContradictionBreadCrumb element contradiction ->
                    let
                        newProof =
                            NextStepContradiction element zipper.proof contradiction
                    in
                    Just { proof = newProof, breadcrumbs = tail }

                GoLastStepContradictionBreadCrumb element ->
                    let
                        newProof =
                            LastStepContradiction element zipper.proof
                    in
                    Just { proof = newProof, breadcrumbs = tail }

                GoNextStepContradictionBreadCrumb element nextStep ->
                    let
                        newProof =
                            NextStepContradiction element nextStep zipper.proof
                    in
                    Just { proof = newProof, breadcrumbs = tail }


goRoot : Zipper -> Zipper
goRoot zipper =
    case goUp zipper of
        Nothing ->
            zipper

        Just newZipper ->
            goRoot newZipper


setProofElement : Element -> ProofStep -> ProofStep
setProofElement element proof =
    case proof of
        LastStep _ ->
            LastStep element

        NextStep _ nextProof ->
            NextStep element nextProof

        NextStepContradiction _ nextProof contradiction ->
            NextStepContradiction element nextProof contradiction

        LastStepContradiction _ contradiction ->
            LastStepContradiction element contradiction


editProofValue : String -> ProofStep -> ProofStep
editProofValue value proof =
    let
        element =
            getElementFromProof proof

        newElement =
            { element | value = value, formula = Formula.parse value }
    in
    setProofElement newElement proof


addToProof : Element -> ProofStep -> ProofStep
addToProof element proof =
    case proof of
        LastStep previousElement ->
            NextStep previousElement <| LastStep element

        NextStep previousElement nextProof ->
            NextStep previousElement <| NextStep element nextProof

        LastStepContradiction previousElement contradiction ->
            NextStepContradiction previousElement (LastStep element) contradiction

        NextStepContradiction previousElement nextProof contradiction ->
            NextStepContradiction previousElement (NextStep element nextProof) contradiction


add : Element -> Zipper -> Zipper
add element zipper =
    { zipper | proof = addToProof element zipper.proof }


edit : String -> Zipper -> Zipper
edit value zipper =
    { zipper | proof = editProofValue value zipper.proof }


delete : Zipper -> Zipper
delete zipper =
    case goUp zipper of
        Nothing ->
            case goDown zipper of
                Nothing ->
                    create ""

                Just child ->
                    { child | breadcrumbs = zipper.breadcrumbs }

        Just parent ->
            case zipper.proof of
                LastStep _ ->
                    case parent.proof of
                        LastStep _ ->
                            -- this cannot happen
                            Debug.crash "WTF1?" zipper

                        NextStep _ _ ->
                            { parent | proof = LastStep <| getElementFromProof parent.proof }

                        LastStepContradiction element contradiction ->
                            -- this cannot happen
                            Debug.crash "WTF2?"
                                zipper

                        NextStepContradiction element nextStep contradiction ->
                            { parent | proof = NextStepContradiction element nextStep (LastStep <| createElement "prove here") }

                NextStep _ nextProof ->
                    case parent.proof of
                        LastStep _ ->
                            -- this cannot happen
                            Debug.crash "WTF3?" zipper

                        NextStep _ _ ->
                            { parent | proof = NextStep (getElementFromProof parent.proof) nextProof }

                        LastStepContradiction _ _ ->
                            -- this cannot happen
                            Debug.crash "WTF4?" zipper

                        NextStepContradiction element nextStep contradiction ->
                            { parent | proof = NextStepContradiction element nextStep nextProof }

                LastStepContradiction _ contradiction ->
                    Debug.log "WTF5"
                        { parent | proof = LastStep <| getElementFromProof parent.proof }

                NextStepContradiction _ nextProof contradiction ->
                    Debug.log "WTF6"
                        { parent | proof = NextStep (getElementFromProof parent.proof) nextProof }
