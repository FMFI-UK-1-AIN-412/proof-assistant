module Main exposing (..)

import Bootstrap.CDN as CDN
import Bootstrap.Grid as Grid
import Bootstrap.Grid.Col as Col
import Editor
import Exporting.Json.Decode
import Exporting.Json.Encode
import Exporting.Ports
import Html
import Html.Attributes
import Html.Events
import Json.Decode


type Msg
    = EditorMsg Editor.Msg
    | JsonSelected
    | LoadFromJson String


type alias Model =
    { editor : Editor.Model }


initialModel : Model
initialModel =
    { editor = Editor.initialModel }


loadButtonId : String
loadButtonId =
    "HEEY-ZOLI"


saveLoadButtons : Editor.Model -> Html.Html Msg
saveLoadButtons model =
    let
        proof =
            Editor.getProof model

        saveStateButton =
            Html.a
                [ Html.Attributes.href <| Exporting.Json.Encode.jsonDataUri <| Exporting.Json.Encode.encode 4 proof
                , Html.Attributes.downloadAs "data.json"
                , Html.Attributes.class "btn btn-primary"
                ]
                [ Html.text "Save" ]

        loadStateLabel =
            Html.label
                [ Html.Attributes.for loadButtonId
                , Html.Attributes.class "btn btn-primary"
                ]
                [ Html.text "Import"
                ]

        loadStateButton =
            Html.input
                [ Html.Attributes.type_ "file"
                , Html.Attributes.id loadButtonId
                , Html.Attributes.accept "application/json"
                , Html.Attributes.class "inputfile"
                , Html.Events.on "change"
                    (Json.Decode.succeed JsonSelected)
                ]
                []
    in
    Html.div [] [ saveStateButton, loadStateButton, loadStateLabel ]


view : Model -> Html.Html Msg
view model =
    Grid.container []
        [ CDN.stylesheet
        , Grid.row []
            [ Grid.col []
                [ Html.h1 [] [ Html.text "Proof assistant" ]
                , Html.hr [] []
                , Grid.row []
                    [ Grid.col [ Col.sm6 ] [ saveLoadButtons model.editor ]
                    , Grid.col [ Col.sm6 ]
                        [ Html.div [ Html.Attributes.class "float-right" ]
                            [ Editor.renderHistoryButtons model.editor |> Html.map EditorMsg ]
                        ]
                    ]
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

        JsonSelected ->
            ( model, Exporting.Ports.fileSelected loadButtonId )

        LoadFromJson content ->
            case Exporting.Json.Decode.decode content of
                Ok proof ->
                    ( { model | editor = Editor.setProof proof model.editor }, Cmd.none )

                Err e ->
                    Debug.log (toString e) ( model, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Editor.subscriptions model.editor |> Sub.map EditorMsg
        , Exporting.Ports.fileContentRead LoadFromJson
        ]


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , update = update
        , init = ( initialModel, Cmd.none )
        , subscriptions = subscriptions
        }
