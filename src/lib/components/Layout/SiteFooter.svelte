<script>
import SocialLinks from './SocialLinks.svelte'
</script>

<footer>
    <ul class="get-started">
        <span>Get started</span>
        <li><a href="/tour">Tour</a></li>
        <li><a href="/install">Install</a></li>
        <li><a href="/playground">Playground</a></li>
        <li><a href="/community">Community</a></li>
    </ul>
    <ul class="reference">
        <span>Reference</span>
        <li><a href="/docs">Documentation</a></li>
        <li><a href="/packages">Package documentation</a></li>
    </ul>
    <ul class="contribute">
        <span>Contribute</span>
        <li>
            <a
                href="https://github.com/ProCode-Software/klar/discussions/categories/general"
                >Send feedback</a>
        </li>
        <li>
            <a href="https://github.com/ProCode-Software/klar">Compiler source code</a>
        </li>
        <li>
            <a href="https://github.com/klarlanguage/klarlanguage.github.io"
                >Website source code</a>
        </li>
        <li>
            <a
                href="https://github.com/ProCode-Software/klar/discussions/categories/ideas"
                >Feature requests</a>
        </li>
        <li><a href="https://github.com/ProCode-Software/klar/issues">Issues</a></li>
    </ul>
    <ul class="about">
        <span>About</span>
        <li><a href="/docs/about/why-klar">Why Klar?</a></li>
        <li><a href="/docs/about/faq">Frequently asked questions</a></li>
        <li><a href="https://github.com/ProCode-Software">ProCode Software</a></li>
    </ul>

    <div class="message">
        Made with 💚 and Black Excellence by <a href="https://github.com/ProCode-Software"
            >ProCode</a>
    </div>
    <div class="copyright">
        Copyright &copy; {new Date().getFullYear()}
        <a href="https://github.com/ProCode-Software">ProCode Software</a>
    </div>
    <SocialLinks />
</footer>

<style>
footer {
    width: 100%;
    display: grid;
    grid-template:
        'get-started reference contribute about' auto
        'message message message message' auto
        'copyright copyright copyright social-links' auto;
}
@container (width < 600px) {
    footer {
        display: flex;
        flex-direction: column;
    }
}
.get-started {
    grid-area: get-started;
}
.reference {
    grid-area: reference;
}
.contribute {
    grid-area: contribute;
}
.about {
    grid-area: about;
}
.message {
    grid-area: message;
}
.copyright {
    grid-area: copyright;
}
:global(.social-links) {
    grid-area: social-links;
}
</style>
