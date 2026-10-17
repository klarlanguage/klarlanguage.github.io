<script lang="ts">
import { CalendarIcon, PersonIcon, TagIcon } from '@proicons/svelte'
import { parsePostAuthors } from '../postFrontmatter'
import postDates from '#/blog/dates.json' with { type: 'json' }
import type { PageProps } from './$types'

const { data, params }: PageProps = $props()
const { slug } = $derived(params)
const { title, tags, description, author } = $derived(
    data.text.metadata ?? { title: '', tags: '', description: '', author: [] }
)
const publishDate = $derived(new Date(postDates[slug]))
</script>

<div class="postHeader">
    <h1>{title}</h1>
    <p class="description">{description}</p>

    <div class="metadata">
        <div class="metaLine">
            <PersonIcon />
            {#each parsePostAuthors(author) as { name, url }, i}
                {#if i > 0},&nbsp;{/if}
                <a href={url}>{name}</a>
            {/each}
        </div>
        <div class="metaLine">
            <CalendarIcon />
            {publishDate.toLocaleDateString(undefined, { dateStyle: 'long' })}
        </div>
        <div class="metaLine">
            <TagIcon />
            {#each typeof tags == 'string' ? [tags] : tags as tag, i}
                {#if i > 0},&nbsp;{/if}
                <a href="/blog?tag={encodeURIComponent(tag)}">{tag}</a>
            {/each}
        </div>
    </div>
</div>

<!-- TODO: Remove the title from the content -->
<data.text.default />
