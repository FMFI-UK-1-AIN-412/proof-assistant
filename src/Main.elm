module Main exposing (..)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Editor
import Html


type Msg
    = EditorMsg Editor.Msg


type alias Model =
    { editor : Editor.Model }


initialModel : Model
initialModel =
    { editor = Editor.initialModel }


view : Model -> Html.Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ Html.h1 [] [ Html.text "Proof assistant" ]
                , Html.hr [] []
                , Editor.render model.editor |> Html.map EditorMsg
                ]
            ]
        ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EditorMsg editorMsg ->
            let
                ( editor, command ) =
                    Editor.update editorMsg model.editor
            in
            ( { model | editor = editor }, Cmd.map EditorMsg command )


subscriptions : Model -> Sub Msg
subscriptions model =
    Editor.subscriptions model.editor |> Sub.map EditorMsg


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = subscriptions
        }
