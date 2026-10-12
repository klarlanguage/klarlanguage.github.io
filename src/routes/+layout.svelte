<script lang="ts">
import favicon from '#lib/assets/favicon.png'
import SiteFooter from '#lib/components/Layout/SiteFooter.svelte'
import SiteHeader from '#lib/components/Layout/SiteHeader.svelte'
import '#lib/index.css'

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
    <title>Klar Programming Language</title>
</svelte:head>

<div class="layout">
    <SiteHeader />
    {@render children()}
    <SiteFooter />
</div>

<style>
.layout {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    min-height: 100%;
}
</style>
