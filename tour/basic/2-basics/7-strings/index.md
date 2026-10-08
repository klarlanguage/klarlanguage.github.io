# Strings

**Strings** represent text. The text is always in quotes. You can use single `'`, double `"`, or backticks `` ` ``, but you must use the same style on both sides of the text.

> [!CAUTION]
> If you're on a mobile keyboard, typing quotes will produce curly quotes. Those aren't supported in Klar. Make sure your strings are always written with straight quotes. On iOS, you can get these by pressing and holding the quote key.

## Escaping

Sometimes you may want to include special characters in your string. These can be included via escape sequences. Escapes are also required to include your string's quote as text; if your string is double-quoted (`"...`), it can't contain `"` inside it unless you escape it. An escape starts with a backslash (`\`). Klar allows these escape sequences in strings:

- Newline: `\n`
- Tab: `\t`
- Backslash: `\\`
- Quote: `\'` or `\"` (only the same one used to quote the string)
- Left curly brace: `\{` (inside double-quoted strings only)
- Unicode character: `\xDD` or `\u{DDDD}` (Each `D` is a hexadecimal digit (0-9 or a-f))

Some less used escape sequences Klar allows are `\b` (backspace control character), `\e` (ANSI control), `\f` (form feed), `\r` (carriage return), `\v` (vertical tab).

Escape sequences have no effect in backquoted strings (`` `...` ``), so a backquoted string containing `\n` will contain an actual backslash.

## Interpolating

In double-quoted strings (`"..."`), we allow interpolating expressions. Just include the expression in curly braces, like `{expression}`.

The expression will be converted into a human-readable format. Most data types are supported for the expression, including all basic data types. The compiler will let you know if a particular type isn't supported.

If you want a literal curly brace in your string, you must escape it like `\{`. You only need to escape the left one.

## Writing multiple lines
TODO