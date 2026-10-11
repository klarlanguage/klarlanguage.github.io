<script lang="ts">
import { derived } from 'svelte/store'
import FileIcon from './FileIcon.svelte'

let {
    activeFile = $bindable(),
    files,
}: { activeFile: string; files: IteratorObject<string> } = $props()

interface Entry {
    name: string
    items?: Entry[]
}
const tree = $derived.by(() => {
    const root: Entry[] = []
    files.reduce(
        (root, path) => {
            path.split('/').reduce((parent, name) => {
                var nextParent = parent.items?.find(q => q.name === name)
                if (!nextParent) (parent.items ??= []).push((nextParent = { name }))
                return nextParent
            }, root)
            return root
        },
        { items: root } as Entry
    )
    return root
})

const cleanFilePath = (path: string) => path.replace(/^\/+/, '')
</script>

<div class="explorer">
    {@render folder({ name: '', items: tree }, '')}

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
                <button
                    aria-label={file.name}
                    onclick={() =>
                        (activeFile = cleanFilePath(`${parentDir}/${file.name}`))}>
                    <FileIcon name={file.name} />
                    {file.name}
                    <!-- TODO: Hover controls (delete) -->
                </button>
            {/if}
        </li>
    {/snippet}
</div>
