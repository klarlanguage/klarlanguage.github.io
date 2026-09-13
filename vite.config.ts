import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { mdsvex } from 'mdsvex'
import { defineConfig, lazyPlugins } from 'vite-plus'

export default defineConfig({
    // Use oxfmt config from .oxfmtrc.json. We shouldn't have to do this in Vite+; I'll file an issue.
    fmt: (await import('./.oxfmtrc.json', { with: { type: 'json' } })) as {},
    lint: {
        jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
        rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
        options: { typeAware: true, typeCheck: true },
    },
    plugins: lazyPlugins(() => [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
            },
            adapter: adapter(),
            preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
            extensions: ['.svelte', '.svx', '.md'],
        }),
    ]),
})
