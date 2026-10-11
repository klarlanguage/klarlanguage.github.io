import adapter from '@sveltejs/adapter-static'
import { sveltekit } from '@sveltejs/kit/vite'
import { escapeSvelte, mdsvex } from 'mdsvex'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeCallouts from 'rehype-callouts'
import rehypeSlug from 'rehype-slug'
import { createHighlighter } from 'shiki'
import { defineConfig, lazyPlugins } from 'vite-plus'
import frostDark from '#lib/assets/syntaxThemes/frost-dark.json' with { type: 'json' }

const highlighter = await createHighlighter({
    themes: ['github-light', frostDark],
    langs: ['javascript', 'typescript'],
})

export default defineConfig({
    // Use oxfmt config from .oxfmtrc.json. We shouldn't have to do this in Vite+; I'll file an issue.
    fmt: (await import('./.oxfmtrc.json', { with: { type: 'json' } })) as {},
    lint: {
        jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
        rules: {
            'vite-plus/prefer-vite-plus-imports': 'error',
            'unicorn/no-empty-file': 'off',
            'no-unused-vars': 'off',
            'no-unused-expressions': 'off',
        },
        options: { typeAware: true, typeCheck: true },
    },
    server: { fs: { allow: ['.'] } },
    build: { rolldownOptions: { external: ['bun'] } },
    plugins: lazyPlugins(() => [
        sveltekit({
            compilerOptions: {
                // Force runes mode for the project, except for libraries. Can be removed in svelte 6.
                runes: ({ filename }) =>
                    filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
            },
            adapter: adapter({ fallback: '404.html' }),
            preprocess: [
                mdsvex({
                    extensions: ['.svx', '.md', '.mdx'],
                    smartypants: {
                        dashes: false, // A custom plugin will be used
                        ellipses: true,
                        quotes: true,
                    },
                    // @ts-ignore
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeCallouts],
                    highlight: {
                        highlighter(code: string, lang?: string | null): string {
                            // TODO: Would like to use tree-sitter for highlighting
                            // instead, especially for Klar/Klon
                            lang ??= 'text'
                            // https://mdsvex.pngwn.io/docs#with-shiki
                            const html = escapeSvelte(
                                lang == 'klar' || lang == 'klon'
                                    ? `<pre>${code}</pre>`
                                    : highlighter.codeToHtml(code, {
                                          lang,
                                          themes: {
                                              light: 'github-light',
                                              dark: 'Frost Dark',
                                          },
                                      })
                            )
                            return `{@html \`<div class="codeBlock" data-lang="${lang}">${html}</div>\` }`
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
