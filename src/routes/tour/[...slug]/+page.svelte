<script lang="ts">
import type { PageProps } from './$types'

let { data }: PageProps = $props()
</script>

<div class="container">
    <div class="body">
        <data.text.default />
    </div>
    <div class="editor"></div>
</div>
