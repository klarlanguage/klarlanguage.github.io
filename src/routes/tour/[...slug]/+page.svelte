<script lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@proicons/svelte'
import Editor from '#lib/components/Editor/Editor.svelte'
import type { EditorOptions } from '#lib/components/Editor/options.ts'
import type { PageProps } from './$types'

let { data: slide, params }: PageProps = $props()
const { text, files } = $derived(slide)
const tutorialLevel = $derived(params.slug.slice(0, params.slug.indexOf('/')))

const editorOptions: EditorOptions = $derived({
    openFiles:
        (text.metadata?.openFiles as string[])
        ?? Object.keys(files).sort((a, b) =>
            // When no order is provided, always put 'main.klar' first
            a == 'main.klar' ? -1 : b == 'main.klar' ? 1 : a.localeCompare(b)
        ),
    files,
})
</script>

<svelte:head>
    <title>{slide.text.metadata?.title || ''} | Klar Language Tour</title>
</svelte:head>

<div class="container">
    <div class="body">
        <text.default />
        <footer>
            <a href="#previous">
                <button><ChevronLeftIcon /> Previous</button>
            </a>
            <a href="/tour/contents#{tutorialLevel}" aria-label="Go to table of contents"
                >Contents</a>
            <a href="#previous">
                <button> Next <ChevronRightIcon /></button>
            </a>
        </footer>
    </div>
    <Editor options={editorOptions} />
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
