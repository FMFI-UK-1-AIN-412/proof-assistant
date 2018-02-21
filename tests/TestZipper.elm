module TestZipper exposing (..)

import Expect exposing (Expectation)
import Fuzz exposing (Fuzzer, int, list, string)
import Test exposing (..)
import Zipper


zipper : Zipper.Zipper
zipper =
    Zipper.Empty
        |> Zipper.add (Zipper.createElement "Element")
        |> Zipper.add (Zipper.createElement "Successor 0")
        |> Zipper.add (Zipper.createElement "Successor 1")
        |> Zipper.add (Zipper.createElement "Successor 2")


testZipperValue : Zipper.Zipper -> Maybe String -> Expectation
testZipperValue zipper value =
    Expect.equal value (Zipper.getValue zipper)


testSuccessor : Zipper.Zipper -> Int -> Expectation
testSuccessor zipper index =
    testZipperValue
        (Zipper.goDown index zipper)
        (Just <| "Successor " ++ toString index)


testParent : Zipper.Zipper -> Maybe String -> Expectation
testParent zipper value =
    testZipperValue
        (Zipper.goUp zipper)
        value


suite : Test
suite =
    describe "Test Zipper module"
        [ test "Test empty zipper" <|
            \_ -> testZipperValue Zipper.Empty Nothing
        , test "Test zipper one element" <|
            \_ -> testZipperValue zipper (Just "Element")
        , describe "Test goDown"
            [ test "Test 0th successor" <| \_ -> testSuccessor zipper 0
            , test "Test 1st successor" <| \_ -> testSuccessor zipper 1
            , test "Test 2nd successor" <| \_ -> testSuccessor zipper 2
            ]
        , describe "Test goUp"
            [ test "Test missing parent" <| \_ -> testParent zipper Nothing
            , test "Test parent value" <| \_ -> testParent (Zipper.goDown 0 zipper) (Just "Element")
            ]
        ]



--todo: test goRoot
