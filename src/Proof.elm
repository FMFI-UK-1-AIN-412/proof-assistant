module Proof
    exposing
        ( DropdownStates(..)
        , Element
        , GUI
        , ProofType(..)
        , Steps(..)
        , addStep
        , createElement
        , dropdownStates
        , editStep
        , getElementFromSteps
        , getProofTypeFromSteps
        , setElementInSteps
        , setProofTypeInSteps
        )

import Bootstrap.Dropdown as Dropdown
import Formula
import Matcher
import Parser exposing (Parser)


-- Element


type DropdownStates
    = NormalState
    | PremisState


dropdownStates =
    [ NormalState, PremisState ]


type alias GUI =
    { showButtons : Bool
    , dropdown : Dropdown.State
    }


type alias Element =
    { value : String
    , formula : Result Parser.Error Formula.Formula
    , dropdownType : DropdownStates
    , gui : GUI
    }


createElement : String -> Element
createElement string =
    { value = string
    , formula = Formula.parse string
    , dropdownType = NormalState
    , gui = { showButtons = False, dropdown = Dropdown.initialState }
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

        Next _ nextSteps ->
            Next proofType nextSteps
