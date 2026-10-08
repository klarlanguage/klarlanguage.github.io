# Modules

In Klar, modules are represented by folders on your filesystem. A module is made up of one or more Klar files.

Unlike JavaScript, files in the same folder (module) can share code without importing each other.

A module takes its name from the folder. If we have a folder named `greeter`, the module will be named `greeter`. This becomes important when you want to import from, or use code declared in, other modules. <!-- Klar doesn't have a `package` statement at the top of each file like Go or Java. -->

This module has two Klar files named `main.klar` and `anotherFile.klar`. `main.klar` references a variable declared in `anotherFile.klar` (we'll talk about variables soon). This is allowed because both files are in the same folder. It's equivalent to combining them into a single file. Try opening `anotherFile.klar` to see what's in it.

You may be asking, what are these things in each file? That's what we'll go over next.
