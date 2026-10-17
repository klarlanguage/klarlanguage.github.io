import { error } from '@sveltejs/kit'
import { getLessonFiles, getTourData } from '../../tourData'
import type { MarkdownPage } from '#lib/loadMarkdown.ts'
import type { PageLoad } from './$types'

// Keys are unit slugs. Values are lessons, with no slashes
type AllUnits = Record<
    string,
    Map<string, { text: MarkdownPage; files: Map<string, string> }>
>

export const load: PageLoad = async ({ params: { level } }) => {
    if (level != 'basic' && level != 'advanced')
        error(404, `Invalid tour level: ${level}`)

    const { lessons, units } = getTourData()
    const allUnits: AllUnits = {}

    for (const fullSlug in lessons) {
        const [lessonLevel, unitSlug, lessonSlug] = fullSlug.split('/')
        if (lessonLevel == level)
            (allUnits[unitSlug] ??= new Map()).set(
                lessonSlug,
                await getLessonFiles(fullSlug, lessons[fullSlug])
            )
    }
    const unitTitles = new Map(units[level].map(({ slug, title }) => [slug, title]))
    return { units: allUnits, unitTitles }
}
