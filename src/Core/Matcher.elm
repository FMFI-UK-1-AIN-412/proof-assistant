module Core.Matcher
    exposing
        ( BinaryMatcher
        , NullaryMatcher
        , UnaryMatcher
        , matcherAddExistentialQuantifier
        , matcherAddition
        , matcherAssociativity
        , matcherAxiomA1
        , matcherAxiomA2
        , matcherAxiomA3
        , matcherAxiomA4
        , matcherAxiomA5
        , matcherAxiomA6
        , matcherAxiomA7
        , matcherAxiomQ6
        , matcherComutative
        , matcherConjunction
        , matcherConstructiveDilemma
        , matcherDeMorgan
        , matcherDeMorganFirstOrder
        , matcherDestructiveDilemma
        , matcherDisjunctiveSyllogism
        , matcherDistributive
        , matcherDoubleNegationIntroduction
        , matcherDoubleNegationRemoval
        , matcherGrimaldiCases
        , matcherGrimaldiContradiction
        , matcherHypotheticalSyllogism
        , matcherIdempotency
        , matcherIdentity
        , matcherImplicationIntroduction
        , matcherImplicationIntroduction2
        , matcherImplicationIntroduction3
        , matcherImplicationRemoval
        , matcherModusPonens
        , matcherModusTolens
        , matcherOnlyTwoOptions
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


type Result
    = Matched
    | Identity
    | Error



--match : Bool -> UnaryMatcher -> Formula.Formula -> Formula.Formula -> Result


match alreadyMatched function from toProve =
    case function from toProve of
        Nothing ->
            let
                match4 a b c d =
                    case ( match alreadyMatched function a c, match alreadyMatched function b d ) of
                        ( Matched, Matched ) ->
                            Matched

                        ( Matched, Identity ) ->
                            Matched

                        ( Identity, Matched ) ->
                            Matched

                        ( Identity, Identity ) ->
                            Identity

                        _ ->
                            Error

                match2 a b =
                    match alreadyMatched function a b
            in
            case ( from, toProve ) of
                ( Formula.Disj a b, Formula.Disj c d ) ->
                    match4 a b c d

                ( Formula.Conj a b, Formula.Conj c d ) ->
                    match4 a b c d

                ( Formula.Impl a b, Formula.Impl c d ) ->
                    match4 a b c d

                ( Formula.Neg a, Formula.Neg b ) ->
                    match2 a b

                ( Formula.ForAll str1 a, Formula.ForAll str2 b ) ->
                    if str1 == str2 then
                        match2 a b
                    else
                        Error

                ( Formula.Exists str1 a, Formula.Exists str2 b ) ->
                    if str1 == str2 then
                        match2 a b
                    else
                        Error

                ( Formula.Atom str1 terms1, Formula.Atom str2 terms2 ) ->
                    if str1 == str2 && terms1 == terms2 then
                        if alreadyMatched then
                            Matched
                        else
                            Identity
                    else
                        Error

                _ ->
                    Error

        Just toCheck ->
            let
                checked =
                    List.map (\( a, b ) -> match True function a b) toCheck
            in
            if List.member Error checked then
                Error
            else
                Matched


type alias ToBeChecked =
    Maybe (List ( Formula.Formula, Formula.Formula ))


matcherWrapper : (Formula.Formula -> Formula.Formula -> ToBeChecked) -> Formula.Formula -> Formula.Formula -> Bool
matcherWrapper function from toProve =
    case match False function from toProve of
        Matched ->
            True

        _ ->
            False


matcherOnlyTwoOptions : NullaryMatcher
matcherOnlyTwoOptions toProve =
    -- (a|-a)
    -- (-a|a)
    case toProve of
        Formula.Disj a1 (Formula.Neg a2) ->
            a1 == a2

        Formula.Disj (Formula.Neg a1) a2 ->
            a1 == a2

        _ ->
            False


matcherAxiomA1 : NullaryMatcher
matcherAxiomA1 toProve =
    -- (p->(q->p))
    case toProve of
        Formula.Impl p1 (Formula.Impl _ p2) ->
            p1 == p2

        _ ->
            False


matcherAxiomA2 : NullaryMatcher
matcherAxiomA2 toProve =
    -- ((p->(q->r)) -> ((p->q)->(p->r)))
    case toProve of
        Formula.Impl (Formula.Impl p1 (Formula.Impl q1 r1)) (Formula.Impl (Formula.Impl p2 q2) (Formula.Impl p3 r2)) ->
            p1 == p2 && p2 == p3 && r1 == r2 && q1 == q2

        _ ->
            False


matcherAxiomA3 : NullaryMatcher
matcherAxiomA3 toProve =
    --  ((-p -> -r) -> ((-p -> r) -> p))
    case toProve of
        Formula.Impl (Formula.Impl (Formula.Neg p1) (Formula.Neg r1)) (Formula.Impl (Formula.Impl (Formula.Neg p2) r2) p3) ->
            p1 == p2 && p2 == p3 && r1 == r2

        _ ->
            False


matcherAxiomA4 : NullaryMatcher
matcherAxiomA4 toProve =
    -- ((p&r) -> p)
    -- ((p&r) -> r)
    case toProve of
        Formula.Impl (Formula.Conj p r) ans ->
            p == ans || r == ans

        _ ->
            False


matcherAxiomA5 : NullaryMatcher
matcherAxiomA5 toProve =
    -- (a-> (b -> (a&b)))
    case toProve of
        Formula.Impl p1 (Formula.Impl r1 (Formula.Conj p2 r2)) ->
            p1 == p2 && r1 == r2

        _ ->
            False


matcherAxiomA6 : NullaryMatcher
matcherAxiomA6 toProve =
    -- (p -> (p|q))
    -- (p -> (q|p))
    case toProve of
        Formula.Impl ans (Formula.Disj p r) ->
            ans == p || ans == r

        _ ->
            False


matcherAxiomA7 : NullaryMatcher
matcherAxiomA7 toProve =
    -- (a->c) -> ((b->c) -> ((a|b)->c))
    case toProve of
        Formula.Impl (Formula.Impl a1 c1) (Formula.Impl (Formula.Impl b1 c2) (Formula.Impl (Formula.Disj a2 b2) c3)) ->
            a1 == a2 || b1 == b2 || c1 == c2 || c2 == c3

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
matcherDoubleNegationRemoval a b =
    -- (--a) => a
    let
        function from toProve =
            case from of
                Formula.Neg (Formula.Neg a) ->
                    Just [ ( a, toProve ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function a b


matcherDoubleNegationIntroduction : UnaryMatcher
matcherDoubleNegationIntroduction a b =
    -- a => --a
    matcherDoubleNegationRemoval b a


matcherImplicationRemoval : UnaryMatcher
matcherImplicationRemoval a b =
    -- (a->b) => (-a|b)
    let
        function from toProve =
            case ( from, toProve ) of
                ( Formula.Impl a1 b1, Formula.Disj (Formula.Neg a2) b2 ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function a b


matcherImplicationIntroduction : UnaryMatcher
matcherImplicationIntroduction from toProve =
    -- (-a|b) => (a->b)
    matcherImplicationRemoval toProve from


matcherImplicationIntroduction2 : UnaryMatcher
matcherImplicationIntroduction2 from toProve =
    -- (Q) => (P->Q)
    case toProve of
        Formula.Impl _ q ->
            from == q

        _ ->
            False


matcherImplicationIntroduction3 : UnaryMatcher
matcherImplicationIntroduction3 from toProve =
    -- (-P) => (P->Q)
    case ( from, toProve ) of
        ( Formula.Neg p1, Formula.Impl p2 _ ) ->
            p1 == p2

        _ ->
            False


matcherAddition : UnaryMatcher
matcherAddition from toProve =
    -- a => (a|b)
    -- todo
    case toProve of
        Formula.Disj a b ->
            (from == a)
                || (from == b)

        _ ->
            False


matcherAssociativity : UnaryMatcher
matcherAssociativity from toProve =
    -- (a|(b|c)) <=> ((a|b)|c)
    -- (a&(b&c)) <=> ((a&b)&c)
    let
        function from toProve =
            case ( from, toProve ) of
                ( Formula.Disj a1 (Formula.Disj b1 c1), Formula.Disj (Formula.Disj a2 b2) c2 ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ), ( c1, c2 ) ]

                ( Formula.Disj (Formula.Disj a2 b2) c2, Formula.Disj a1 (Formula.Disj b1 c1) ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ), ( c1, c2 ) ]

                ( Formula.Conj a1 (Formula.Conj b1 c1), Formula.Conj (Formula.Conj a2 b2) c2 ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ), ( c1, c2 ) ]

                ( Formula.Conj (Formula.Conj a2 b2) c2, Formula.Conj a1 (Formula.Conj b1 c1) ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ), ( c1, c2 ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function from toProve


matcherDistributive : UnaryMatcher
matcherDistributive from toProve =
    -- (p∨(q∧r)) ↔ ((p∨q)∧(p∨r))
    -- (p∧(q∨r)) ↔ ((p∧q)∨(p∧r))
    let
        function from toProve =
            case ( from, toProve ) of
                ( Formula.Disj p1 (Formula.Conj q1 r1), Formula.Conj (Formula.Disj p2 q2) (Formula.Disj p3 r2) ) ->
                    Just [ ( p1, p2 ), ( p2, p3 ), ( q1, q2 ), ( r1, r2 ) ]

                ( Formula.Disj (Formula.Conj p1 q1) r1, Formula.Conj (Formula.Disj p2 r2) (Formula.Disj q2 r3) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ), ( r1, r2 ), ( r2, r3 ) ]

                ( Formula.Conj (Formula.Disj p2 q2) (Formula.Disj p3 r2), Formula.Disj p1 (Formula.Conj q1 r1) ) ->
                    Just [ ( p1, p2 ), ( p2, p3 ), ( q1, q2 ), ( r1, r2 ) ]

                ( Formula.Conj (Formula.Disj p2 r2) (Formula.Disj q2 r3), Formula.Disj (Formula.Conj p1 q1) r1 ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ), ( r1, r2 ), ( r2, r3 ) ]

                ( Formula.Conj p1 (Formula.Disj q1 r1), Formula.Disj (Formula.Conj p2 q2) (Formula.Conj p3 r2) ) ->
                    Just [ ( p1, p2 ), ( p2, p3 ), ( q1, q2 ), ( r1, r2 ) ]

                ( Formula.Conj (Formula.Disj p1 q1) r1, Formula.Disj (Formula.Conj p2 r2) (Formula.Conj q2 r3) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ), ( r1, r2 ), ( r2, r3 ) ]

                ( Formula.Disj (Formula.Conj p2 q2) (Formula.Conj p3 r2), Formula.Conj p1 (Formula.Disj q1 r1) ) ->
                    Just [ ( p1, p2 ), ( p2, p3 ), ( q1, q2 ), ( r1, r2 ) ]

                ( Formula.Disj (Formula.Conj p2 r2) (Formula.Conj q2 r3), Formula.Conj (Formula.Disj p1 q1) r1 ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ), ( r1, r2 ), ( r2, r3 ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function from toProve


matcherIdempotency : UnaryMatcher
matcherIdempotency a b =
    -- (a|a) => a
    let
        function from toProve =
            case from of
                Formula.Disj a1 a2 ->
                    Just [ ( a1, a2 ), ( a2, toProve ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function a b


matcherComutative : UnaryMatcher
matcherComutative a b =
    -- (a&b) => (b&a)
    -- (a|b) => (b|a)
    let
        function from toProve =
            case ( from, toProve ) of
                ( Formula.Conj a1 b1, Formula.Conj b2 a2 ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ) ]

                ( Formula.Disj a1 b1, Formula.Disj b2 a2 ) ->
                    Just [ ( a1, a2 ), ( b1, b2 ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function a b


matcherDeMorgan : UnaryMatcher
matcherDeMorgan a b =
    -- -(p&q) => (-p|-q)
    -- -(p|q) => (-p&-q)
    -- (-p&-q) => -(p|q)
    -- (-p|-q) => -(p&q)
    let
        function from toProve =
            case ( from, toProve ) of
                ( Formula.Neg (Formula.Conj p1 q1), Formula.Disj (Formula.Neg p2) (Formula.Neg q2) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ) ]

                ( Formula.Neg (Formula.Disj p1 q1), Formula.Conj (Formula.Neg p2) (Formula.Neg q2) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ) ]

                ( Formula.Conj (Formula.Neg p1) (Formula.Neg q1), Formula.Neg (Formula.Disj p2 q2) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ) ]

                ( Formula.Disj (Formula.Neg p1) (Formula.Neg q1), Formula.Neg (Formula.Conj p2 q2) ) ->
                    Just [ ( p1, p2 ), ( q1, q2 ) ]

                _ ->
                    Nothing
    in
    matcherWrapper function a b


matcherDeMorganFirstOrder : UnaryMatcher
matcherDeMorganFirstOrder from toProve =
    -- -\A P(x) => \E -P(x)
    -- -\E P(x) => \A -P(x)
    -- \E -P(x) => -\A P(x)
    -- \A -P(x) => -\E P(x)
    case ( from, toProve ) of
        ( Formula.Neg (Formula.ForAll s1 f1), Formula.Exists s2 (Formula.Neg f2) ) ->
            f1 == f2 && s1 == s2

        ( Formula.Neg (Formula.Exists s1 f1), Formula.ForAll s2 (Formula.Neg f2) ) ->
            f1 == f2 && s1 == s2

        ( Formula.Exists s2 (Formula.Neg f2), Formula.Neg (Formula.ForAll s1 f1) ) ->
            f1 == f2 && s1 == s2

        ( Formula.ForAll s2 (Formula.Neg f2), Formula.Neg (Formula.Exists s1 f1) ) ->
            f1 == f2 && s1 == s2

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


matcherGrimaldiContradiction : BinaryMatcher
matcherGrimaldiContradiction from1 from2 toProve =
    -- (-p->q) & (-p->-q) => p
    case ( from1, from2 ) of
        ( Formula.Impl (Formula.Neg p1) q1, Formula.Impl (Formula.Neg p2) (Formula.Neg q2) ) ->
            p1 == p2 && p2 == toProve && q1 == q2

        _ ->
            False


matcherGrimaldiCases : BinaryMatcher
matcherGrimaldiCases from1 from2 toProve =
    -- (p->r) & (q->r) => ((p|q)->r)
    -- (p->r) & (q->r) => ((q|p)->r)
    case ( from1, from2, toProve ) of
        ( Formula.Impl p1 r1, Formula.Impl q1 r2, Formula.Impl (Formula.Disj or1 or2) r3 ) ->
            (r1 == r2 && r2 == r3 && p1 == or1 && q1 == or2)
                || (r1 == r2 && r2 == r3 && p1 == or2 && q1 == or1)

        _ ->
            False
