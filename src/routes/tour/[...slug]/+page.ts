import { error, redirect } from '@sveltejs/kit'
import { getLessonFiles, getTourData } from '../tourData'
import { type MarkdownPage } from '#lib/loadMarkdown.js'
import type { PageLoad } from './$types'

export const prerender = true

export interface Slide {
    text: MarkdownPage
    files: Map<string, string>

    /** May be in a different unit */
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
    return {
        ...(await getLessonFiles(slug, lesson)),
        ...(await getPrevNextLessons(slug, parts[0])),
    } satisfies Slide
}

async function getPrevNextLessons(slug: string, level: string) {
    const slugs = Object.keys(lessons)

    let previous: SlideReference | null = null,
        next: SlideReference | null = null

    const i = slugs.indexOf(slug)
    if (i > 0) {
        const prevSlug = slugs[i - 1]
        const [prevLevel] = prevSlug.split('/', 1)
        const { text } = await getLessonFiles(prevSlug, lessons[prevSlug])
        if (prevLevel == level)
            previous = { slug: prevSlug, title: text.metadata?.title || '' }
    }
    if (i < slugs.length - 1) {
        const nextSlug = slugs[i + 1]
        const [nextLevel] = nextSlug.split('/', 1)
        const { text } = await getLessonFiles(nextSlug, lessons[nextSlug])
        if (nextLevel == level)
            next = { slug: nextSlug, title: text.metadata?.title || '' }
    }
    return { previous, next }
}
