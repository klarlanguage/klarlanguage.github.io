<script lang="ts">
import { CloseIcon } from '@proicons/svelte'
import EditorBuffer from './EditorBuffer.svelte'
import Explorer from './Explorer.svelte'
import FileIcon from './FileIcon.svelte'
import type { EditorOptions } from './options'

const { ...options }: EditorOptions & {} = $props()
let { openFiles, files } = $derived(options)

// svelte-ignore state_referenced_locally
let activeFile: string | null = $state(openFiles.keys().next().value ?? null)

function updateFile(content: string) {
    files.set(activeFile!, content)
}
function openFile(path: string) {
    if (!openFiles.has(path)) openFiles.set(path, true)
    activeFile = path
}
function closeFile(path: string) {
    openFiles.delete(path)
    // Set the active file to the last open tab
    activeFile =
        openFiles.size > 0
            ? openFiles
                  .keys()
                  .drop(openFiles.size - 1)
                  .next().value
            : null
}
function deleteFile(path: string) {
    closeFile(path)
    files.delete(path)
}
</script>

<div class="Editor">
    <div class="textContainer">
        <ul class="tabBar">
            {#each openFiles.keys() as path}
                <li
                    class={['tab', { active: activeFile == path }]}
                    aria-label={path}
                    role="tab"
                    tabindex="0"
                    onclick={() => openFile(path)}
                    onkeyup={() => openFile(path)}>
                    <FileIcon name={path.slice(path.lastIndexOf('/') + 1)} />
                    {path}
                    <button title="Close file" onclick={() => closeFile(path)}>
                        <CloseIcon />
                    </button>
                </li>
            {/each}
        </ul>
        {#if activeFile}
            <EditorBuffer
                file={activeFile}
                content={files.get(activeFile)!}
                oninput={updateFile} />
        {/if}
    </div>
    <div class="explorerContainer">
        <Explorer bind:files {activeFile} onopen={openFile} ondelete={deleteFile} />
    </div>
    <div class="outputContainer">
        <div class="tabBar"></div>
    </div>
</div>
