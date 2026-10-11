<script lang="ts">
import favicon from '#lib/assets/favicon.png'

let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta
        name="description"
        content="Klar is a progressive programming language designed for everyone. Simple, safe, and clean." />
    <meta
        name="keywords"
        content="javascript, klar, docs, programming language, playground, tour" />
</svelte:head>

<header></header>

{@render children()}

<footer>
    <p>
        Made with 💚 and Black Excellence by <a href="https://github.com/ProCode-Software"
            >ProCode</a>
    </p>
    <p>Copyright &copy; {new Date().getFullYear()} ProCode Software</p>
</footer>

<style>
@import '@fontsource/onest/400';
@import '@fontsource/onest/500';
@import '@fontsource/onest/600';
@import '@fontsource/onest/700';

@import '@fontsource/jetbrains-mono/400';
@import '@fontsource/jetbrains-mono/500';
@import '@fontsource/jetbrains-mono/600';
@import '@fontsource/jetbrains-mono/700';

:global(*) {
    box-sizing: border-box;
}
:global(html) {
    font-family: 'Onest', system-ui;
    font-size: 16px;
    --monospace: 'JetBrains Mono', 'Fira Code', monospace;
}
:global(input, button, textarea, ::-webkit-file-upload-button) {
    font: inherit;
}
</style>
