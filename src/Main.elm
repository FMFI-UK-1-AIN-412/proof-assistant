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
    = SafeGoUp
    | SafeGoDown0
    | SafeGoDown1
    | SafeGoDown2
    | EditZipper Zipper String
    | RemoveChildren Zipper


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
        , showEditableTree2 zipper
        ]


showEditableTree2 : Zipper -> Html Msg
showEditableTree2 zipper =
    let
        inpt =
            div []
                [ input
                    [ onInput (EditZipper zipper)
                    , value (getElemFromTree zipper.tree).value
                    ]
                    []
                , button [ onClick (RemoveChildren zipper) ] [ text "x" ]
                ]

        attributes =
            [ style
                [ ( "margin-left", "20px" )
                , ( "border-left", "1px dashed #cfcfcf" )
                ]
            ]

        rest =
            case zipper.tree of
                Leaf _ ->
                    []

                Alfa _ subtree ->
                    case goDown zipper 0 of
                        Nothing ->
                            []

                        Just sub ->
                            [ showEditableTree2 sub ]

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
                                            showEditableTree2 sub
                                )
                                maybeSubs
                    in
                        inputs
    in
        div attributes (inpt :: rest)


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "bakalarka" ]
        , p [] [ text (showSimpleTree (goRoot model.zipper).tree) ]
        , hr [] []
        , button [ onClick SafeGoUp ] [ text "safe go up" ]
        , button [ onClick SafeGoDown0 ] [ text "safe go down 0" ]
        , button [ onClick SafeGoDown1 ] [ text "safe go down 1" ]
        , button [ onClick SafeGoDown2 ] [ text "safe go down 2" ]
        , hr [] []
        , p [] [ text (showSimpleTree model.zipper.tree) ]
        , hr [] []
        , showEditableTree (goRoot model.zipper)
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        newZipper =
            case msg of
                SafeGoUp ->
                    goUpOrNothing model.zipper

                SafeGoDown0 ->
                    goDownOrNothing model.zipper 0

                SafeGoDown1 ->
                    goDownOrNothing model.zipper 1

                SafeGoDown2 ->
                    goDownOrNothing model.zipper 2

                EditZipper zipper str ->
                    { zipper | tree = editTreeValue zipper.tree str }

                RemoveChildren zipper ->
                    removeChildren zipper
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
