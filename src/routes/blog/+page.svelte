<script lang="ts">
import type { PageProps } from './$types'

const { data: posts }: PageProps = $props()

// TODO: Sort by publish date
</script>

<h1>Blog</h1>

<ul>
    {#each Object.entries(posts) as [path, post]}
        {@const slug = path.slice(0, path.lastIndexOf('.'))}
        <li>
            <a href="/blog/{slug.slice(0, slug.lastIndexOf('.'))}" aria-label={slug}
                >{slug}</a>
        </li>
    {/each}
</ul>
