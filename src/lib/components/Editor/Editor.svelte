<script lang="ts">
import EditorBuffer from './EditorBuffer.svelte'
import Explorer from './Explorer.svelte'
import FileIcon from './FileIcon.svelte'
import type { EditorOptions } from './options'

const { options }: { options: EditorOptions } = $props()
const { openFiles, files } = $derived(options)

// svelte-ignore state_referenced_locally
let activeFile: string | null = $state(openFiles[0] ?? null)

function oninput(content: string) {
    files.set(activeFile, content)
}
</script>

<div class="Editor">
    <div class="textContainer">
        <div class="tabBar">
            {#each openFiles as name}
                <button
                    class={['tab', { active: activeFile == name }]}
                    aria-label={name}
                    onclick={() => (activeFile = name)}>
                    <FileIcon name={name.slice(name.lastIndexOf('/') + 1)} />
                    {name}
                </button>
            {/each}
        </div>
        {#if activeFile}
            <EditorBuffer file={activeFile} content={files.get(activeFile)} {oninput} />
        {/if}
    </div>
    <div class="explorerContainer">
        <Explorer files={files.keys()} bind:activeFile />
    </div>
    <div class="outputContainer">
        <div class="tabBar"></div>
    </div>
</div>
