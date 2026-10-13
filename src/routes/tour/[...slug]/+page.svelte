<script lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@proicons/svelte'
import { SvelteMap } from 'svelte/reactivity'
import Editor from '#lib/components/Editor/Editor.svelte'
import type { EditorOptions } from '#lib/components/Editor/options.ts'
import type { PageProps } from './$types'

let { data: slide, params }: PageProps = $props()
const { text, files, previous, next } = $derived(slide)
const [tutorialLevel] = $derived(params.slug.split('/', 1))

const editorOptions: EditorOptions = $derived({
    openFiles: new SvelteMap(
        (
            (text.metadata?.openFiles as string[])
            ?? Object.keys(files).sort((a, b) =>
                // When no order is provided, always put 'main.klar' first
                a == 'main.klar' ? -1 : b == 'main.klar' ? 1 : a.localeCompare(b)
            )
        ).map(path => [path, true])
    ),
    files: new SvelteMap(files.entries()),
})
</script>

<svelte:head>
    <title>{slide.text.metadata?.title || ''} | Klar Language Tour</title>
</svelte:head>

<div class="container">
    <div class="body">
        <div class="breadcrumbs"></div>
        <text.default />
        <footer>
            <div>
                {#if previous}
                    <a href="/tour/{previous.slug}">
                        <button class="previous">
                            <ChevronLeftIcon />
                            <span class="subtitle">Previous</span>
                            <span class="label">{previous.title}</span>
                        </button>
                    </a>
                {/if}
            </div>
            <a href="/tour/contents#{tutorialLevel}" aria-label="Go to table of contents"
                >Contents</a>
            <div>
                {#if next}
                    <a href="/tour/{next.slug}">
                        <button class="next">
                            <span class="subtitle">Next</span>
                            <span class="label"></span>
                            <ChevronRightIcon />
                        </button>
                    </a>
                {/if}
            </div>
        </footer>
    </div>
    <Editor {...editorOptions} />
</div>

<style>
.container {
    width: 100%;
    display: grid;
    grid-template:
        'text editor editor' 60%
        'text explorer output' 40%
        / 50% 15% auto;
}
.body {
    grid-area: text;
}
:global(.Editor) {
    grid-area: editor;
}
</style>
