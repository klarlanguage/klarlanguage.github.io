import authors from '#/blog/authors.json' with { type: 'json' }

/** See CONTRIBUTING.md */
export interface PostMetadata {
    author: string | string[]
    tags: string | string[]
    description?: string
}

export function parsePostAuthors(
    author: string | string[]
): { name: string; url: string }[] {
    return (typeof author == 'string' ? [author] : author).map(name => {
        const url = (authors as Record<string, string>)[name]
        if (!url) throw new Error(`Author '${name}' not defined in authors.json`)
        return { name, url }
    })
}
