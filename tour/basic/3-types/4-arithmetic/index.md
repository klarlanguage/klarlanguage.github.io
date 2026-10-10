# Arithmetic

Like any _real_ programming languages, Klar supports arithmetic.

On `Int` and `Float` values, these operations are supported:

- **Addition**: `+`
- **Subtraction**: `-`
- **Multiplication**: `*`
- **Division**: `/`
- **Modulus**: `%` (`a % b` returns the remainder of `a / b`; e.g. `8 % 3` is `2`)
- **Exponentiation**: `^` (raises the number on the left to the right's power, e.g. `2 ^ 3` = `2`<sup>3</sup> = `8`)

A value is required on each side of the operator. `2 + 2` performs addition.

To make a number **negative**, put a negative sign (`-`) before the value (e.g. `-2` or `-age`). A positive prefix (`+5`) isn't allowed in Klar, because it wouldn't have an effect on the number (`5` is still positive even without the sign).

## Order of operations

Klar follows [mathematical order of operations](https://en.wikipedia.org/wiki/Order_of_operations) (PEMDAS/BOMDAS). `2 + 5 * 2` is `2 + (5 * 2)`, and `-2 + 3` is `1`. Grouping is done by wrapping the value in parentheses `(...)`. Only parentheses can be used, not brackets `[...]` or curly braces `{...}`.

## Performing arithmetic and reassigning

An arithmetic operator can be put before the `=` when reassigning a variable (e.g. `+=`). It's equivalent to performing the operation on the variable before reassigning it. Instead of:

```klar
age = age + 1
```

It is recommended to write:

```klar
age += 1
```

## Converting numbers

When performing arithmetic operations, both sides must have the same type. Klar doesn't let you add an `Int` and `Float` together; you must convert them so they have the same type. This can be done by calling `Int()` and putting the value of another type in the parentheses to convert it to an `Int`. Similarly, you can also do this with `Float()` to convert an `Int` to a `Float`.
