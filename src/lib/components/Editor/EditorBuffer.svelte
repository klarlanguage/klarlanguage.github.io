<script lang="ts">
let {
    file,
    content = $bindable(),
    oninput,
}: { file: string; content: string; oninput?: (content: string) => void } = $props()

const lang = $derived(file.slice(file.lastIndexOf('.') + 1))
</script>

<div class="EditorBuffer">
    <textarea
        style="width: 100%; font: 16px var(--monospace);"
        rows="15"
        bind:value={content}
        oninput={() => oninput?.(content)}></textarea>
    <div class="highlight"></div>
</div>
