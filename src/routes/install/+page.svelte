<svelte:head>
    <title>Install | Klar Programming Language</title>
</svelte:head>

<h1>Install Klar</h1>

<section id="playground">
    <h2><a href="#playground">Write Klar in your browser</a></h2>
    <p>
        The <a href="/playground">Klar Playground</a> allows you to write Klar in your browser,
        without having to install anything on your computer. It's great for trying Klar out,
        or quickly writing a small program. The Playground supports multiple modules, importing
        the standard library, and syncing with files on your device.
    </p>
</section>

<section id="local">
    <h2><a href="#local">On your computer</a></h2>
    <p>
        Klar officially supports Linux, macOS and Windows. Simply run this command in your
        terminal to install the Klar CLI:
    </p>

    <!-- TODO: Install command -->

    <p>
        If you're on a different operating system, use the command for Linux/macOS to
        build Klar from source. The latest version of <a href="https://go.dev">Go</a> is required.
    </p>
</section>

<section id="editor">
    <h2><a href="#editor">In your editor</a></h2>
    <p>
        We have official extensions to support Klar in VS Code and Zed, powered by <a
            href="https://github.com/ProCode-Software/klar/blob/main/internal/lsp/README.md"
            >KlarLS</a
        >, the language server built-into the <code>klar</code> CLI. KlarLS also supports any
        LSP-compatible editor, such as Neovim or Helix.
    </p>
</section>
