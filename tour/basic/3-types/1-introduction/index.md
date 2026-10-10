# Expressions and types

Every expression in Klar have a **type**, which describes what kind of value it is, and what operations can be done on it.

Klar is statically-typed. This means the types of all values are known at compile-time. The compiler enforces type safety to prevent several classes of runtime crashes. Despite all of this, Klar's type system is easy to get a grasp on, and the compiler helps you see what you get wrong.

Coming up, we will go over the basic data types in Klar:

- Strings/text (`String`)
- Integers (`Int`)
- Decimal numbers (`Float`)
- Booleans (`Bool`)
- Results (`Result`)
- Errors (`Error`)
- `Nothing`
- `Any`
- Optionals
- Lists
- Maps
- Tuples

## Types for variables

When you declare a variable, the variable will have the same type as the value. So if you declare a variable `name` and set it to a string, it will have type `String`. This is known as **type inference**.

An explicit type for a variable can be provided via `variable: Type := value`, but most of the time, it isn't required. It is a good practice to _not_ provide an explicit type if the type of the value is obvious (for example, you set it directly to a string not through a variable). If you provide an explicit type, the compiler will ensure `value` matches the type you declared.

One important thing you need to note is that **the type of a variable can't change**. It wouldn't be allowed to later assign a number (of type `Int`) to `name`. The compiler will report a type mismatch error. This isn't a bad thing -- in larger programs, when performing operations on a variable, you want to make sure its value supports those operations. For example, `reverse()` can be called on a `String`, but not an `Int`. With this rule, you will always be sure when you run your code.
