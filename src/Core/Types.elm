module Types
    exposing
        ( Explanation(..)
        , FormulaStep
        , GUI
        , Justification(..)
        , Proof(..)
        )

import Formula
import Parser


type alias GUI =
    { showButtons : Bool, collapsed : Bool }


type alias FormulaStep =
    { text : String
    , formula : Result Parser.Error Formula.Formula
    , next : Maybe Proof
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
    = FormulaNode Explanation FormulaStep
    | CasesNode FormulaStep FormulaStep


type Justification
    = ModusPonens Int Int
    | ModusTolens Int Int
    | HypotheticalSyllogism Int Int
    | Conjuction Int Int
    | DisjunctiveSyllogism Int Int
    | Addition Int
    | SameFormula Int
    | Simplification Int
    | ImplicationRemoval Int
    | DoubleNegation Int
    | ConstructiveDilemma Int Int
    | DestructiveDilemma Int Int
    | Grimaldi1 Int Int
    | Grimaldi2 Int Int
    | FirstOrderRemoveUniversalQunatifier Int
    | FirstOrderRemoveExistentialQunatifier Int
    | FirstOrderAddExistentialQunatifier Int
    | Axiom
