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

                Generalization str proof ->
                    ( "generalization"
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
                FormulaNode explanation data next ->
                    ( "formulaNode"
                    , [ ( "expl", object <| jsonExpl explanation )
                      , ( "data", object <| jsonFormulaStep data )
                      , ( "next", jsonMaybeProof next )
                      ]
                    )

                CasesNode case1 next1 case2 next2 ->
                    ( "casesNode"
                    , [ ( "case1", object <| jsonFormulaStep case1 )
                      , ( "next1", jsonMaybeProof next1 )
                      , ( "case2", object <| jsonFormulaStep case2 )
                      , ( "next2", jsonMaybeProof next2 )
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
