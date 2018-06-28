module Core.Types
    exposing
    ( Explanation(..)
    , FormulaStep
    , GUI
    , Justification(..)
    , Proof(..))

import Formula
import Parser


type alias GUI =
    { showButtons : Bool, collapsed : Bool }


type alias FormulaStep =
    { text : String
    , formula : Result Parser.Error Formula.Formula
    , index : Int
    , gui : GUI
    }


type Explanation
    = Premise
    | Rule (Maybe Justification)
    | Goal (Maybe Proof)
    | Contradiction (Maybe Proof)
    | Generalization String (Maybe Proof)


type Proof
    = FormulaNode Explanation FormulaStep (Maybe Proof)
    | CasesNode FormulaStep (Maybe Proof) FormulaStep (Maybe Proof)


type Justification
    = Axiom String
    | Justification0 String
    | Justification1 String Int
    | Justification2 String Int Int
