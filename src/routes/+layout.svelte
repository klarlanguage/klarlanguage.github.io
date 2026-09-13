<script lang="ts">
import favicon from '$lib/assets/favicon.png'

let { children } = $props()
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta
        name="description"
        content="Klar is a progressive programming language designed for everyone. Simple, safe, and clean."
    />
    <meta
        name="keywords"
        content="javascript, klar, docs, programming language, playground, tour"
    />
</svelte:head>

{@render children()}
