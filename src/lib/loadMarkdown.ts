import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'

export interface MarkdownPage {
    default: Component<object, object, ''>
    metadata?: Record<string, any>
}

export const markdownExtensions = ['svx', 'md', 'mdx']

/** @param baseDir - Relative to the root of the repo */
export async function loadMarkdownPage(
    files: Record<string, () => Promise<MarkdownPage>>,
    slug: string
): Promise<MarkdownPage> {
    for (const ext of markdownExtensions) {
        const page = files[`./${slug}.${ext}`]
        if (page) return await page()
    }
    error(404, `Couldn't find ${slug}`)
}
