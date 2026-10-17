import type { SvelteMap } from 'svelte/reactivity'

export interface EditorOptions {
    files: SvelteMap<string, string>
    openFiles: SvelteMap<string, true>
    enableFeatures?: { sync: boolean; share: boolean }
}
