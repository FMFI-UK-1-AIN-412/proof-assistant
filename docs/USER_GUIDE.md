# User guide for the proof assistant

This guide shows the power of the proof assistant. Section 1 shows information how to enter formulas to the assistant.  Section 2 shows example assignments with solutions. Section 3 describes the implemented rules known to the assistant.

## Section 1
To enter a set of formulas to the proof assistant, enter each formalized formula to a separate line. The assistant has one unary operator `-` (negation) and three binary operators `&` (and), `|` (or), `->` (implication). Each formula with a binary operator must be inside parentheses. So instead of `a & b` one must write `(a & b)`.

First order formulas can be written as `\forall x P(x)` or `\exists x P(x)` notice the space between `x` and `P`.

Examples of a good formulas:
```
p
(p->q)
((p|q)&-r)
(\forall x P(x) -> - \exists x R(x))
```

Examples of bad formulas:
```
p->q
((p|q)&-r
\forall xP(x)            <--- Notice: This formula can be parsed but means for all "xP" in formula "x"
```

---

## Section 2
These four examples present the capabilities of the proof assistent.

### Example 1
Assignment: 

![Exercise 1](imgs/exercise1.png)

Solution:

![Solution for exercise 1](imgs/exercise1-solution.gif)


### Example 2
Assignment: 

![Exercise 2](imgs/exercise2.png)

Solution:

![Solution for exercise 2](imgs/exercise2-solution.gif)


### Example 3
Assignment: 

![Exercise 3](imgs/exercise3.png)

Solution:
![Solution for exercise 3](imgs/exercise3-solution.gif)


### Example 4
Assignment: 
![Exercise 4](imgs/exercise4.png)

Solution:
![Solution for exercise 4](imgs/exercise4-solution.gif)

---

## Section 3

The proof assistant is based on a hybrid formal system mixing Hilbert calculus and Sequent calculus. That means the following axioms and modus ponens are implemented and the proof assistant can identify them.

![Axioms](imgs/hibert.png)

To simplify the use of the proof assistant we implement additional sound rules of inference. These rules are shown bellow.

![Axioms](imgs/rules1.png)

The proof assistants also knows the following rules derived from equivalences

![Axioms](imgs/rule2.png)


