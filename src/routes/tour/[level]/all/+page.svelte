<script lang="ts">
import type { PageProps } from './$types'

const { data: units, params }: PageProps = $props()
const { level } = $derived(params)
const levelName = $derived(level == 'basic' ? 'Basic' : 'Advanced')

let i = 0
</script>

<svelte:head>
    <title>{levelName} Tour | Klar Language Tour</title>
</svelte:head>

<h1>{levelName} Tour</h1>

{#each Object.entries(units.units) as [unitSlug, lessons], i}
    {#if i > 0}<hr />{/if}
    <section id={unitSlug}>
        <h3 class="unitTitle">{units.unitTitles[unitSlug]}</h3>
        {#each lessons as [lessonSlug, { text, files }]}
            <article id="{unitSlug}-{lessonSlug}">
                <h1>{text.metadata?.title || lessonSlug}</h1>
                <text.default />
            </article>
        {/each}
    </section>
{/each}
