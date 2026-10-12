<script>
import Editor from '#lib/components/Editor/Editor.svelte'
</script>

<svelte:head>
    <title>Playground | Klar Programming Language</title>
</svelte:head>

<Editor
    options={{
        files: new Map([['main.klar', "print('Hello, World!')\n"]]),
        openFiles: ['main.klar'],
    }} />
