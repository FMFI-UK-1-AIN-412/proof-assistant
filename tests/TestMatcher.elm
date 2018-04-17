module TestMatcher exposing (..)

import Expect exposing (Expectation)
import Formula
import Fuzz exposing (Fuzzer, int, list, string)
import Matcher
import Test exposing (..)


testMatcher function isValid fromString toProveString =
    case ( Formula.parse fromString, Formula.parse toProveString ) of
        ( Ok from, Ok toProve ) ->
            let
                answer =
                    function from toProve

                prefix =
                    "Formula " ++ toProveString ++ " was "

                suffix =
                    " to be matched from formula " ++ fromString
            in
            if isValid then
                Expect.true (prefix ++ "SUPPOSED" ++ suffix) answer
            else
                Expect.false (prefix ++ "NOT SUPPOSED" ++ suffix) answer

        _ ->
            Expect.fail "Could not parse formulas"


testMatcherRemoveForall isValid fromString toProveString =
    testMatcher Matcher.matcherRemoveUniversalQuantifier isValid fromString toProveString


testMatcherAddExistential isValid fromString toProveString =
    testMatcher Matcher.matcherAddExistentialQuantifier isValid fromString toProveString


testRemoveForallMatcher : Test
testRemoveForallMatcher =
    describe "Test Remove \\Forall Matcher "
        [ test "test1" <| \_ -> testMatcherRemoveForall True "\\forall x P(x)" "P(t)"
        , test "test2" <| \_ -> testMatcherRemoveForall True "\\forall x P(x, x)" "P(t, t)"
        , test "test3" <| \_ -> testMatcherRemoveForall False "\\forall x P(x, x)" "P(t1, t2)"
        , test "test4" <| \_ -> testMatcherRemoveForall True "\\forall x P(R(x), x)" "P(R(t1), t1)"
        , test "test5" <| \_ -> testMatcherRemoveForall True "\\forall x P(R(x), x)" "P(R(Q(t1, t2)), Q(t1, t2))"
        ]


testAddExistsMatcher : Test
testAddExistsMatcher =
    describe "Test Add \\Exists Matcher "
        [ test "test1" <| \_ -> testMatcherAddExistential True "P(t)" "\\exists x P(x)"
        , test "test2" <| \_ -> testMatcherAddExistential True "P(t, t)" "\\exists x P(x, x)"
        , test "test3" <| \_ -> testMatcherAddExistential False "P(t1, t2)" "\\exists x P(x, x)"
        , test "test4" <| \_ -> testMatcherAddExistential True "P(R(t1), t1)" "\\exists x P(R(x), x)"
        , test "test5" <| \_ -> testMatcherAddExistential True "P(R(Q(t1, t2)), Q(t1, t2))" "\\exists x P(R(x), x)"
        ]


testMatcherRemoveExistential isValid fromString toProveString freeVariables =
    case ( Formula.parse fromString, Formula.parse toProveString ) of
        ( Ok from, Ok toProve ) ->
            let
                answer =
                    Matcher.matcherRemoveExistentialQuantifier from toProve freeVariables

                prefix =
                    "Formula " ++ toProveString ++ " was "

                suffix =
                    " to be matched from formula " ++ fromString
            in
            if isValid then
                Expect.true (prefix ++ "SUPPOSED" ++ suffix) answer
            else
                Expect.false (prefix ++ "NOT SUPPOSED" ++ suffix) answer

        _ ->
            Expect.fail "Could not parse formulas"


testRemoveExistentialMatcher : Test
testRemoveExistentialMatcher =
    describe "Test Remove \\Exists Matcher "
        [ test "test1" <| \_ -> testMatcherRemoveExistential True "\\exists x P(x)" "P(t)" []
        , test "test2" <| \_ -> testMatcherRemoveExistential False "\\exists x P(x)" "P(t)" [ "t" ]
        ]
