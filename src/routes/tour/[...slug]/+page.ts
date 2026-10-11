import { error, redirect } from '@sveltejs/kit'
import { markdownExtensions, type MarkdownPage } from '#lib/loadMarkdown.js'
import { getTourData } from '#lib/tour/tourData.ts'
import type { PageLoad } from './$types'

export const prerender = true

export interface Slide {
    text: MarkdownPage
    files: Record<string, string>

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

    const lesson = lessons[slug] ?? error(404, `Can't find ${slug}`)
    // Within all lessons in all levels
    // const indexAll = Object.keys(lessons).indexOf(slug)
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
        total: 0,
        previous: null,
        next: null,
    } satisfies Slide
}
