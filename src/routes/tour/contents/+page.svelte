<script lang="ts">
import type { PageProps } from './$types'

const { data: tours }: PageProps = $props()
const tourNames = { basic: 'Basic', advanced: 'Advanced' } as const
</script>

<h1>Table of Contents</h1>

{#each Object.entries(tourNames) as [levelSlug, levelName]}
    <h2 id={levelSlug}><a href="/tour/{levelSlug}">{levelName}</a></h2>
    {@const units: (typeof tours)[keyof typeof tours] = tours[levelSlug]}
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
