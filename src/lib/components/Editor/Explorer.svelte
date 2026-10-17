<script lang="ts">
import { DeleteIcon, FileAddIcon } from '@proicons/svelte'
import { SvelteMap } from 'svelte/reactivity'
import FileIcon from './FileIcon.svelte'

let {
    files = $bindable(),
    activeFile,
    onopen,
    ondelete,
}: {
    activeFile: string | null
    files: SvelteMap<string, string>

    onopen: (path: string) => void
    ondelete: (path: string) => void
} = $props()

interface Entry {
    name: string
    items?: Entry[]
}
// Adapted from https://stackoverflow.com/a/59049749
const root = $derived(
    files.keys().reduce<Entry>(
        (root, path) => {
            path.split('/').reduce((parent, name) => {
                var nextParent = parent.items?.find(item => item.name === name)
                if (!nextParent) (parent.items ??= []).push((nextParent = { name }))
                return nextParent
            }, root)
            return root
        },
        { name: '', items: [] }
    )
)

function createFile() {
    let name = prompt('File path:')
    if (!name?.trim().length) return

    // These 2 replaceAll calls are faster than 1 replaceAll with a regex
    name = name.replaceAll('\\', '/').replaceAll('//', '/')
    if (name.startsWith('/')) name = name.slice(1)
    if (name.endsWith('/')) name = name.slice(0, -1)

    if (files.has(name) || files.keys().find(path => path.startsWith(name + '/'))) {
        alert(`A file or foler named ${JSON.stringify(name)} already exists`)
        return
    }

    files.set(name, '')
    onopen(name)
}

let explorer: Element
$effect(() => {
    // Expand the parents of the file in the tree
    const node = explorer.querySelector(`[data-file=${JSON.stringify(activeFile)}]`)
    let parentDetails = node!.closest('details')
    while (parentDetails != null && explorer.contains(parentDetails)) {
        const curr = parentDetails
        parentDetails.open = true
        parentDetails = parentDetails.parentElement?.closest('details') ?? null
        if (parentDetails == curr) break
    }
})
</script>

<div class="explorer" bind:this={explorer}>
    <div class="toolbar">
        <span class="panelTitle">Files</span>
        <button title="New file..." onclick={() => createFile()}
            ><FileAddIcon size={20} /></button>
    </div>
    {@render folder(root, '')}

    {#snippet folder(folder: Entry, parentDir: string)}
        <ul>
            {#each folder.items as file}
                {@render item(file, `${parentDir}/${folder.name}`)}
            {/each}
        </ul>
    {/snippet}
    {#snippet item(file: Entry, parentDir: string)}
        <li>
            {#if file.items}
                <details>
                    <summary>
                        <div aria-label={file.name} class="item">
                            <FileIcon name={file.name} folder={true} />
                            {file.name}
                        </div>
                    </summary>
                    {@render folder(file, parentDir)}
                </details>
            {:else}
                {@const filePath = `${parentDir}/${file.name}`.replace(/^\/+/, '')}
                <button
                    aria-label={file.name}
                    class={['item', { selected: activeFile == filePath }]}
                    onclick={() => onopen(filePath)}
                    data-file={filePath}>
                    <FileIcon name={file.name} />
                    {file.name}
                    <!-- svelte-ignore a11y_missing_attribute -->
                    <a
                        role="button"
                        tabindex="0"
                        onclick={() => ondelete(filePath)}
                        onkeyup={() => ondelete(filePath)}
                        title="Delete file"
                        class="deleteAction">
                        <DeleteIcon size={20} />
                    </a>
                </button>
            {/if}
        </li>
    {/snippet}
</div>

<style>
.explorer .toolbar {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.explorer ul {
    list-style-type: none;
    padding: 0 5px;
    margin: 0;

    &:not(.explorer > ul) {
        margin-left: 5px;
    }
}
.item {
    width: 100%;
    background: none;
    padding: 5px 10px;
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    border-radius: 10px;
    position: relative;

    &.selected {
        color: var(--accent);
        font-weight: 500px;
    }
    .deleteAction {
        position: absolute;
        right: 10px;
        opacity: 0;
        color: initial;
        transition:
            opacity 0.25s,
            background 0.15s;
    }
    &:hover .deleteAction {
        opacity: 1;
    }
}

summary {
    display: block;
}
</style>
