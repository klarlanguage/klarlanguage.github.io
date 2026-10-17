import unitNames from '#/tour/units.json' with { type: 'json' }
import { type MarkdownPage, markdownExtensions } from '#lib/loadMarkdown.ts'

export type TourLevel = 'basic' | 'advanced'

export interface TourData {
    /**
     * Files in each lesson, including the Markdown file. Keys are in the format `<basic |
     * advanced>/<unit>/<slide>`
     */
    lessons: Record<string, [string, () => Promise<string>][]>
    units: Record<TourLevel, { title: string; slug: string }[]>
}

const lessonRegex =
    /^(?<tour>[\w-]+)\/(?<unitIndex>\d+)-(?<unit>[\w-]+)\/(?<slideIndex>\d+)-(?<slide>[\w-]+)/

export function getTourData(): TourData {
    const allTourFiles = import.meta.glob(['#/tour/*/**', '!**/index.{md,mdx,svx}'], {
        // So Klar, JS files, and assets are imported as text. Markdown will be
        // imported specially later
        query: '?raw',
        import: 'default',
        base: '/tour',
    })
    // Group by <basic | advanced>/<unit>/<slide>
    // unit and slide include the number
    const orderedLessonGroups = Object.groupBy(Object.entries(allTourFiles), ([path]) =>
        path.split('/').slice(1, 4).join('/')
    ) // Originally starts with './'
    const units: TourData['units'] = { basic: [], advanced: [] }
    // Remove the indices from the filesystem path
    const lessonGroups = Object.fromEntries(
        Object.entries(orderedLessonGroups).map(([lesson, files]) => {
            const match = lessonRegex.exec(lesson)
            if (!match)
                throw new Error(
                    `Invalid lesson file structure: ${JSON.stringify(lesson)}`
                )
            const { tour, unitIndex, unit, slide } = match.groups!

            // Add title for the unit. On the filesystem, unit names are 1-indexed
            units[tour as TourLevel][+unitIndex - 1] ??= {
                title: unitNames[tour as TourLevel][+unitIndex - 1],
                slug: unit,
            }
            return [`${tour}/${unit}/${slide}`, files!]
        })
    )
    return { lessons: lessonGroups, units } satisfies TourData
}

function getTourMarkdownFiles() {
    const tourMdFiles = import.meta.glob('#/tour/*/**/index.{md,svx,mdx}', {
        import: 'default',
        base: '/tour',
    }) as Record<string, () => Promise<MarkdownPage>>

    const lessonGroups = Object.fromEntries(
        Object.entries(tourMdFiles).map(([lesson, file]) => {
            lesson = lesson.split('/').slice(1, 4).join('/')
            const match = lessonRegex.exec(lesson)
            if (!match)
                throw new Error(
                    `Invalid lesson file structure: ${JSON.stringify(lesson)}`
                )
            const { tour, unit, slide } = match.groups!
            return [`${tour}/${unit}/${slide}`, file!]
        })
    )
    return lessonGroups
}

const markdownFiles = getTourMarkdownFiles()

export async function getLessonFiles(
    slug: string,
    lessonFiles: [string, () => Promise<string>][]
): Promise<{ text: MarkdownPage; files: Map<string, string> }> {
    const mdFile = markdownFiles[slug]
    if (!mdFile) throw new Error(`No Markdown file for lesson ${slug}`)

    const files = new Map<string, string>()
    for (let [path, file] of lessonFiles) {
        // Only keep the basename and optionally the submodule within the lesson
        path = path.slice('/tour/'.length).split('/').slice(3).join('/')
        files.set(path, await file())
    }
    return { text: (await mdFile()) as MarkdownPage, files }
}
