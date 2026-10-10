# Comparisons

All values (not just numbers) can be compared in Klar.

On numbers (`Int` and `Float`), these operators are supported:

- **Equal:** `==` (2 equal signs)
- **Not equal:** `!=` (exclamation mark followed by an equal sign)
- **Greater than:** `>`
- **Less than:** `<`
- **Greater than or equal to:** `<=` (`<` followed by an equal sign)
- **Less than or equal to:** `>=`

> [!CAUTION]
> Always use two equal signs (`==`) when checking for equality (e.g. `2 + 3 == 5`). Never use just one (`2 + 3 = 5`).

In terms of behaviour, they are compared as you expect them to be.

`String`s can also be compared, but only `==` and `!=` are supported. The same is true for the rest of the types we'll talk about.

---

These operations return a value that indicates whether the comparison is true or not. That's what we'll talk about next.
