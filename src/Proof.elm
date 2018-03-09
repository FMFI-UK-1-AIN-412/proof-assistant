module Proof
    exposing
        ( Element
        , GUI
        , NodeType(..)
        , ProofType(..)
        , Steps(..)
        , addStep
        , changeValue
        , createElement
        , getElementFromProofType
        , getElementFromSteps
        , getProofTypeFromSteps
        , setElementInSteps
        , setProofTypeInSteps
        )

import Bootstrap.Dropdown as Dropdown
import Formula
import Parser exposing (Parser)


type NodeType
    = Premis
    | NormalNode


type alias GUI =
    { showButtons : Bool
    }


type alias Element =
    { value : String
    , formula : Result Parser.Error Formula.Formula
    , gui : GUI
    , nodeType : NodeType
    }


createElement : String -> Element
createElement string =
    { value = string
    , formula = Formula.parse string
    , gui = { showButtons = False }
    , nodeType = NormalNode
    }


changeValue : String -> Element -> Element
changeValue string element =
    { element | value = string, formula = Formula.parse string }



-- Steps & ProofTypes


type Steps
    = Last ProofType
    | Next ProofType Steps
    | Cases Steps Steps


type ProofType
    = Normal Element
    | Contradiction Element Steps


addStep : Element -> Steps -> Steps
addStep element steps =
    case steps of
        Last proof ->
            Next proof <| Last <| Normal element

        Next proof nextStep ->
            Next proof <| Next (Normal element) nextStep

        Cases _ _ ->
            steps


getElementFromProofType : ProofType -> Element
getElementFromProofType proofType =
    case proofType of
        Normal element ->
            element

        Contradiction element _ ->
            element


setElementInProofType : Element -> ProofType -> ProofType
setElementInProofType element proofType =
    case proofType of
        Normal _ ->
            Normal element

        Contradiction _ steps ->
            Contradiction element steps


getElementFromSteps : Steps -> Maybe Element
getElementFromSteps steps =
    case getProofTypeFromSteps steps of
        Nothing ->
            Nothing

        Just proofType ->
            Just <| getElementFromProofType proofType


setElementInSteps : Element -> Steps -> Maybe Steps
setElementInSteps element steps =
    let
        callback : ProofType -> Maybe Steps
        callback proofType =
            Just <|
                setProofTypeInSteps
                    (setElementInProofType element <| proofType)
                    steps
    in
    getProofTypeFromSteps steps |> Maybe.andThen callback


getProofTypeFromSteps : Steps -> Maybe ProofType
getProofTypeFromSteps steps =
    case steps of
        Last proofType ->
            Just proofType

        Next proofType _ ->
            Just proofType

        Cases _ _ ->
            Nothing


setProofTypeInSteps : ProofType -> Steps -> Steps
setProofTypeInSteps proofType steps =
    case steps of
        Last _ ->
            Last proofType

        Next _ nextSteps ->
            Next proofType nextSteps

        Cases _ _ ->
            steps
