import { loadMarkdownPage, type MarkdownPage } from '#lib/loadMarkdown.js'
import type { PageLoad } from './$types'

export const prerender = true

const blogPages = import.meta.glob<MarkdownPage>('#/docs/**/*.{md,mdx,svx}', {
    base: '/docs',
})

export const load: PageLoad = async ({ params: { slug } }) => {
    return { text: await loadMarkdownPage(blogPages, slug) }
}
