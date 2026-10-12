<script lang="ts">
import { page } from '$app/state'
import SocialLinks from './SocialLinks.svelte'
</script>

<header>
    <h1><a href="/">Klar</a></h1>
    <input type="search" placeholder="Search" />
    <nav>
        <ul>
            {#snippet link(text: string, url: string)}
                <li class={{ active: page.url.pathname == url }}>
                    <a href={url}>{text}</a>
                </li>
            {/snippet}

            {@render link('Docs', '/docs')}
            {@render link('Tour', '/tour')}
            {@render link('Playground', '/playground')}
            {@render link('Blog', '/blog')}
            {@render link('Community', '/community')}
            {@render link('Packages', '/packages')}
        </ul>
    </nav>

    <SocialLinks />
    <a href="/install"><button>Install</button></a>
</header>

<style>
header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

nav ul {
    display: flex;
    list-style-type: none;
    gap: 10px;
    align-items: center;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>
