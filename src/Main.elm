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
    | Beta Element (List Tree)


type Breadcrumb
    = BreadcrumbAlfa Element
    | BreadcrumbBeta Element (List Tree) (List Tree)


type alias Zipper =
    { tree : Tree, breadcrumbs : List Breadcrumb }


type alias Model =
    { zipper : Zipper }


type Msg
    = EditZipper Zipper String
    | RemoveChildren Zipper
    | AddChild Zipper Tree


editTreeValue : Tree -> String -> Tree
editTreeValue tree value =
    case tree of
        Leaf elem ->
            Leaf { elem | value = value }

        Alfa elem tree ->
            Alfa { elem | value = value } tree

        Beta elem trees ->
            Beta { elem | value = value } trees


getElemFromTree : Tree -> Element
getElemFromTree tree =
    case tree of
        Leaf elem ->
            elem

        Alfa elem _ ->
            elem

        Beta elem _ ->
            elem



------------------------------------------


goUp : Zipper -> Maybe Zipper
goUp zipper =
    let
        rest =
            List.drop 1 zipper.breadcrumbs
    in
        List.head zipper.breadcrumbs
            |> Maybe.map
                (\breadcrumb ->
                    case breadcrumb of
                        BreadcrumbAlfa element ->
                            { tree = Alfa element zipper.tree
                            , breadcrumbs = rest
                            }

                        BreadcrumbBeta element leftTrees rightTrees ->
                            { tree = Beta element (leftTrees ++ [ zipper.tree ] ++ rightTrees)
                            , breadcrumbs = rest
                            }
                )


goRoot : Zipper -> Zipper
goRoot zipper =
    case goUp zipper of
        Just newZipper ->
            goRoot newZipper

        Nothing ->
            zipper


goUpOrNothing : Zipper -> Zipper
goUpOrNothing zipper =
    Maybe.withDefault zipper (goUp zipper)


goDown : Zipper -> Int -> Maybe Zipper
goDown zipper index =
    case zipper.tree of
        Leaf _ ->
            Nothing

        Alfa elem tree ->
            if index == 0 then
                Just
                    { tree = tree
                    , breadcrumbs = (BreadcrumbAlfa elem) :: zipper.breadcrumbs
                    }
            else
                Nothing

        Beta elem trees ->
            let
                maybeTree =
                    List.head (List.drop index trees)

                leftTrees =
                    List.take index trees

                rightTrees =
                    List.drop (index + 1) trees

                breadCrumb =
                    BreadcrumbBeta elem leftTrees rightTrees
            in
                case maybeTree of
                    Just tree ->
                        Just
                            { tree = tree
                            , breadcrumbs = breadCrumb :: zipper.breadcrumbs
                            }

                    Nothing ->
                        Nothing


goDownOrNothing : Zipper -> Int -> Zipper
goDownOrNothing zipper index =
    Maybe.withDefault zipper (goDown zipper index)


removeChildren : Zipper -> Zipper
removeChildren zipper =
    case zipper.tree of
        Leaf _ ->
            zipper

        Alfa elem _ ->
            { zipper | tree = Leaf elem }

        Beta elem _ ->
            { zipper | tree = Leaf elem }


addChild : Zipper -> Tree -> Zipper
addChild zipper tree =
    zipper



------------------------------------------


initialModel : Model
initialModel =
    { zipper =
        { tree =
            Alfa
                { value = "ako" }
                (Beta
                    { value = "sa" }
                    [ (Beta { value = "mas" }
                        [ Leaf { value = "Dada?" }
                        , Leaf { value = "Viki?" }
                        , Beta { value = "Alexandra?" }
                            [ Leaf { value = "Fine!" }
                            , Leaf { value = "Zle!" }
                            ]
                        , Alfa
                            { value = "Afla 1" }
                            (Alfa
                                { value = "Afla 2" }
                                (Alfa
                                    { value = "Afla 3" }
                                    (Leaf
                                        { value = "Leaft!" }
                                    )
                                )
                            )
                        ]
                      )
                    , (Leaf { value = "dari" })
                    ]
                )
        , breadcrumbs = []
        }
    }


showSimpleTree : Tree -> String
showSimpleTree tree =
    case tree of
        Leaf element ->
            element.value

        Alfa element subtree ->
            "(" ++ element.value ++ "->" ++ (showSimpleTree subtree) ++ ")"

        Beta element subtrees ->
            "(" ++ element.value ++ "->(" ++ (String.join "|" (List.map showSimpleTree subtrees)) ++ "))"


showEditableTree : Zipper -> Html Msg
showEditableTree zipper =
    div
        []
        [ h2 [] [ text "Edit the tabloid bellow" ]
        , showEditableTree2 zipper []
        ]



--showEditableTree2 : Zipper ->  Html Msg


showEditableTree2 zipper styles =
    let
        inpt =
            div []
                [ input
                    [ onInput (EditZipper zipper)
                    , value (getElemFromTree zipper.tree).value
                    ]
                    []
                , button [ onClick (RemoveChildren zipper) ] [ text "x" ]
                , button
                    [ onClick (AddChild zipper (Alfa { value = "" } zipper.tree))
                    ]
                    [ text "A" ]
                , button [ onClick (RemoveChildren zipper) ] [ text "B" ]
                ]

        base_style =
            [ ( "padding-top", "5px" )

            --, ( "padding-left", "5px" )
            ]

        no_margin =
            [ ( "margin-left", "0" ) ] ++ base_style

        some_margin =
            [ ( "border-left", "1px dashed #cfcfcf" )
            , ( "margin-left", "20px" )
            ]
                ++ base_style

        rest =
            case zipper.tree of
                Leaf _ ->
                    []

                Alfa _ subtree ->
                    case goDown zipper 0 of
                        Nothing ->
                            []

                        Just sub ->
                            [ showEditableTree2 sub no_margin ]

                Beta _ subtrees ->
                    let
                        range =
                            List.range 0 (List.length subtrees - 1)

                        maybeSubs =
                            List.map (\i -> goDown zipper i) range

                        inputs =
                            List.map
                                (\maybeSub ->
                                    case maybeSub of
                                        Nothing ->
                                            div [] []

                                        Just sub ->
                                            showEditableTree2 sub some_margin
                                )
                                maybeSubs
                    in
                        inputs
    in
        div [ style styles ] (inpt :: rest)


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "bakalarka" ]
        , p [] [ text (showSimpleTree (goRoot model.zipper).tree) ]
        , hr [] []
        , showEditableTree (goRoot model.zipper)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newZipper =
            case msg of
                EditZipper zipper str ->
                    { zipper | tree = editTreeValue zipper.tree str }

                RemoveChildren zipper ->
                    removeChildren zipper

                AddChild zipper tree ->
                    addChild zipper tree
    in
        ( { model | zipper = newZipper }, Cmd.none )


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
