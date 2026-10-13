<script lang="ts">
import type { PageProps } from './$types'

const { data: units, params }: PageProps = $props()
const { level } = $derived(params)
const levelName = $derived(level == 'basic' ? 'Basic' : 'Advanced')
</script>

<svelte:head>
    <title>{levelName} Tour | Klar Language Tour</title>
</svelte:head>

<div class="container">
    <menu>
        {#each Object.entries(units.units) as [unitSlug, lessons]}
            <li>
                <a href="#{unitSlug}">{units.unitTitles.get(unitSlug)}</a>
                <ol>
                    {#each lessons as [lessonSlug, { text }]}
                        <li>
                            <a href="#{unitSlug}_{lessonSlug}"
                                >{text.metadata?.title || lessonSlug}</a>
                        </li>
                    {/each}
                </ol>
            </li>
        {/each}
    </menu>

    <main>
        <h1>{levelName} Tour</h1>
        {#each Object.entries(units.units) as [unitSlug, lessons], i}
            {#if i > 0}<hr />{/if}
            <section id={unitSlug}>
                <h3 class="unitTitle">{units.unitTitles.get(unitSlug)}</h3>
                {#each lessons as [lessonSlug, { text, files }]}
                    <article id="{unitSlug}_{lessonSlug}">
                        <text.default />
                        {void files}
                        <!-- TODO: Tabbed code block with files -->
                    </article>
                {/each}
            </section>
        {/each}
    </main>
</div>
