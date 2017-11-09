module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Json.Decode as Decode


type Node a
    = Node String (List (Node a))


type alias Model a =
    { tree : Node a }


type Msg
    = Add
    | Change String


initialModel : Model a
initialModel =
    { tree =
        Node
            "/"
            [ Node
                "var/"
                []
            , Node
                "home/"
                [ Node "zoli/" []
                , Node "alex/" []
                , Node "viki/" []
                , Node "roman/" []
                ]
            ]
    }


getWidth : Int -> Float
getWidth n =
    100 / (toFloat n)


printNode : Node a -> String -> Float -> Html Msg
printNode (Node str others) level width =
    div
        [ style
            [ ( "width", (toString width) ++ "%" )
            , ( "float", "left" )
            , ( "box-sizing", "border-box" )
            ]
        ]
        [ displayOne str
        , button
            [ style [ ( "width", "10%" ) ]
            , onClick Add
            ]
            [ text "+" ]
        , div
            []
            (List.map
                (\val ->
                    printNode val str (getWidth (List.length others))
                )
                others
            )
        ]


nodeToString : Node a -> String
nodeToString (Node str others) =
    case others of
        [] ->
            str

        _ ->
            let
                otherStrings =
                    List.map nodeToString others

                answer =
                    String.join "|" otherStrings
            in
                str ++ "(" ++ answer ++ ")"


displayOne : String -> Html a
displayOne str =
    input
        [ value str
        , style
            [ ( "width", "90%" )
            , ( "box-sizing", "border-box" )
            ]
        ]
        []


view : Model a -> Html Msg
view model =
    div []
        [ printNode model.tree "" 100
        , text (nodeToString model.tree)
        ]


update : Msg -> Model a -> ( Model a, Cmd Msg )
update msg model =
    case msg of
        -- todo
        Add ->
            ( model, Cmd.none )

        -- todo
        Change str ->
            ( model, Cmd.none )


subscriptions : Model a -> Sub Msg
subscriptions model =
    Sub.none


main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = subscriptions
        }
