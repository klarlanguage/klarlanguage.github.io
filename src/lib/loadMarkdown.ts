import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'

export interface MarkdownPage {
    default: Component<object, object, ''>
    metadata: Record<string, any>
}

const markdownExtensions = ['svx', 'md', 'mdx']

/**
 *
 * @param baseDir - Relative to the root of the repo
 */
export async function loadMarkdownPage(baseDir: string, slug: string, url: URL) {
    for (const ext of markdownExtensions) {
        try {
            const { default: content, metadata }: MarkdownPage = await import(
                `$/${baseDir}/${slug}.${ext}`
            )
            return { content, meta: metadata, baseURL: url.origin }
        } catch {
            return null
        }
    }
    error(404, `Couldn't find ${slug}`)
}
