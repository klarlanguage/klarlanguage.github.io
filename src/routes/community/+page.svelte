<script lang="ts">
import * as socialLinks from '#lib/socialLinks.ts'
</script>

<h1>Community</h1>

<ul>
    <li>
        <a href="https://github.com/ProCode-Software/klar/discussions">
            <span class="title">GitHub discussions</span>
            <p>
                The official space for asking questions and showing off your work. You can
                also send feedback and feature requests about Klar. The maintainers are
                available!
            </p>
        </a>
    </li>
</ul>

<h2 id="follow-klar">Follow Klar on social media!</h2>
<p>Follow our offical account to stay informed on language updates</p>

{#snippet officialSocialLink(platform: string, username: string, url: string)}
    <li>
        <a href={url} title="Follow {username} on {platform}">
            <!-- <img
                src="#lib/assets/social/{platform.toString()}.svg"
                alt="{platform} logo" /> -->
            <span class="platform">{platform}</span>
            <span class="username">{username}</span>
        </a>
    </li>
{/snippet}

<ul>
    {@render officialSocialLink(
        'Bluesky',
        '@klarlanguage.bsky.social',
        socialLinks.twitter
    )}
    {@render officialSocialLink('GitHub', 'klarlanguage', socialLinks.twitter)}
    {@render officialSocialLink('X/Twitter', '@KlarLanguage', socialLinks.twitter)}
</ul>

<h2>Contribute to the Klar project</h2>
<p>
    Klar is open-source, and contributions are welcome. Your contriutions are appreciated!
</p>

<ul></ul>
