import { getTourData, type TourLevel } from '#lib/tour/tourData.ts'
import type { PageLoad } from './$types'

export const prerender = true

const { lessons, units } = getTourData()

/** The list of units in each tour level */
type TourList = Record<
    TourLevel,
    { title: string; slug: string; lessons: { title: string; slug: string }[] }[]
>

export const load: PageLoad = () => {
    const tourData: TourList = { basic: [], advanced: [] }
    for (const path in lessons) {
        const [level, unitSlug, lesson] = path.split('/') as [TourLevel, string, string]
        let unit = tourData[level].find(({ slug }) => slug == unitSlug)
        if (!unit)
            tourData[level].push(
                (unit = {
                    title: units[level].find(({ slug }) => slug == unitSlug)!.title,
                    slug: unitSlug,
                    lessons: [],
                })
            )
        unit.lessons.push({ slug: lesson, title: lesson })
    }
    return tourData
}
