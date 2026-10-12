import { error, redirect } from '@sveltejs/kit'
import { type MarkdownPage } from '#lib/loadMarkdown.js'
import { getLessonFiles, getTourData } from '#lib/tour/tourData.ts'
import type { PageLoad } from './$types'

export const prerender = true

export interface Slide {
    text: MarkdownPage
    files: Map<string, string>

    /** Within the lesson */
    index: number
    total: number
    /** May be in a different lesson */
    previous: SlideReference | null
    next: SlideReference | null
}

interface SlideReference {
    title: string
    slug: string
}

const { lessons } = getTourData()

export const load: PageLoad<Slide> = async ({ params: { slug }, url: _url }) => {
    slug = slug.replace('/index.html', '')
    const parts = slug.split('/')
    if (parts[0] != 'basic' && parts[0] != 'advanced')
        redirect(308, `/tour/basic/${slug}`)
    if (parts.length == 1) redirect(308, `/tour/${slug}/introduction/welcome`)
    if (parts.length == 2) {
        // TODO: Redirect to first lesson in the unit
    }

    const lesson = lessons[slug] ?? error(404, `Can't find ${slug}`)
    // Within all lessons in all levels
    // const indexAll = Object.keys(lessons).indexOf(slug)
    return {
        ...(await getLessonFiles(lesson)),
        index: 0,
        total: 0,
        previous: null,
        next: null,
    } satisfies Slide
}
