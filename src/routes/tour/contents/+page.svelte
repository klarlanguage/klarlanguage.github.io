<script lang="ts">
import type { PageData, PageProps } from './$types'

const { data: tours }: PageProps = $props()
</script>

<svelte:head>
    <title>Table of Contents | Klar Language Tour</title>
</svelte:head>

<h1>Table of Contents</h1>

{#each ['Basic', 'Advanced'] as levelName}
    {@const levelSlug = levelName.toLowerCase()}
    <h2 id={levelSlug}><a href="/tour/{levelSlug}">{levelName}</a></h2>
    <p><a href="/tour/{levelSlug}/all">View everything in one page</a></p>
    {@const units = tours[levelSlug as 'basic' | 'advanced']}
    <ol>
        {#each units as { title: unitTitle, slug: unitSlug, lessons }}
            <li>
                {unitTitle}
                <ol>
                    {#each lessons as { slug, title }}
                        <li><a href="/tour/{levelSlug}/{unitSlug}/{slug}">{title}</a></li>
                    {/each}
                </ol>
            </li>
        {/each}
    </ol>
{/each}
