<script lang="ts">
import { FileAddIcon } from '@proicons/svelte'
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
    files.keys().reduce(
        (root, path) => {
            path.split('/').reduce((parent, name) => {
                var nextParent = parent.items?.find(q => q.name === name)
                if (!nextParent) (parent.items ??= []).push((nextParent = { name }))
                return nextParent
            }, root)
            return root
        },
        { name: '', items: [] } satisfies Entry
    )
)

function createFile() {
    let name = prompt(`File path:`)
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
</script>

<div class="explorer">
    <div class="toolbar">
        <span class="panelTitle">Files</span>
        <button title="New file..." onclick={() => createFile()}><FileAddIcon /></button>
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
                        <button aria-label={file.name}>
                            <FileIcon name={file.name} folder={true} />
                            {file.name}
                            <!-- TODO: Hover controls (add item, delete) -->
                        </button>
                    </summary>
                    {@render folder(file, parentDir)}
                </details>
            {:else}
                {@const filePath = `${parentDir}/${file.name}`.replace(/^\/+/, '')}
                <button
                    aria-label={file.name}
                    class={{ selected: activeFile == filePath }}
                    onclick={() => onopen(filePath)}>
                    <FileIcon name={file.name} />
                    {file.name}
                    <!-- TODO: Hover controls (delete) -->
                </button>
            {/if}
        </li>
    {/snippet}
</div>
