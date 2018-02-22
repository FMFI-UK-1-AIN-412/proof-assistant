module Zipper
    exposing
        ( Zipper(..)
        , add
        , changePremis
        , createElement
        , createPremis
        , editValue
        , getChildren
        , getError
        , getValue
        , getVyplyvanieErrors
        , goDown
        , goRoot
        , goUp
        , isPremis
        )

import Formula
import Parser exposing (Parser)


type alias Element =
    { value : String, formula : Result Parser.Error Formula.Formula, isPremis : Bool }


createPremis : String -> Element
createPremis string =
    { value = string, formula = Formula.parse string, isPremis = True }


createElement : String -> Element
createElement string =
    { value = string, formula = Formula.parse string, isPremis = False }


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


setElementInTree : Element -> Tree -> Tree
setElementInTree element tree =
    case tree of
        Leaf _ ->
            Leaf element

        Alfa _ subtree ->
            Alfa element subtree

        Beta _ subtrees ->
            Beta element subtrees


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
    case zipper of
        Empty ->
            Nothing

        Zipper data ->
            case (getElementFromTree data.tree).formula of
                Ok _ ->
                    Nothing

                Err error ->
                    Just <| "Parsing failed: " ++ toString error


getVyplyvanNiePremis : Zipper -> Maybe String
getVyplyvanNiePremis zipper =
    -- todo: implement
    Just "This is not a result of the formulas above."


getVyplyvanieErrors : Zipper -> Maybe String
getVyplyvanieErrors zipper =
    if isPremis zipper then
        Nothing
    else
        getVyplyvanNiePremis zipper


isPremis : Zipper -> Bool
isPremis zipper =
    case zipper of
        Empty ->
            False

        Zipper data ->
            (getElementFromTree data.tree).isPremis


changePremis : Zipper -> Bool -> Zipper
changePremis zipper premis =
    case zipper of
        Empty ->
            Empty

        Zipper data ->
            let
                old_element =
                    getElementFromTree data.tree

                element =
                    { old_element | isPremis = premis }
            in
            Zipper { data | tree = setElementInTree element data.tree }


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
                            , breadcrumbs = BreadcrumbAlfa elem :: data.breadcrumbs
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
