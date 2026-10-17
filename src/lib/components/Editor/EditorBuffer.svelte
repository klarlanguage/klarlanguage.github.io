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
        spellcheck="false"
        bind:value={content}
        name="code"
        oninput={() => oninput?.(content)}></textarea>
    <div class="highlight"></div>
</div>

<style>
.EditorBuffer {
    height: 100%;
}

textarea {
    position: relative;
    width: 100%;
    font: 16px var(--monospace);
    background: none;
    border: none;
    outline: none;
    resize: none;
    height: 100%;
}
.highlight {
    position: absolute;
    font: 16px var(--monospace);
}
</style>
