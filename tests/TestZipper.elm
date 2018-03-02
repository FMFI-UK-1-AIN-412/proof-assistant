module TestZipper exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)
import Zipper


zipper : Zipper.Zipper
zipper =
    Zipper.create "element_one"
        |> Zipper.add (Zipper.createElement "element_two")
        |> Zipper.goDownOrStop
        |> Zipper.add (Zipper.createElement "element_three")
        |> Zipper.goRoot


zipperElement2 =
    Zipper.goDown zipper


testZipperValue : Zipper.Zipper -> String -> Expectation
testZipperValue zipper value =
    Expect.equal value (Zipper.getValue zipper)


testGoDown =
    describe "Test goDown"
        [ test "once " <| \_ -> testZipperValue (zipper |> Zipper.goDownOrStop) "element_two"
        , test "twice" <| \_ -> testZipperValue (zipper |> Zipper.goDownOrStop |> Zipper.goDownOrStop) "element_three"
        ]


testDeleteFrom actual expected =
    Expect.equal (Zipper.goRoot actual) (Zipper.goRoot expected)


testDelete =
    describe "Test delete"
        [ test "parent" <|
            \_ ->
                testDeleteFrom
                    (Zipper.delete zipper)
                    (Zipper.create "element_two" |> Zipper.add (Zipper.createElement "element_three"))
        , test "step" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.goDownOrStop |> Zipper.delete)
                    (Zipper.create "element_one" |> Zipper.add (Zipper.createElement "element_three"))
        , test "leaf" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.goDownOrStop |> Zipper.goDownOrStop |> Zipper.delete)
                    (Zipper.create "element_one" |> Zipper.add (Zipper.createElement "element_two"))
        , test "delete contradiction node" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.toggleContradiction |> Zipper.delete)
                    (Zipper.create "element_two" |> Zipper.add (Zipper.createElement "element_three"))
        , test "delete the last node inside contradiction" <|
            \_ ->
                testDeleteFrom
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "something new"
                        |> Zipper.delete
                    )
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "prove here"
                    )
        , test "delete one node inside contradiction" <|
            \_ ->
                testDeleteFrom
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.add (Zipper.createElement "manually created node")
                        |> Zipper.delete
                    )
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "manually created node"
                    )
        , test "delete one node inside contradiction inside contradiction" <|
            \_ ->
                testDeleteFrom
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "something new"
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "something even newer"
                        |> Zipper.delete
                    )
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.goContradiction
                        |> Zipper.edit "something new"
                    )
        ]
