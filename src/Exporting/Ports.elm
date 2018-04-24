port module Exporting.Ports exposing (..)


port fileSelected : String -> Cmd msg


port fileContentRead : (String -> msg) -> Sub msg
