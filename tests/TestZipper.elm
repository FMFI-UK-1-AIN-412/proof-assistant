module TestZipper exposing (..)

import Expect exposing (Expectation)
import Test exposing (..)
import Zipper


zipper : Zipper.Zipper
zipper =
    Zipper.create "element_one"
        |> Zipper.add (Zipper.createElement "element_two")
        |> Zipper.downOrStop
        |> Zipper.add (Zipper.createElement "element_three")
        |> Zipper.root


zipperElement2 =
    Zipper.down zipper


testZipperValue : Zipper.Zipper -> String -> Expectation
testZipperValue zipper value =
    Expect.equal value (Zipper.getValue zipper)


testGoDown =
    describe "Test down"
        [ test "once " <| \_ -> testZipperValue (zipper |> Zipper.downOrStop) "element_two"
        , test "twice" <| \_ -> testZipperValue (zipper |> Zipper.downOrStop |> Zipper.downOrStop) "element_three"
        ]


testDeleteFrom actual expected =
    Expect.equal (Zipper.root actual) (Zipper.root expected)


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
                    (zipper |> Zipper.downOrStop |> Zipper.delete)
                    (Zipper.create "element_one" |> Zipper.add (Zipper.createElement "element_three"))
        , test "leaf" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.downOrStop |> Zipper.downOrStop |> Zipper.delete)
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
                        |> Zipper.enterContradictionOrStop
                        |> Zipper.edit "something new"
                        |> Zipper.delete
                    )
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.enterContradictionOrStop
                        |> Zipper.edit "prove here"
                    )
        , test "delete one node inside contradiction" <|
            \_ ->
                testDeleteFrom
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.enterContradictionOrStop
                        |> Zipper.add (Zipper.createElement "manually created node")
                        |> Zipper.delete
                    )
                    (zipper
                        |> Zipper.toggleContradiction
                        |> Zipper.enterContradictionOrStop
                        |> Zipper.edit "manually created node"
                    )
        ]
