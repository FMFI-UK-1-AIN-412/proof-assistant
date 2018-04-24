module Exporting.Json.Decode exposing (decode)

import Json.Decode exposing (..)
import Proof


formulaStepDecoder : Decoder Proof.FormulaStep
formulaStepDecoder =
    map2 Proof.createFormulaStepForDecoder
        (field "text" string)
        (maybe <| field "next" (lazy (\_ -> proofDecoder)))


explanationTypeDecoder type_ =
    case type_ of
        "premise" ->
            succeed Proof.Premise

        "rule" ->
            succeed <| Proof.Rule Nothing

        "goal" ->
            map Proof.Goal
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        "contradiction" ->
            map Proof.Contradiction
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        "addUniversal" ->
            map2 Proof.AddUniversalQuantifier
                (field "freeVariableName" string)
                (field "proof" <| maybe <| lazy (\_ -> proofDecoder))

        _ ->
            fail ("'" ++ type_ ++ "' is not a correct node type")


explDecoder : Decoder Proof.Explanation
explDecoder =
    lazy
        (\_ ->
            field "type" string
                |> andThen explanationTypeDecoder
        )


formulaNodeDecoder : Decoder Proof.Proof
formulaNodeDecoder =
    map2 Proof.FormulaNode
        (field "expl" <| lazy (\_ -> explDecoder))
        (field "data" <| lazy (\_ -> formulaStepDecoder))


casesNodeDecoder : Decoder Proof.Proof
casesNodeDecoder =
    map2 Proof.CasesNode
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


proofDecoder : Decoder Proof.Proof
proofDecoder =
    lazy
        (\_ ->
            field "type" string
                |> andThen proofTypeDecoder
        )


decode : String -> Result String Proof.Proof
decode data =
    decodeString proofDecoder data
