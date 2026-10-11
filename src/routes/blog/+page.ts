import type { MarkdownPage } from '#lib/loadMarkdown.ts'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = () => {
    const posts: Record<string, MarkdownPage> = import.meta.glob(
        '#/blog/**/*.{md,mdx,svx}',
        { eager: true, base: '/blog' }
    )
    return posts
}
