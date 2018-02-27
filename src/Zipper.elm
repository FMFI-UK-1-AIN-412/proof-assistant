module Zipper
    exposing
        ( Zipper(..)
        , add
        , changePremis
        , changeShowButtons
        , createElement
        , createPremis
        , editValue
        , getChildren
        , getError
        , getShowButtons
        , getValue
        , getVyplyvanieErrors
        , goDown
        , goRoot
        , goUp
        , isPremis
        )

import Formula
import Matcher
import Parser exposing (Parser)


getFormulaFromZipper : Zipper -> Maybe Formula.Formula
getFormulaFromZipper zipper =
    case getElementFromZipper zipper of
        Nothing ->
            Nothing

        Just tree ->
            case tree.formula of
                Ok value ->
                    Just value

                Err _ ->
                    Nothing


getParsedFormulas : Zipper -> List Formula.Formula
getParsedFormulas zipper =
    case getElementFromZipper zipper of
        Nothing ->
            []

        Just tree ->
            let
                rest =
                    getParsedFormulas <| goUp zipper
            in
            case tree.formula of
                Ok value ->
                    value :: rest

                Err _ ->
                    rest


type alias Element =
    { value : String
    , formula : Result Parser.Error Formula.Formula
    , isPremis : Bool
    , showButton : Bool
    }


createPremis : String -> Element
createPremis string =
    { value = string, formula = Formula.parse string, isPremis = True, showButton = False }


createElement : String -> Element
createElement string =
    { value = string, formula = Formula.parse string, isPremis = False, showButton = False }


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
            Zipper <| { previousData | tree = addToTree previousData.tree element }


getElementFromZipper : Zipper -> Maybe Element
getElementFromZipper zipper =
    case zipper of
        Empty ->
            Nothing

        Zipper data ->
            Just <| getElementFromTree data.tree


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
    let
        maybeFormula =
            getFormulaFromZipper zipper

        previous =
            getParsedFormulas zipper
    in
    case maybeFormula of
        Nothing ->
            Nothing

        Just formula ->
            Matcher.isOk formula previous


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


changeShowButtons : Bool -> Zipper -> Zipper
changeShowButtons bool zipper =
    case zipper of
        Empty ->
            Empty

        Zipper data ->
            let
                old_element =
                    getElementFromTree data.tree

                element =
                    { old_element | showButton = bool }
            in
            Zipper { data | tree = setElementInTree element data.tree }


getShowButtons : Zipper -> Bool
getShowButtons zipper =
    case zipper of
        Empty ->
            False

        Zipper data ->
            (getElementFromTree data.tree).showButton


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
                                { data
                                    | tree = Alfa element data.tree
                                    , breadcrumbs = rest
                                }

                        BreadcrumbBeta element leftTrees rightTrees ->
                            Zipper
                                { data
                                    | tree = Beta element (leftTrees ++ [ data.tree ] ++ rightTrees)
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
                            { data
                                | tree = tree
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
                                { data
                                    | tree = tree
                                    , breadcrumbs = breadCrumb :: data.breadcrumbs
                                }

                        Nothing ->
                            Empty
