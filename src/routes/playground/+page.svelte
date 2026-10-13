<script>
import { SvelteMap } from 'svelte/reactivity'
import Editor from '#lib/components/Editor/Editor.svelte'
</script>

<svelte:head>
    <title>Playground | Klar Programming Language</title>
</svelte:head>

<Editor
    files={new SvelteMap([['main.klar', "print('Hello, World!')\n"]])}
    openFiles={new SvelteMap([['main.klar', true]])} />
