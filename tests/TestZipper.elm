module TestZipper exposing (..)

import Expect exposing (Expectation)
import Proof
import Test exposing (..)
import Zipper


zipper : Zipper.Zipper
zipper =
    Zipper.create "element_one"
        |> Zipper.add (Proof.createElement "element_two")
        |> Zipper.downOrStop
        |> Zipper.add (Proof.createElement "element_three")
        |> Zipper.root


zipperElement2 =
    Zipper.down zipper


editValue : String -> Zipper.Zipper -> Zipper.Zipper
editValue value zipper =
    case Zipper.getElement zipper of
        Nothing ->
            zipper

        Just element ->
            let
                newElement =
                    { element | value = value }
            in
            Zipper.edit newElement zipper


testZipperValue : Zipper.Zipper -> String -> Expectation
testZipperValue zipper value =
    case Zipper.getElement zipper of
        Nothing ->
            Expect.fail "cannot call testZipperValue on cases node"

        Just element ->
            Expect.equal value element.value


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
                    (Zipper.create "element_two" |> Zipper.add (Proof.createElement "element_three"))
        , test "step" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.downOrStop |> Zipper.delete)
                    (Zipper.create "element_one" |> Zipper.add (Proof.createElement "element_three"))
        , test "leaf" <|
            \_ ->
                testDeleteFrom
                    (zipper |> Zipper.downOrStop |> Zipper.downOrStop |> Zipper.delete)
                    (Zipper.create "element_one" |> Zipper.add (Proof.createElement "element_two"))

        --, test "delete contradiction node" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper |> Zipper.toggleContradiction |> Zipper.delete)
        --            (Zipper.create "element_two" |> Zipper.add (Proof.createElement "element_three"))
        --, test "delete the last node inside contradiction" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.toggleContradiction
        --                |> Zipper.enterContradictionOrStop
        --                |> editValue "something new"
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.toggleContradiction
        --                |> Zipper.enterContradictionOrStop
        --                |> editValue ""
        --            )
        --, test "delete one node inside contradiction" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.toggleContradiction
        --                |> Zipper.enterContradictionOrStop
        --                |> Zipper.add (Proof.createElement "manually created node")
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.toggleContradiction
        --                |> Zipper.enterContradictionOrStop
        --                |> editValue "manually created node"
        --            )
        --, test "delete node in case1 which has no children" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase1OrStop
        --                |> editValue "something"
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --            )
        --, test "delete node in case2 which has no children" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase2OrStop
        --                |> editValue "something"
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --            )
        --, test "delete node in case1 which has children" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase1OrStop
        --                |> editValue "something"
        --                |> Zipper.add (Proof.createElement "child")
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase1OrStop
        --                |> editValue "child"
        --            )
        --, test "delete node in case2 which has children" <|
        --    \_ ->
        --        testDeleteFrom
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase2OrStop
        --                |> editValue "something"
        --                |> Zipper.add (Proof.createElement "child")
        --                |> Zipper.delete
        --            )
        --            (zipper
        --                |> Zipper.addCasesOrStop
        --                |> Zipper.enterCase2OrStop
        --                |> editValue "child"
        --            )
        ]
