import { loadMarkdownPage, type MarkdownPage } from '#lib/loadMarkdown.js'
import type { PostMetadata } from '../postFrontmatter'
import type { PageLoad } from './$types'

export const prerender = true

const blogPages = import.meta.glob<MarkdownPage>('#/blog/**/*.{md,mdx,svx}', {
    base: '/blog',
})

export const load: PageLoad = async ({ params: { slug }, url }) => {
    return {
        text: (await loadMarkdownPage(blogPages, slug)) as MarkdownPage & {
            metadata?: PostMetadata
        },
    }
}
