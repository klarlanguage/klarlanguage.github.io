import { read } from '$app/server'
import { error } from '@sveltejs/kit'
import type { MarkdownPage } from '$lib/loadMarkdown'
import type { PageLoad } from './$types'

export const prerender = true

export interface Slide {
    text: MarkdownPage
    files: Record<string, string>
}

export const load: PageLoad = async ({ params: { slug }, url }) => {
    console.log(import.meta.glob('/tour/*'))
    error(404, `Can't find ${slug}`)
}
