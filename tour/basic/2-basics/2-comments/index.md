# Leaving messages in your code 🗒️

To explain your code to other developers and yourself, or you just want to leave a message, you can leave **comments** in your code. Comments are ignored by the Klar compiler, so they can contain any characters. There are two types of comments you can write: line comments, and block comments.

A **line comment** is the simplest type of comment; it starts with two slashes (`//`). Everything after it until the end of the line is part of the comment. So it must be at the end of a line, or on its own line.

For longer comments that are multiple lines long, you can use **block comments**. They start with `/*` and end with `*/`. Everything between those are part of the comment. They don't have to be at the end of a line.

## Conventions for writing comments

Some tips for writing good comments in Klar:

- `//`, `/*`, and `*/` are usually written with a space around them (`// comment` instead of `//comment`). This is just to make your code more readable, and won't result in an error if you don't.
- Comments should be used to explain what the code under them do, or to leave notes for yourself or other developers working in your codebase (such as about how the code can be changed). They should not be used to explain obvious and unambiguous parts of your code, like `// This is a number` beside a number like `3`. Assume people reading your code know Klar, or another programming language with common syntax.
- To tell developers about a change to the code that should be done later, add a comment starting with `TODO` (in all caps).
