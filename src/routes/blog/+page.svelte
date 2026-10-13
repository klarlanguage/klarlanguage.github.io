<script lang="ts">
import { CalendarIcon, PersonIcon, SearchIcon, TagIcon } from '@proicons/svelte'
import { getPostAuthors } from './postFrontmatter.js'
import authors from '#/blog/authors.json' with { type: 'json' }

const { data: posts } = $props()

const allTags = $derived.by(() => {
    const allTags = new Set<string>()
    for (const {
        metadata: { tags },
    } of Object.values(posts)) {
        if (typeof tags == 'string') {
            allTags.add(tags)
            return
        }
        for (const tag of tags) allTags.add(tag)
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
            {#each Object.keys(authors) as author}
                <option value={author}>{author}</option>
            {/each}
        </select>
    </div>
</div>

<ul>
    {#each Object.entries(posts) as [path, { metadata }]}
        {@const slug = path.slice(0, path.lastIndexOf('.'))}
        {@const title = metadata?.title || slug}
        <li>
            <article>
                <h2><a href="/blog/{slug}" aria-label={title}>{title}</a></h2>
                <div class="metadata">
                    <div class="metaLine">
                        <CalendarIcon />
                        Date
                    </div>
                    <div class="metaLine">
                        <PersonIcon />
                        {#each getPostAuthors(metadata) as { name, url }, i}
                            {#if i > 0},&nbsp;{/if}
                            <a href={url}>{name}</a>
                        {/each}
                    </div>
                    <div class="metaLine">
                        <TagIcon />
                        {#each typeof metadata.tags == 'string' ? [metadata.tags] : metadata.tags as tag, i}
                            {#if i > 0},&nbsp;{/if}
                            <a href="?tag={encodeURIComponent(tag)}">{tag}</a>
                        {/each}
                    </div>
                </div>
                {#if metadata?.description}
                    <p>{metadata.description}</p>
                {/if}
            </article>
        </li>
    {/each}
</ul>
