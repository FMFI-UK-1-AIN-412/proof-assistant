module Zipper exposing (Zipper(..), add, getValue, getError, createElement, editValue, goDown, goUp, goRoot, getChildren)

import Formula
import Parser exposing (Parser)


type alias Element =
    { value : String, formula : Result Parser.Error Formula.Formula }


createElement : String -> Element
createElement string =
    { value = string, formula = Formula.parse string }


type Tree
    = Leaf Element
    | Alfa Element Tree
    | Beta Element (List Tree)


getElementFromTree : Tree -> Element
getElementFromTree tree =
    case tree of
        Leaf elem ->
            elem

        Alfa elem _ ->
            elem

        Beta elem _ ->
            elem


addToTree : Tree -> Element -> Tree
addToTree tree element =
    case tree of
        Leaf old_element ->
            Alfa old_element (Leaf element)

        Alfa old_element old_tree ->
            Beta old_element [ old_tree, Leaf element ]

        Beta old_element old_trees ->
            Beta old_element (old_trees ++ [ Leaf element ])


editTree : Tree -> Element -> Tree
editTree tree element =
    case tree of
        Leaf _ ->
            Leaf element

        Alfa _ old_tree ->
            Alfa element old_tree

        Beta _ old_trees ->
            Beta element old_trees


type Breadcrumb
    = BreadcrumbAlfa Element
    | BreadcrumbBeta Element (List Tree) (List Tree)


type Zipper
    = Empty
    | Zipper ZipperData


type alias ZipperData =
    { tree : Tree, breadcrumbs : List Breadcrumb }


add : Element -> Zipper -> Zipper
add element zipper =
    case zipper of
        Empty ->
            Zipper <| ZipperData (Leaf element) []

        Zipper previousData ->
            Zipper <| ZipperData (addToTree previousData.tree element) previousData.breadcrumbs


getError : Zipper -> Maybe String
getError zipper =
    -- todo: some better error hangling,...
    case zipper of
        Empty ->
            Nothing

        Zipper data ->
            case (getElementFromTree data.tree).formula of
                Ok _ ->
                    Nothing

                Err error ->
                    Just <| "Parsing failed: " ++ toString error


getValue : Zipper -> Maybe String
getValue zipper =
    case zipper of
        Empty ->
            Nothing

        Zipper data ->
            Just <| (getElementFromTree data.tree).value


editValue : Zipper -> Element -> Zipper
editValue zipper element =
    case zipper of
        Empty ->
            Empty

        Zipper data ->
            Zipper { data | tree = editTree data.tree element }


childrenCount : Zipper -> Int
childrenCount zipper =
    case zipper of
        Empty ->
            0

        Zipper data ->
            case data.tree of
                Leaf _ ->
                    0

                Alfa _ _ ->
                    1

                Beta _ children ->
                    List.length children


getChildren : Zipper -> List Zipper
getChildren zipper =
    let
        range =
            List.range 0 <| childrenCount zipper - 1
    in
        List.map (\i -> goDown i zipper) range


goUp : Zipper -> Zipper
goUp zipper =
    case zipper of
        Empty ->
            Empty

        Zipper data ->
            let
                rest =
                    List.drop 1 data.breadcrumbs
            in
                case List.head data.breadcrumbs of
                    Nothing ->
                        Empty

                    Just breadcrumb ->
                        case breadcrumb of
                            BreadcrumbAlfa element ->
                                Zipper
                                    { tree = Alfa element data.tree
                                    , breadcrumbs = rest
                                    }

                            BreadcrumbBeta element leftTrees rightTrees ->
                                Zipper
                                    { tree = Beta element (leftTrees ++ [ data.tree ] ++ rightTrees)
                                    , breadcrumbs = rest
                                    }


goRoot : Zipper -> Zipper
goRoot zipper =
    case goUp zipper of
        Zipper parent ->
            goRoot <| Zipper parent

        Empty ->
            zipper



--goUpOrStop : Zipper -> Zipper
--goUpOrStop zipper =
--    Maybe.withDefault zipper (goUp zipper)


goDown : Int -> Zipper -> Zipper
goDown index zipper =
    case zipper of
        Empty ->
            Empty

        Zipper data ->
            case data.tree of
                Leaf _ ->
                    Empty

                Alfa elem tree ->
                    if index == 0 then
                        Zipper
                            { tree = tree
                            , breadcrumbs = (BreadcrumbAlfa elem) :: data.breadcrumbs
                            }
                    else
                        Empty

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
                                Zipper
                                    { tree = tree
                                    , breadcrumbs = breadCrumb :: data.breadcrumbs
                                    }

                            Nothing ->
                                Empty



--goDownOrStop : Zipper -> Int -> Zipper
--goDownOrStop zipper index =
--    Maybe.withDefault zipper (goDown zipper index)
--removeChildren : Zipper -> Zipper
--removeChildren zipper =
--    case zipper.tree of
--        Leaf _ ->
--            zipper
--        Alfa elem _ ->
--            { zipper | tree = Leaf elem }
--        Beta elem _ ->
--            { zipper | tree = Leaf elem }
{- todo:
   empty: Zipper
   add: zipper -> tree -> zipper
   remove: zipper -> zipper


-}
