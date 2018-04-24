module Exporting.Json.Decode exposing (decode)

import Json.Decode exposing (..)
import Proof
import Types exposing (..)


createFormulaStepForDecoder text next =
    let
        data =
            Proof.createFormulaStep text
    in
    { data | next = next, gui = { showButtons = False, collapsed = False } }


formulaStepDecoder : Decoder FormulaStep
formulaStepDecoder =
    map2 createFormulaStepForDecoder
        (field "text" string)
        (maybe <| field "next" (lazy (\_ -> proofDecoder)))


explanationTypeDecoder type_ =
    case type_ of
        "premise" ->
            succeed Premise

        "rule" ->
            succeed <| Rule Nothing

        "goal" ->
            map Goal
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        "contradiction" ->
            map Contradiction
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        "addUniversal" ->
            map2 AddUniversalQuantifier
                (field "freeVariableName" string)
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        _ ->
            fail ("'" ++ type_ ++ "' is not a correct node type")


explDecoder : Decoder Explanation
explDecoder =
    lazy
        (\_ ->
            field "type" string
                |> andThen explanationTypeDecoder
        )


formulaNodeDecoder : Decoder Proof
formulaNodeDecoder =
    map2 FormulaNode
        (field "expl" <| lazy (\_ -> explDecoder))
        (field "data" <| lazy (\_ -> formulaStepDecoder))


casesNodeDecoder : Decoder Proof
casesNodeDecoder =
    map2 CasesNode
        (field "case1" formulaStepDecoder)
        (field "case2" formulaStepDecoder)


proofTypeDecoder type_ =
    case type_ of
        "formulaNode" ->
            formulaNodeDecoder

        "casesNode" ->
            casesNodeDecoder

        _ ->
            fail ("'" ++ type_ ++ "' is not a correct node type")


proofDecoder : Decoder Proof
proofDecoder =
    lazy
        (\_ ->
            field "type" string
                |> andThen proofTypeDecoder
        )


decode : String -> Result String Proof
decode data =
    decodeString proofDecoder data
