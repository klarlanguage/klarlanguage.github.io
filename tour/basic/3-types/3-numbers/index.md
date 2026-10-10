# Numbers 🔢

## Ints

The `Int` type represents a whole number, or integer.

Because Klar runs as JavaScript, numbers in Klar have limits. The highest integer that can be stored in an `Int` is 2<sup>53</sup> - 1 (over 9 quadrillion), and the smallest value can be -(2<sup>53</sup> - 1). In JavaScript, these limits are equivalent to [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) and [`Number.MIN_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) respectively. Most programs shouldn't need to worry about exceeding these limits.

### Hexadecimal and binary literals

Integers can also be written in hexadecimal using the `0x` prefix followed by hexadecimal digits (0-9, a-f), or in binary using `0b` followed by `0`s and `1`s.

## Floats

The `Float` type represents a decimal number. Float literals are indicated by a decimal point (`.`). They must be written with numbers to both sides of the decimal (`2.` and `.5` aren't allowed; write `2.0` and `0.5` instead)

They are stored as 64-bit, with a maximum value of 1.7976931348623157 * 10<sup>308</sup>, and a minimum of 5 * 10<sup>-324</sup>.

## Separators

You can use underscores `_` to separate digits in integer and float literals, similar to how you'll write a comma or period when writing numbers on paper. This is solely for formatting and doesn't change the value.

---

In the next lesson, we'll show you how to perform arithmetic operations on numbers in Klar.
