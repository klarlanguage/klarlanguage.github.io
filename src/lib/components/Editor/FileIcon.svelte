<script lang="ts">
import definitions from '#lib/assets/fileIcons/definitions.json' with { type: 'json' }

const { name, folder = false }: { name: string; folder?: boolean } = $props()

function getFileIconName(name: string, folder = false): string {
    if (folder) {
        return (
            definitions.folderNames[name as keyof typeof definitions.folderNames]
            || '_folder'
        )
    }
    if (name in definitions.fileNames) {
        return definitions.fileNames[name as keyof typeof definitions.fileNames]
    }
    type Extension = keyof typeof definitions.fileExtensions
    const lastParts = name.split('.').slice(-2)
    const last2 = lastParts.join('.') // Ex: d.ts
    return (
        definitions.fileExtensions[last2 as Extension]
        ?? definitions.fileExtensions[lastParts[1] as Extension]
        ?? '_file'
    )
}

const icons = import.meta.glob('#lib/assets/fileIcons/*/*.svg', {
    query: '?url',
    import: 'default',
    eager: true,
    base: '/src/lib/assets/fileIcons',
})
</script>

<img
    src={icons[`./dark/${getFileIconName(name, folder)}.svg`]}
    role="presentation"
    alt="" />

<style>
img {
    width: 20px;
}
</style>
