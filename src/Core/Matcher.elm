module Matcher
    exposing
        ( BinaryMatcher
        , NullaryMatcher
        , UnaryMatcher
        , matcherAddExistentialQuantifier
        , matcherAddition
        , matcherAxiom1
        , matcherConjunction
        , matcherConstructiveDilemma
        , matcherDestructiveDilemma
        , matcherDisjunctiveSyllogism
        , matcherDoubleNegation
        , matcherGrimaldi1
        , matcherGrimaldi2
        , matcherHypotheticalSyllogism
        , matcherImplicationRemoval
        , matcherModusPonens
        , matcherModusTolens
        , matcherRemoveExistentialQuantifier
        , matcherRemoveUniversalQuantifier
        , matcherSameFormula
        , matcherSimplification
        )

import Dict
import Formula


type alias NullaryMatcher =
    Formula.Formula -> Bool


type alias UnaryMatcher =
    Formula.Formula -> Formula.Formula -> Bool


type alias BinaryMatcher =
    Formula.Formula -> Formula.Formula -> Formula.Formula -> Bool


matcherAxiom1 : NullaryMatcher
matcherAxiom1 toProve =
    -- (p->(q->p))
    case toProve of
        Formula.Impl p1 (Formula.Impl _ p2) ->
            p1 == p2

        _ ->
            False


matcherSameFormula : UnaryMatcher
matcherSameFormula from toProve =
    from == toProve


matcherDoubleNegation : UnaryMatcher
matcherDoubleNegation from toProve =
    -- (--a) <=> a
    case from of
        Formula.Neg (Formula.Neg a) ->
            toProve == a

        _ ->
            False


matcherImplicationRemoval : UnaryMatcher
matcherImplicationRemoval from toProve =
    -- (a->b) <=> (-a->b)
    case ( from, toProve ) of
        ( Formula.Impl a1 b1, Formula.Disj (Formula.Neg a2) b2 ) ->
            a1 == a2 && b1 == b2

        _ ->
            False


matcherAddition : UnaryMatcher
matcherAddition from toProve =
    -- a => (a|b)
    case toProve of
        Formula.Disj a b ->
            (from == a) || (from == b)

        _ ->
            False


matcherSimplification : UnaryMatcher
matcherSimplification from toProve =
    -- (a & b) => (a) | (b)
    case from of
        Formula.Conj a b ->
            (toProve == a) || (toProve == b)

        _ ->
            False



-- tmp


getTerms : Formula.Formula -> List Formula.Term
getTerms formula =
    case formula of
        Formula.Atom str terms ->
            terms

        Formula.Neg form ->
            getTerms form

        Formula.Disj form1 form2 ->
            getTerms form1 ++ getTerms form2

        Formula.Conj form1 form2 ->
            getTerms form1 ++ getTerms form2

        Formula.Impl form1 form2 ->
            getTerms form1 ++ getTerms form2

        Formula.ForAll _ form ->
            getTerms form

        Formula.Exists _ form ->
            getTerms form

        Formula.FF ->
            []

        Formula.FT ->
            []


firstOrderMatcherHelper : String -> Formula.Formula -> Formula.Formula -> Bool
firstOrderMatcherHelper var rest toProve =
    let
        substitutions =
            List.map (\elem -> Dict.fromList [ ( var, elem ) ]) (getTerms toProve)

        afterSubstitution =
            List.map (\elem -> Formula.substitute elem rest) substitutions

        equal other =
            case other of
                Err _ ->
                    False

                Ok subsituted ->
                    subsituted == toProve
    in
    List.any equal afterSubstitution


matcherRemoveUniversalQuantifier : UnaryMatcher
matcherRemoveUniversalQuantifier from toProve =
    -- \forall x P(x) => P(t)
    case from of
        Formula.ForAll var rest ->
            firstOrderMatcherHelper var rest toProve

        _ ->
            False


matcherAddExistentialQuantifier : UnaryMatcher
matcherAddExistentialQuantifier from toProve =
    -- P(t) => \exists x P(x)
    case toProve of
        Formula.Exists var rest ->
            firstOrderMatcherHelper var rest from

        _ ->
            False


matcherRemoveExistentialQuantifier : Formula.Formula -> Formula.Formula -> List String -> Bool
matcherRemoveExistentialQuantifier from toProve freeVariables =
    case from of
        Formula.Exists var rest ->
            let
                substitutions =
                    List.map
                        (\term ->
                            case term of
                                Formula.Var str ->
                                    if not <| List.member str freeVariables then
                                        Just <| Dict.fromList [ ( var, term ) ]
                                    else
                                        Nothing

                                _ ->
                                    Nothing
                        )
                        (getTerms toProve)

                afterSubstitution =
                    List.map
                        (\elem ->
                            case elem of
                                Just sub ->
                                    Formula.substitute sub rest

                                Nothing ->
                                    Err ""
                        )
                        substitutions

                equal other =
                    case other of
                        Err _ ->
                            False

                        Ok subsituted ->
                            subsituted == toProve
            in
            List.any equal afterSubstitution

        _ ->
            False


matcherConjunction : BinaryMatcher
matcherConjunction from1 from2 toProve =
    -- (a) & (b) => (a & b)
    case toProve of
        Formula.Conj a b ->
            (from1 == a) && (from2 == b)

        _ ->
            False


matcherModusTolens : BinaryMatcher
matcherModusTolens from1 from2 toProve =
    -- (a -> b) & (-b) => (-a)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Neg b2, Formula.Neg a2 ) ->
            (b1 == b2) && (a1 == a2)

        _ ->
            False


matcherModusPonens : BinaryMatcher
matcherModusPonens from1 from2 toProve =
    -- (a -> b) & (a) => (b)
    case from1 of
        Formula.Impl a b ->
            (a == from2) && (b == toProve)

        _ ->
            False


matcherHypotheticalSyllogism : BinaryMatcher
matcherHypotheticalSyllogism from1 from2 toProve =
    -- (a -> b) & (b -> c) => (a -> c)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Impl b2 c2, Formula.Impl a3 c3 ) ->
            (a1 == a3) && (b1 == b2) && (c2 == c3)

        _ ->
            False


matcherDisjunctiveSyllogism : BinaryMatcher
matcherDisjunctiveSyllogism from1 from2 toProve =
    -- (p|q) & (-p) => q
    case ( from1, from2, toProve ) of
        ( Formula.Disj p1 q1, Formula.Neg p2, q2 ) ->
            (p1 == p2) && (q1 == q2)

        _ ->
            False


matcherConstructiveDilemma : BinaryMatcher
matcherConstructiveDilemma from1 from2 toProve =
    -- ((p->q)&(r->s)) & (p|r) => (q|s)
    case ( from1, from2, toProve ) of
        ( Formula.Conj (Formula.Impl p1 q1) (Formula.Impl r1 s1), Formula.Disj p2 r2, Formula.Disj q3 s3 ) ->
            p1 == p2 && q1 == q3 && r1 == r2 && s1 == s3

        _ ->
            False


matcherDestructiveDilemma : BinaryMatcher
matcherDestructiveDilemma from1 from2 toProve =
    -- ((p->q)&(r->s)) & (-q|-s) =>  (-p|-r)
    case ( from1, from2, toProve ) of
        ( Formula.Conj (Formula.Impl p1 q1) (Formula.Impl r1 s1), Formula.Disj (Formula.Neg q2) (Formula.Neg s2), Formula.Disj (Formula.Neg p3) (Formula.Neg r3) ) ->
            p1 == p3 && q1 == q2 && s1 == s2 && r1 == r3

        _ ->
            False


matcherGrimaldi1 : BinaryMatcher
matcherGrimaldi1 from1 from2 toProve =
    -- (-p->q) & (-p->-q) => p
    case ( from1, from2, toProve ) of
        ( Formula.Impl (Formula.Neg p1) q1, Formula.Impl (Formula.Neg p2) (Formula.Neg q2), p3 ) ->
            p1 == p2 && p2 == p3 && q1 == q2

        _ ->
            False


matcherGrimaldi2 : BinaryMatcher
matcherGrimaldi2 from1 from2 toProve =
    -- (p->r) & (q->r) => ((p|q)->r)
    case ( from1, from2, toProve ) of
        ( Formula.Impl p1 r1, Formula.Impl q1 r2, Formula.Impl (Formula.Disj p3 q3) r3 ) ->
            p1 == p3 && r1 == r2 && r2 == r3 && q1 == q3

        _ ->
            False
