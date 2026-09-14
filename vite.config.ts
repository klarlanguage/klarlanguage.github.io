import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { escapeSvelte, mdsvex } from 'mdsvex'
import { createHighlighter } from 'shiki'
import { defineConfig, lazyPlugins } from 'vite-plus'

const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['javascript', 'typescript'],
})

export default defineConfig({
    // Use oxfmt config from .oxfmtrc.json. We shouldn't have to do this in Vite+; I'll file an issue.
    fmt: (await import('./.oxfmtrc.json', { with: { type: 'json' } })) as {},
    lint: {
        jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
        rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
        options: { typeAware: true, typeCheck: true },
    },
    server: { fs: { allow: ['.'] } },
    plugins: lazyPlugins(() => [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
            },
            alias: { '$/': './' },
            adapter: adapter({ fallback: '404.html' }),
            preprocess: [
                mdsvex({
                    extensions: ['.svx', '.md', '.mdx'],
                    smartypants: {
                        dashes: false, // A custom plugin will be used
                        ellipses: true,
                        quotes: true,
                    },
                    highlight: {
                        highlighter(code: string, lang?: string | null): string {
                            // TODO: Would like to use tree-sitter for highlighting
                            // instead, especially for Klar
                            lang ??= 'text'
                            // https://mdsvex.pngwn.io/docs#with-shiki
                            const html = escapeSvelte(
                                highlighter.codeToHtml(code, {
                                    lang,
                                    themes: { light: 'github-light', dark: 'frost-dark' },
                                })
                            )
                            return `{@html \`${html}\` }`
                        },
                    },
                }),
            ],
            extensions: ['.svelte', '.svx', '.md', '.mdx'],
            //@ts-ignore
            paths: { base: process.argv.includes('dev') ? '' : process.env.BASE_PATH },
        }),
    ]),
})
