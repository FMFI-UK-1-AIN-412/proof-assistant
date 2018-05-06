module Matcher
    exposing
        ( BinaryMatcher
        , NullaryMatcher
        , UnaryMatcher
        , matcherAddExistentialQuantifier
        , matcherAddition
        , matcherAxiomP1
        , matcherAxiomP2
        , matcherAxiomP3
        , matcherAxiomP4
        , matcherAxiomQ6
        , matcherConjunction
        , matcherConstructiveDilemma
        , matcherDestructiveDilemma
        , matcherDisjunctiveSyllogism
        , matcherDoubleNegationIntroduction
        , matcherDoubleNegationRemoval
        , matcherGrimaldi1
        , matcherGrimaldi2
        , matcherHypotheticalSyllogism
        , matcherIdentity
        , matcherImplicationIntroduction
        , matcherImplicationRemoval
        , matcherModusPonens
        , matcherModusTolens
        , matcherRemoveExistentialQuantifier
        , matcherRemoveUniversalQuantifier
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


matcherAxiomP1 : NullaryMatcher
matcherAxiomP1 toProve =
    -- (p->p)
    case toProve of
        Formula.Impl p1 p2 ->
            p1 == p2

        _ ->
            False


matcherAxiomP2 : NullaryMatcher
matcherAxiomP2 toProve =
    -- (p->(q->p))
    case toProve of
        Formula.Impl p1 (Formula.Impl _ p2) ->
            p1 == p2

        _ ->
            False


matcherAxiomP3 : NullaryMatcher
matcherAxiomP3 toProve =
    -- ((p->(q->r)) -> ((p->q)->(p->r)))
    case toProve of
        Formula.Impl (Formula.Impl p1 (Formula.Impl q1 r1)) (Formula.Impl (Formula.Impl p2 q2) (Formula.Impl p3 r2)) ->
            p1 == p2 && p2 == p3 && r1 == r2 && q1 == q2

        _ ->
            False


matcherAxiomP4 : NullaryMatcher
matcherAxiomP4 toProve =
    -- ((-p->-r) -> (r->p))
    case toProve of
        Formula.Impl (Formula.Impl (Formula.Neg p1) (Formula.Neg r1)) (Formula.Impl r2 p2) ->
            p1 == p2 && r1 == r2

        _ ->
            False


matcherAxiomQ6 : NullaryMatcher
matcherAxiomQ6 toProve =
    -- \forall x (fi -> xi) => (\forall x fi -> \forall x xi)
    case toProve of
        Formula.Impl (Formula.ForAll var1 (Formula.Impl fi1 xi1)) (Formula.Impl (Formula.ForAll var2 fi2) (Formula.ForAll var3 xi2)) ->
            fi1 == fi2 && xi1 == xi2 && var1 == var2 && var2 == var3

        _ ->
            False


matcherIdentity : UnaryMatcher
matcherIdentity from toProve =
    from == toProve


matcherDoubleNegationRemoval : UnaryMatcher
matcherDoubleNegationRemoval from toProve =
    -- (--a) => a
    case from of
        Formula.Neg (Formula.Neg a) ->
            toProve == a

        _ ->
            False


matcherDoubleNegationIntroduction : UnaryMatcher
matcherDoubleNegationIntroduction from toProve =
    -- a => --a
    matcherDoubleNegationRemoval toProve from


matcherImplicationRemoval : UnaryMatcher
matcherImplicationRemoval from toProve =
    -- (a->b) => (-a|b)
    case ( from, toProve ) of
        ( Formula.Impl a1 b1, Formula.Disj (Formula.Neg a2) b2 ) ->
            a1 == a2 && b1 == b2

        _ ->
            False


matcherImplicationIntroduction : UnaryMatcher
matcherImplicationIntroduction from toProve =
    -- (-a|b) => (a->b)
    matcherImplicationRemoval toProve from


matcherAddition : UnaryMatcher
matcherAddition from toProve =
    -- a => (a|b)
    case toProve of
        Formula.Disj a b ->
            (from == a)
                || (from == b)

        _ ->
            False


matcherSimplification : UnaryMatcher
matcherSimplification from toProve =
    -- (a & b) => a
    -- (a & b) => b
    case from of
        Formula.Conj a b ->
            (toProve == a)
                || (toProve == b)

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
            from1 == a && from2 == b

        _ ->
            False


matcherModusTolens : BinaryMatcher
matcherModusTolens from1 from2 toProve =
    -- (a -> b) & (-b) => (-a)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Neg b2, Formula.Neg a2 ) ->
            b1 == b2 && a1 == a2

        _ ->
            False


matcherModusPonens : BinaryMatcher
matcherModusPonens from1 from2 toProve =
    -- (a -> b) & (a) => (b)
    case from1 of
        Formula.Impl a b ->
            a == from2 && b == toProve

        _ ->
            False


matcherHypotheticalSyllogism : BinaryMatcher
matcherHypotheticalSyllogism from1 from2 toProve =
    -- (a -> b) & (b -> c) => (a -> c)
    case ( from1, from2, toProve ) of
        ( Formula.Impl a1 b1, Formula.Impl b2 c2, Formula.Impl a3 c3 ) ->
            a1 == a3 && b1 == b2 && c2 == c3

        _ ->
            False


matcherDisjunctiveSyllogism : BinaryMatcher
matcherDisjunctiveSyllogism from1 from2 toProve =
    -- (p|q) & (-p) => q
    -- (p|q) & (-q) => p
    case ( from1, from2, toProve ) of
        ( Formula.Disj disj1 disj2, Formula.Neg neg, ans ) ->
            (disj1 == neg && disj2 == ans)
                || (disj2 == neg && disj1 == ans)

        _ ->
            False


matcherConstructiveDilemma : BinaryMatcher
matcherConstructiveDilemma from1 from2 toProve =
    -- ((p->q)&(r->s)) & (p|r) => (q|s)
    -- ((p->q)&(r->s)) & (p|r) => (s|q)
    -- ((p->q)&(r->s)) & (r|p) => (q|s)
    -- ((p->q)&(r->s)) & (r|p) => (s|q)
    case ( from1, from2, toProve ) of
        ( Formula.Conj (Formula.Impl p q) (Formula.Impl r s), Formula.Disj or1 or2, Formula.Disj ans1 ans2 ) ->
            (p == or1 && r == or2 && q == ans1 && s == ans2)
                || (p == or1 && r == or2 && q == ans2 && s == ans1)
                || (p == or2 && r == or1 && q == ans1 && s == ans2)
                || (p == or1 && r == or2 && q == ans2 && s == ans1)

        _ ->
            False


matcherDestructiveDilemma : BinaryMatcher
matcherDestructiveDilemma from1 from2 toProve =
    -- ((p->q)&(r->s)) & (-q|-s) =>  (-p|-r)
    -- ((p->q)&(r->s)) & (-q|-s) =>  (-r|-p)
    -- ((p->q)&(r->s)) & (-s|-q) =>  (-p|-r)
    -- ((p->q)&(r->s)) & (-s|-q) =>  (-r|-p)
    case ( from1, from2, toProve ) of
        ( Formula.Conj (Formula.Impl p q) (Formula.Impl r s), Formula.Disj (Formula.Neg or1) (Formula.Neg or2), Formula.Disj (Formula.Neg ans1) (Formula.Neg ans2) ) ->
            (q == or1 && s == or2 && p == ans1 && r == ans2)
                || (q == or1 && s == or2 && p == ans2 && r == ans1)
                || (q == or2 && s == or1 && p == ans1 && r == ans2)
                || (q == or2 && s == or1 && p == ans2 && r == ans1)

        _ ->
            False


matcherGrimaldi1 : BinaryMatcher
matcherGrimaldi1 from1 from2 toProve =
    -- (-p->q) & (-p->-q) => p
    case ( from1, from2 ) of
        ( Formula.Impl (Formula.Neg p1) q1, Formula.Impl (Formula.Neg p2) (Formula.Neg q2) ) ->
            p1 == p2 && p2 == toProve && q1 == q2

        _ ->
            False


matcherGrimaldi2 : BinaryMatcher
matcherGrimaldi2 from1 from2 toProve =
    -- (p->r) & (q->r) => ((p|q)->r)
    -- (p->r) & (q->r) => ((q|p)->r)
    case ( from1, from2, toProve ) of
        ( Formula.Impl p1 r1, Formula.Impl q1 r2, Formula.Impl (Formula.Disj or1 or2) r3 ) ->
            (r1 == r2 && r2 == r3 && p1 == or1 && q1 == or2)
                || (r1 == r2 && r2 == r3 && p1 == or2 && q1 == or1)

        _ ->
            False
