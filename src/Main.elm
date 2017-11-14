module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)
import Json.Decode as Decode


type alias Element =
    { value : String }


type Tree
    = Leaf Element
    | Alfa Element Tree


type Breadcrumb
    = LeafAlfaCrumb Element


type alias Zipper =
    { tree : Tree, breadcrumbs : List Breadcrumb }


type alias Model =
    { tree : Zipper }


type Msg
    = GoDown
    | GoUp


initialModel : Model
initialModel =
    { tree =
        { tree =
            Alfa
                { value = "/" }
                (Alfa
                    { value = "home/" }
                    (Leaf { value = "zoli/" })
                )
        , breadcrumbs = []
        }
    }


goDown : Zipper -> Zipper
goDown zip =
    case zip.tree of
        Leaf element ->
            zip

        Alfa element subtree ->
            { tree = subtree
            , breadcrumbs = (LeafAlfaCrumb element) :: zip.breadcrumbs
            }


goUp : Zipper -> Zipper
goUp zip =
    case List.head zip.breadcrumbs of
        Nothing ->
            zip

        Just breadcrumb ->
            case breadcrumb of
                LeafAlfaCrumb element ->
                    { tree = Alfa element zip.tree
                    , breadcrumbs = List.drop 1 zip.breadcrumbs
                    }


printTree : Tree -> Html Msg
printTree tree =
    case tree of
        Leaf element ->
            div [] [ text element.value ]

        Alfa element child ->
            div []
                [ text element.value
                , printTree child
                ]


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "bakalarka" ]
        , button [ onClick GoUp ] [ text "go up" ]
        , button [ onClick GoDown ] [ text "go down" ]
        , printTree model.tree.tree
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GoDown ->
            ( { model | tree = goDown model.tree }, Cmd.none )

        GoUp ->
            ( { model | tree = goUp model.tree }, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = subscriptions
        }
