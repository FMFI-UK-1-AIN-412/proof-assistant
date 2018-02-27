module Main exposing (..)

import Bootstrap.Button as Button
import Bootstrap.CDN as CDN
import Bootstrap.Form as Form
import Bootstrap.Form.Checkbox as Checkbox
import Bootstrap.Form.Input as Input
import Bootstrap.Form.InputGroup as InputGroup
import Bootstrap.Grid as Grid
import ErrorHandler
import Html
import Html.Attributes
import Html.Events
import Zipper


type alias Model =
    { zipper : Zipper.Zipper, showButtons : Bool }


type Msg
    = EditZipper Zipper.Zipper String
    | ToggleIsPremis Zipper.Zipper Bool
    | MouseHovered Zipper.Zipper Bool
    | AddToZipper Zipper.Zipper


initialModel : Model
initialModel =
    { zipper =
        Zipper.Empty
            |> Zipper.add (Zipper.createPremis "(p -> q)")
            |> Zipper.add (Zipper.createPremis "((q -> r) & (r-> q))")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(q -> r)")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(r -> q)")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "(p -> r)")
            |> Zipper.add (Zipper.createElement "p")
            |> Zipper.goDown 1
            |> Zipper.add (Zipper.createElement "q")
            |> Zipper.goDown 0
            |> Zipper.add (Zipper.createElement "r")
            |> Zipper.goRoot
    , showButtons = False
    }


renderTextProof : Zipper.Zipper -> String
renderTextProof zipper =
    let
        data =
            Maybe.withDefault "" (Zipper.getValue zipper)

        showChildren =
            String.join "|" <| List.map renderTextProof (Zipper.getChildren zipper)
    in
    if showChildren == "" then
        data
    else
        "(" ++ data ++ " --> " ++ showChildren ++ ")"


renderProof : Zipper.Zipper -> Html.Html Msg
renderProof zipper =
    Form.form [] [ Html.ul [ Html.Attributes.style [ ( "padding-left", "0" ) ] ] (renderProofHelper zipper) ]


renderProofHelper : Zipper.Zipper -> List (Html.Html Msg)
renderProofHelper zipper =
    let
        all =
            List.map renderProofHelper <| Zipper.getChildren zipper

        base =
            [ renderLine zipper, Html.ul [] (List.foldr (++) [] <| List.drop 1 all) ]
    in
    base ++ Maybe.withDefault [] (List.head all)


renderButtons : Zipper.Zipper -> Html.Html Msg
renderButtons zipper =
    Html.div []
        [ Button.button
            [ Button.onClick <| AddToZipper zipper
            , Button.outlineSuccess
            , Button.attrs [ Html.Attributes.class "ml-1" ]
            ]
            [ Html.text "+" ]
        , Button.button [ Button.outlineDanger, Button.attrs [ Html.Attributes.class "ml-1" ] ] [ Html.text "x" ]
        ]


renderLine : Zipper.Zipper -> Html.Html Msg
renderLine zipper =
    let
        value_text =
            Maybe.withDefault "Unknown Error!" (Zipper.getValue zipper)

        ( errorNode, groupStatus, inputStatus ) =
            case ErrorHandler.handleErrors zipper of
                Ok _ ->
                    ( Html.text "", Form.groupSuccess, Input.success )

                Err error ->
                    ( Form.validationText [] [ Html.text error ], Form.groupDanger, Input.danger )
    in
    Form.group [ groupStatus ]
        [ InputGroup.config
            (InputGroup.text
                [ Input.placeholder "Formula"
                , Input.value value_text
                , Input.onInput <| EditZipper zipper
                , inputStatus
                ]
            )
            |> InputGroup.predecessors
                [ InputGroup.span []
                    [ Checkbox.checkbox
                        [ Checkbox.checked <| Zipper.isPremis zipper
                        , Checkbox.onCheck <| ToggleIsPremis zipper
                        ]
                        ""
                    ]
                ]
            |> InputGroup.successors
                [ InputGroup.button
                    [ Button.outlineInfo
                    , Button.onClick <| MouseHovered zipper (not (Zipper.getShowButtons zipper))
                    ]
                    [ Html.text "?" ]
                ]
            |> InputGroup.view
        , if Zipper.getShowButtons zipper then
            renderButtons zipper
          else
            Html.text ""
        , errorNode
        ]


view : Model -> Html.Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ Html.h1 [] [ Html.text "Proof assistant" ]
                , Html.p [] [ Html.text (renderTextProof <| Zipper.goRoot model.zipper) ]
                , Html.hr [] []
                , renderProof <| Zipper.goRoot model.zipper
                ]
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EditZipper zipper str ->
            ( { model | zipper = Zipper.editValue zipper (Zipper.createElement str) }, Cmd.none )

        ToggleIsPremis zipper bool ->
            ( { model | zipper = Zipper.changePremis zipper bool }, Cmd.none )

        MouseHovered zipper bool ->
            ( { model | zipper = Zipper.changeShowButtons bool zipper }, Cmd.none )

        AddToZipper zipper ->
            ( { model | zipper = Zipper.add (Zipper.createElement "") zipper }, Cmd.none )


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
