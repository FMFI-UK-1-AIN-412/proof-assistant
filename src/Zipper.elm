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
        , getError
        , getShowButtons
        , getValue
        , getVyplyvanieErrors
        , goDown
        , goDownOrStop
        , goRoot
        , goUp
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


getElementFromProof : ProofStep -> Element
getElementFromProof proof =
    case proof of
        LastStep element ->
            element

        NextStep element _ ->
            element


type Breadcrumb
    = NextStepBreadCrumb Element


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
                    { parent | proof = LastStep <| getElementFromProof parent.proof }

                NextStep _ nextProof ->
                    { parent | proof = NextStep (getElementFromProof parent.proof) nextProof }
