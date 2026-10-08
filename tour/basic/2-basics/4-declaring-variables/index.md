# Declaring variables

<!-- TODO: This file is too long -->

The first statement in the file starts with `name`. That whole statement is a **variable declaration**. It lets you declare a name that can be used within the module, and set it to a specific value, also known as an **expression**. There are several types of expressions in Klar, most of which contain other expressions.

> [!NOTE]
> **Declarations** are types of statements, but not all statements are declarations. There are more types of both that we'll get into later.

In this variable declaration, on the left side of `:=`, the variable is named `name`. On the right side, the variable is set to `'John'`. `'John'`, in quotes, is a kind of value called a string. We'll go over that soon. By declaring a variable named `name`, we don't have to type `'John'` any time we want to refer to that value. Instead, we can just use `name` as an expression, and it refers to the same thing. Names are case-sensitive in Klar, so `name` and `nAme` don't refer to the same thing.

Variables are named in camelCase (first word lowercase, the rest capitalized, with no spaces), and must start with a lowercase letter. They may contain letters, numbers, and underscores `_` (no spaces or hyphens). However, Klar has restricions on some variable names:

- Names can't start with a number (`3fruits` isn't allowed)
- Some words like `type` have special meanings in Klar (keywords), so you can't use those names.
- You can't use just underscores as a name, such as `_` or `___`
    > [!NOTE]
    > You won't get an error when you declare a variable named `_` (one underscore), but you will when you try to reference it.
- They must contain at least one letter (`_1` isn't allowed)

All variable declarations must have unique names, so later declaring another variable named `name` is invalid and will result in a compile-time error. Try uncommenting (remove the `//`) the line shown in the code to see what error you'll get.

If a variable is never used in your program, the compiler will give you a warning. To avoid that, you can change the name to start with an underscore (e.g. `_name`), set the name to an underscore (`_`), or not declare it at all.

## Reassigning variables

The value of a variable can be changed later in your code -- that's why they're called _variables_. Reassigning a variable looks similar to first declaring it; an equal sign `=` without the colon is used instead. The variable whose value you want to change is on the left, and its new value is on the right. After you reassign a variable, any expression that references it below will get the new value.

A variable reassignment is a statement, not a declaration or expression.

## Declaring multiple variables at once

You can declare or reassign multiple variables in a single statement. Variables and values respectively on each side are separated by commas. The first variable on the left will be set to the first value on the right, and so on for the rest. The number of variables on the left must match the number of values on the right; but you can also have multiple variables on the left and exactly one value on the right to set all of them to the same value.

To keep your code clear, this should only be used for closely related variables, or when you want to swap their values (e.g. `x, y = y, x`).
