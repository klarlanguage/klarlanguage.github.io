import unitNames from '#/tour/units.json' with { type: 'json' }

export type TourLevel = 'basic' | 'advanced'

export interface TourData {
    /**
     * Files in each lesson, including the Markdown file. Keys are in the format `<basic |
     * advanced>/<unit>/<slide>`
     */
    lessons: Record<string, [string, () => Promise<string>][]>
    units: Record<TourLevel, { title: string; slug: string }[]>
}

export function getTourData(): TourData {
    const allTourFiles = import.meta.glob('#/tour/*/**', {
        // So Klar, JS files, and assets are imported as text. Markdown will be
        // imported specially later
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
    const units: TourData['units'] = { basic: [], advanced: [] }
    // Remove the indices from the filesystem path
    const lessonGroups = Object.fromEntries(
        Object.entries(orderedLessonGroups).map(([lesson, files]) => {
            const { tour, unitIndex, unit, _slideIndex, slide } =
                lessonRegex.exec(lesson)!.groups!

            // Add title for the unit. On the filesystem, unit names are 1-indexed
            units[tour as TourLevel][+unitIndex - 1] ??= {
                title: unitNames[tour as TourLevel][+unitIndex - 1],
                slug: unit,
            }
            // TODO: Add references to previous and next *slide*
            return [`${tour}/${unit}/${slide}`, files!]
        })
    )
    return { lessons: lessonGroups, units } satisfies TourData
}
