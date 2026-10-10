import { error, redirect } from '@sveltejs/kit'
import { markdownExtensions, type MarkdownPage } from '#lib/loadMarkdown.js'
import type { PageLoad } from './$types'

export const prerender = true

export interface Slide {
    text: MarkdownPage
    files: Record<string, string>

    index: number
    previous: SlideReference | null
    next: SlideReference | null
}

interface SlideReference {
    title: string
    slug: string
}

function makeTourGroups() {
    const allTourFiles = import.meta.glob('#/tour/*/**', {
        // So Klar, JS files, and assets are imported as text. Markdown will be imported specially later
        query: '?raw',
        import: 'default',
    })
    // Group by <basic | advanced>/<unit>/<slide>
    // unit and slide include the number
    const orderedLessonGroups = Object.groupBy(Object.entries(allTourFiles), ([path]) => {
        const parts = path.slice('/tour/'.length).split('/')
        return parts.slice(0, 3).join('/')
    })
    const lessonRegex =
        /^(?<tour>[\w-]+)\/(?<unitIndex>\d+)-(?<unit>[\w-]+)\/(?<slideIndex>\d+)-(?<slide>[\w-]+)/
    // Remove the indices from the filesystem path
    const lessonGroups = Object.fromEntries(
        Object.entries(orderedLessonGroups).map(([lesson, files]) => {
            const { tour, _unitIndex, unit, _slideIndex, slide } =
                lessonRegex.exec(lesson)!.groups!
            // TODO: Add references to previous and next *slide*
            return [`${tour}/${unit}/${slide}`, files]
        })
    )
    return lessonGroups
}
const lessonGroups = makeTourGroups()

export const load: PageLoad<Slide> = async ({ params: { slug }, url: _url }) => {
    console.log(slug)
    console.log(lessonGroups)
    slug = slug.replace('/index.html', '')
    const parts = slug.split('/')
    if (parts[0] != 'basic' && parts[0] != 'advanced') redirect(308, `basic/${slug}`)

    const lesson = lessonGroups[slug] ?? error(404, `Can't find ${slug}`)
    const mdFile = lesson.find(([path]) =>
        markdownExtensions.some(ext => path.endsWith(`index.${ext}`))
    )
    if (!mdFile) throw new Error(`No Markdown file for lesson ${slug}`)

    const files: Record<string, string> = {}
    for (let [path, file] of lesson) {
        if (path == mdFile[0]) continue
        // Only keep the basename and optionally the submodule within the lesson
        path = path.slice('/tour/'.length).split('/').slice(3).join('/')
        files[path] = await file()
    }
    return {
        text: (await import(mdFile[0])) as MarkdownPage,
        files,
        index: 0,
        previous: null,
        next: null,
    }
}
