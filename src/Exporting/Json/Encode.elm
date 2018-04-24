module Exporting.Json.Encode exposing (encode, jsonDataUri)

import Http
import Json.Encode exposing (..)
import Proof
import Types exposing (..)


jsonDataUri : String -> String
jsonDataUri data =
    "data:application/json;charset=utf-8," ++ Http.encodeUri data


jsonFormulaStep : FormulaStep -> List ( String, Value )
jsonFormulaStep data =
    [ ( "text", string data.text )
    , ( "next", jsonMaybeProof data.next )
    ]


jsonExpl : Explanation -> List ( String, Value )
jsonExpl explanation =
    let
        ( type_, children ) =
            case explanation of
                Premise ->
                    ( "premise", [] )

                Rule _ ->
                    ( "rule", [] )

                Goal proof ->
                    ( "goal", [ ( "proof", jsonMaybeProof proof ) ] )

                Contradiction proof ->
                    ( "contradiction", [ ( "proof", jsonMaybeProof proof ) ] )

                AddUniversalQuantifier str proof ->
                    ( "addUniversal"
                    , ( "freeVariableName", string str )
                        :: [ ( "proof", jsonMaybeProof proof ) ]
                    )
    in
    ( "type", string type_ ) :: children


jsonMaybeProof : Maybe Proof -> Value
jsonMaybeProof maybeProof =
    case maybeProof of
        Just proof ->
            object <| jsonProofList proof

        Nothing ->
            null


jsonProofList : Proof -> List ( String, Value )
jsonProofList proof =
    let
        ( type_, children ) =
            case proof of
                FormulaNode explanation data ->
                    ( "formulaNode"
                    , [ ( "expl", object <| jsonExpl explanation )
                      , ( "data", object <| jsonFormulaStep data )
                      ]
                    )

                CasesNode case1 case2 ->
                    ( "casesNode"
                    , [ ( "case1", object <| jsonFormulaStep case1 )
                      , ( "case2", object <| jsonFormulaStep case2 )
                      ]
                    )
    in
    ( "type", string type_ ) :: children


jsonProof : Proof -> Value
jsonProof proof =
    object <| jsonProofList <| proof


encode : Int -> Proof -> String
encode indentation proof =
    Json.Encode.encode indentation (jsonProof proof) ++ "\n"
