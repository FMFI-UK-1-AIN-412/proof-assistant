module Matcher exposing (isOk)

import Formula


isOk : Formula.Formula -> List Formula.Formula -> Maybe String
isOk formula formulas =
    Just "This is not a result of the formulas above."
