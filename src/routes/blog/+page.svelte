<script lang="ts">
import { CalendarIcon, PersonIcon, SearchIcon, TagIcon } from '@proicons/svelte'
import { parsePostAuthors } from './postFrontmatter.js'
import authorsList from '#/blog/authors.json' with { type: 'json' }
import postDates from '#/blog/dates.json' with { type: 'json' }

const { data: posts } = $props()

const allTags = $derived.by(() => {
    const allTags = new Set<string>()
    for (const { metadata } of Object.values(posts)) {
        const { tags } = metadata ?? { tags: [] }
        if (typeof tags == 'string') allTags.add(tags)
        else for (const tag of tags) allTags.add(tag)
    }
    return [...allTags].sort()
})

// TODO: Sort by publish date
</script>

<h1>Blog</h1>

<div class="searchGroup">
    <div class="inputGroup">
        <SearchIcon />
        <input type="search" name="q" id="searchBox" placeholder="Search the blog" />
    </div>
    <div class="inputGroup">
        <TagIcon />
        <select name="tag" id="tagSelection">
            <option value="">All tags</option>
            <hr />
            {#each allTags as tag}
                <option value={tag}>{tag}</option>
            {/each}
        </select>
    </div>
    <div class="inputGroup">
        <PersonIcon />
        <select name="author" id="authorSelection">
            <option value="">All authors</option>
            <hr />
            {#each Object.keys(authorsList) as author}
                <option value={author}>{author}</option>
            {/each}
        </select>
    </div>
</div>

<ul>
    {#each Object.entries(posts) as [path, { metadata }]}
        {@const cleanPath = path.slice(0, path.lastIndexOf('.'))}
        {@const slug = cleanPath.startsWith('./') ? cleanPath.slice(2) : cleanPath}
        {@const { title, tags, description, author } = metadata ?? {
            author: [],
            description: '',
            tags: '',
        }}
        {@const publishDate = postDates[slug]}
        <li>
            <article>
                <h2><a href="/blog/{slug}" aria-label={title}>{title}</a></h2>
                <div class="metadata">
                    <div class="metaLine">
                        <CalendarIcon />
                        {new Date(publishDate).toLocaleDateString(undefined, {
                            dateStyle: 'long',
                        })}
                    </div>
                    <div class="metaLine">
                        <PersonIcon />
                        {#each parsePostAuthors(author) as { name, url }, i}
                            {#if i > 0},&nbsp;{/if}
                            <a href={url}>{name}</a>
                        {/each}
                    </div>
                    <div class="metaLine">
                        <TagIcon />
                        {#each typeof tags == 'string' ? [tags] : tags as tag, i}
                            {#if i > 0},&nbsp;{/if}
                            <a href="?tag={encodeURIComponent(tag)}">{tag}</a>
                        {/each}
                    </div>
                </div>
                {#if description}<p>{description}</p>{/if}
            </article>
        </li>
    {/each}
</ul>
