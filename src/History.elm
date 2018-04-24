module History
    exposing
        ( History
        , get
        , hasNext
        , hasPrev
        , new
        , next
        , prev
        , replace
        , save
        )

import Zipper


type alias History m =
    { current : m
    , prev : List m
    , next : List m
    }


new : m -> History m
new model =
    { current = model
    , prev = []
    , next = []
    }


hasNext : History m -> Bool
hasNext history =
    not <| List.isEmpty history.next


hasPrev : History m -> Bool
hasPrev history =
    not <| List.isEmpty history.prev


replace : m -> History m -> History m
replace model history =
    { history | current = model }


save : m -> History m -> History m
save model history =
    { history
        | prev = history.current :: history.prev
        , current = model
        , next = []
    }


get : History m -> m
get history =
    history.current


next : History m -> History m
next history =
    case history.next of
        [] ->
            history

        head :: tail ->
            { history
                | prev = history.current :: history.prev
                , current = head
                , next = tail
            }


prev : History m -> History m
prev history =
    case history.prev of
        [] ->
            history

        head :: tail ->
            { history
                | prev = tail
                , current = head
                , next = history.current :: history.next
            }
