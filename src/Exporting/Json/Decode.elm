module Exporting.Json.Decode exposing (decode)

import Json.Decode exposing (..)
import Core.Proof as Proof
import Core.Types exposing (..)


createFormulaStepForDecoder text =
    let
        data =
            Proof.createFormulaStep text
    in
    { data | gui = { showButtons = False, collapsed = False } }


formulaStepDecoder : Decoder FormulaStep
formulaStepDecoder =
    map createFormulaStepForDecoder
        (field "text" string)


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

        "generalization" ->
            map2 Generalization
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
    map3 FormulaNode
        (field "expl" <| lazy (\_ -> explDecoder))
        (field "data" <| lazy (\_ -> formulaStepDecoder))
        (maybe <| field "next" (lazy (\_ -> proofDecoder)))


casesNodeDecoder : Decoder Proof
casesNodeDecoder =
    map4 CasesNode
        (field "case1" formulaStepDecoder)
        (maybe <| field "next1" (lazy (\_ -> proofDecoder)))
        (field "case2" formulaStepDecoder)
        (maybe <| field "next2" (lazy (\_ -> proofDecoder)))


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
