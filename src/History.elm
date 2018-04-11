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


type alias Model =
    { zipper : Zipper.Zipper }


type alias History =
    { current : Model
    , prev : List Model
    , next : List Model
    }


new : Model -> History
new model =
    { current = model
    , prev = []
    , next = []
    }


hasNext : History -> Bool
hasNext history =
    not <| List.isEmpty history.next


hasPrev : History -> Bool
hasPrev history =
    not <| List.isEmpty history.prev


replace : Model -> History -> History
replace model history =
    { history | current = model }


save : Model -> History -> History
save model history =
    { history
        | prev = history.current :: history.prev
        , current = model
        , next = []
    }


get : History -> Model
get history =
    history.current


next : History -> History
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


prev : History -> History
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
