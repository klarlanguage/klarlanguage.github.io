<script lang="ts">
import { CloseIcon } from '@proicons/svelte'
import EditorBuffer from './EditorBuffer.svelte'
import Explorer from './Explorer.svelte'
import FileIcon from './FileIcon.svelte'
import Output from './Output.svelte'
import type { EditorOptions } from './options'

const { ...options }: EditorOptions & {} = $props()
let { openFiles, files } = $derived(options)

// svelte-ignore state_referenced_locally
let activeFile: string | null = $state(openFiles.keys().next().value ?? null) // First open file

function updateFile(content: string) {
    files.set(activeFile!, content)
}
function openFile(path: string) {
    if (!openFiles.has(path)) openFiles.set(path, true)
    activeFile = path
}
function closeFile(path: string) {
    const allFiles = [...openFiles.keys()]
    const currIndex = allFiles.indexOf(path)
    openFiles.delete(path)
    // Set the active file to the tab before this. If this was originally
    // the first tab, set it to the next.
    if (openFiles.size == 0) activeFile = null
    else activeFile = currIndex == 0 ? allFiles[1] : allFiles[currIndex - 1]
}
function deleteFile(path: string) {
    if (!confirm(`Are you sure you want to delete '${path}'? You can't undo this.`))
        return
    closeFile(path)
    files.delete(path)
}
</script>

<div class="Editor">
    <div class="textContainer">
        <ul class="tabBar">
            {#each openFiles as [path]}
                <li
                    class={['tab', { active: activeFile == path }]}
                    aria-label={path}
                    role="tab"
                    tabindex="0"
                    onclick={() => openFile(path)}
                    onkeyup={() => openFile(path)}>
                    <FileIcon name={path.slice(path.lastIndexOf('/') + 1)} />
                    {path}
                    <button
                        title="Close file"
                        onclick={() => closeFile(path)}
                        class="closeBtn">
                        <CloseIcon size={20} />
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
        <Output />
    </div>
</div>

<style>
.Editor {
    display: grid;
    grid-template: 'explorer' 'editor' 'output' / 15% 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}
.textContainer {
    grid-area: editor;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.explorerContainer {
    grid-area: explorer;
    width: 100%;
    height: 100%;
}
.outputContainer {
    grid-area: output;
    width: 100%;
    height: 100%;
}
.tabBar {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
}

.tabBar li {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px;
    padding-left: 10px;
    border-radius: 100px;

    .closeBtn {
        opacity: 0;
        transition:
            0.15s,
            opacity 0.25s;
    }
    &:hover .closeBtn,
    &:focus .closeBtn {
        opacity: 1;
    }
    &.active {
        color: var(--accent);
        font-weight: 500;
    }
}
</style>
