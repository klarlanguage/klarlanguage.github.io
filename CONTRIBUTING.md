# Klar Website Contributing Guide

We thank you for your interest in contributing to Klar's website!

Contributions should follow our [AI policy](https://github.com/ProCode-Software/klar/blob/main/CONTRIBUTING.md#using-ai) in the main Klar repo.

Quick links to some important topics:

- [Filing Issues & PRs](#filing-issues-prs)
- [Contributing to Docs](#writing-documentation)
- [Contributing to the Language Tour](#language-tour)
- [Contributing to the Blog](#blog-posts)

## Filing Issues & PRs

Issues can be related to public-facing content, or the code itself in this project. **Feature requests should be in the [discussions](https://github.com/ProCode-Software/klar/discussions) of the main Klar repo.** For changes to the architecture or the design of the source code, such as a suggestion to use a different algorithm, you can start with an issue.

Like in the rest of the Klar project, to add a new feature, approval via a GitHub issue is required before you can submit a PR.

## Development Guide

- We use [Vite+](https://viteplus.dev/) in this project for building and tasks.
- [SvelteKit](https://svelte.dev/docs/kit/introduction) is used as our web framework. Svelte components use TypeScript and vanilla CSS.
- Documentation, blog posts, and explainations in the tour are written wih [mdsvex](https://mdsvex.pngwn.io), an extension of Markdown that allows using Svelte components. Mdsvex files use the `.mdx` file extension.

```sh
bun install # Install dependencies

vpr dev # Watch (use --open to open in browser)
vpr build # Build website
vpr preview # View built website in browser
vp fmt # Format
vpr check:klar # Validate Klar files; see <> section
```

Make sure all source files are properly formatted before submitting your PR. Your code must also follow our
[style guide](https://github.com/ProCode-Software/klar/blob/main/CONTRIBUTING.md#code-style) from the main Klar repo.

## Writing Documentation

As mentioned in our AI policy, **no part of the Markdown documentation can be written by an LLM.**

### Documentation Frontmatter

```yaml
# Optional. Displayed under the title.
description: ''
```

Note that the title comes from the first heading in the file, not the frontmatter.

## Language Tour

## Blog Posts

**Only update blog posts you wrote, with some exceptions!** You may still fix typos or code errors in an article written by someone else. If an update is neccesary, such as adding clarification, file an issue tagging the person(s) who wrote the post.

**We allow guest submissions on our blog!** Before writing, open an issue explaining what you want to post, and samples of your previous writing, such as your personal blog. You must show writing that is developer related, though it doesn't have to be related to Klar. Once we approve your request, you can start writing your blog post and submit it via PR.

Klar maintainers may write blog posts without needing to open an issue. If you want input from others before writing your article, you may start a [discussion](https://github.com/ProCode-Software/klar/discussions) in the main Klar repo.

### Blog Post Frontmatter

```yaml
# People who helped write the post. Can be a single string, or an array of strings.
# Authors are hardcoded into the website, so ensure the display name is used for
# each author.
author: ProCode
# Optional. Can be a single string or a list
tags: Uncategorized
# Optional, but recommended. Displayed under the title.
description: ''
# An optional image to show for the post. Can be an online URL, or a file path
# relative to the file. Leave blank to use the default image.
image: ''
```

## Validating Klar Snippets

Run `vpr check:klar` to validate that all Klar files and Klar code blocks in Markdown files parse and typecheck correctly.

If you intentionally want a file or code snippet to fail to compile, put `// #expect-error` at the very top. Klar code with this will not be checked.
