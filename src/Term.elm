module Term exposing (one)

import Dict exposing (Dict)


type Formula
    = Variable String
    | Formula String
    | Literal Bool
    | Not Formula
    | And (List Formula)
    | Or (List Formula)
    | Implication Formula Formula
    | Equivality Formula Formula


anyOrNothing : (a -> Maybe Bool) -> List a -> Maybe Bool
anyOrNothing function iterable =
    let
        list =
            List.map function iterable
    in
        if List.member (Just True) list then
            Just True
        else if List.member Nothing list then
            Nothing
        else
            Just False


allOrNothing : (a -> Maybe Bool) -> List a -> Maybe Bool
allOrNothing function iterable =
    let
        list =
            List.map function iterable
    in
        if List.member (Just False) list then
            Just False
        else if List.member Nothing list then
            Nothing
        else
            Just True


valid : Formula -> Dict String Bool -> Maybe Bool
valid formula valuation =
    case formula of
        Literal answer ->
            Just answer

        Variable name ->
            Just <| Maybe.withDefault False (Dict.get name valuation)

        Not form ->
            case valid form valuation of
                Just value ->
                    Just <| not value

                Nothing ->
                    Nothing

        And formulas ->
            allOrNothing (\form -> valid form valuation) formulas

        Or formulas ->
            anyOrNothing (\form -> valid form valuation) formulas

        Implication f1 f2 ->
            valid (Or [ Not f1, f2 ]) valuation

        Equivality f1 f2 ->
            Just <| valid f1 valuation == valid f2 valuation

        Formula s ->
            Nothing



--one : Bool
--one =
--    Debug.log
--        "Wow: "
--        (valid
--            (Or [ Variable "A", Variable "B" ])
--            (Dict.fromList [ ( "A", False ), ( "B", True ) ])
--        )


vypliva1 : Formula -> Formula -> Bool
vypliva1 formula answer =
    case formula of
        And formulas ->
            List.member answer formulas

        _ ->
            False


vypliva2 : Formula -> Formula -> Formula -> Bool
vypliva2 first second answer =
    case first of
        Implication a b ->
            (a == second && b == answer)
                || (case second of
                        Implication b c ->
                            answer == Implication a c

                        _ ->
                            False
                   )

        _ ->
            False


vypliva : Formula -> List Formula -> Bool
vypliva moja vsetky =
    List.any identity
        ((List.concatMap
            (\el1 ->
                List.map (\el2 -> vypliva2 el1 el2 moja) vsetky
            )
            vsetky
         )
            ++ List.map (\el -> vypliva1 el moja) vsetky
        )


one =
    Debug.log
        "Wow: "
        (vypliva (Variable "B") [ Implication (Formula "A") (Formula "B"), Formula "A" ])



--(toString (Implication (Formula "A") (Formula "B")))
--(vypliva (Variable "B") [ And [ Variable "A", Variable "B" ] ])
--(vypliva (Implication (Variable "A") (Variable "C"))
--    [ (Implication (Variable "A") (Variable "B"))
--    , (Implication (Variable "B") (Variable "C"))
--    ]
--)
