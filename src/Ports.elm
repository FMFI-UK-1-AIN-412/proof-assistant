port module Ports exposing (..)


type alias FileReaderPortData =
    { content : String

    --, filename : String
    --, jsonImporting : Bool
    --, jsonImportError : String
    --, jsonImportId : String
    }


port fileSelected : String -> Cmd msg


port fileContentRead : (FileReaderPortData -> msg) -> Sub msg
