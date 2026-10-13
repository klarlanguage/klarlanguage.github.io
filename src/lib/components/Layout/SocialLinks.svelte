<script>
import { BlueskyIcon, GitHubIcon, XTwitterIcon } from '@proicons/svelte'
import * as socialLinks from '#lib/socialLinks.ts'
</script>

<ul class="social-links">
    <li>
        <a href={socialLinks.github} title="Follow us on GitHub: @klarlanguage"
            ><GitHubIcon /></a>
    </li>
    <li>
        <a
            href={socialLinks.bluesky}
            title="Follow us on Bluesky: @klarlanguage.bsky.social"><BlueskyIcon /></a>
    </li>
    <li>
        <a href={socialLinks.twitter} title="Follow us on X/Twitter: @KlarLanguage"
            ><XTwitterIcon /></a>
    </li>
</ul>

<style>
.social-links {
    list-style-type: none;
    display: flex;
    align-items: center;
}
</style>
