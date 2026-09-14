import { loadMarkdownPage } from '$lib/loadMarkdown'
import type { PageLoad } from './$types'

export const prerender = true

export const load: PageLoad = async ({ params: { slug }, url }) => {
    return await loadMarkdownPage('docs', slug, url)
}
