// File type icons (except Klar/Klon) are from https://github.com/littensy/charmed-icons
//
// TODO: Design an icon for Klar and Klon and copy them to the base style so
// light variants can be generated
import { $ } from 'bun'
import { copyFileSync, existsSync, mkdtempDisposableSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

// 1. Clone the repo & generate the icons
// ==========

using cloneDir = mkdtempDisposableSync(join(tmpdir(), 'charmed-icons'))
const outDir = join(import.meta.dir, '../src/lib/assets/fileIcons')

await $`git clone https://github.com/littensy/charmed-icons.git ${cloneDir.path}`
$.cwd(cloneDir.path)
await $`pnpm install`.quiet()
await $`pnpm run generate`

const iconsPath = join(cloneDir.path, 'dist', 'themes')

// Extensions to add
const fileIconNames = new Set([
    '_file',
    '_folder',
    'typescript',
    'typescript-def',
    'javascript',
    'text',
    'test-blue',
    'test-yellow',
    'config',
    'test-blue',
    'test-yellow',
    'image',
    'json',
    'markdown',
    'node',
    'npm',
    'package-lock',
    'package-config',
    'readme',
    'security',
    'svg',
    'lock',
    'html',
    'css',
    'git',
    'license',
    'klar', // Custom
])

/** In the source directory, each item begins with `folder_` */
const folderIconNames = new Set([
    'assets',
    'bin',
    'config',
    'dist',
    'github',
    'javascript',
    'node',
    'package',
    'script',
    'source',
    'styles',
    'docs',
    'temp',
    'test',
    'typescript',
    'types',
    'web',
    'template',
    'lib',
])

for (const theme of ['base', 'light']) {
    const themeOutDir = join(outDir, theme == 'base' ? 'dark' : theme)
    // Files
    for (const fileName of fileIconNames) {
        const srcPath = join(iconsPath, theme, 'icons', fileName + '.svg')
        if (existsSync(srcPath))
            copyFileSync(srcPath, join(themeOutDir, fileName + '.svg'))
    }
    // Folders
    for (const name of folderIconNames) {
        const baseName = `folder_${name}.svg`
        const srcPath = join(iconsPath, theme, 'icons', baseName)
        if (existsSync(srcPath)) copyFileSync(srcPath, join(themeOutDir, baseName))
    }
}

// 2. Optimize the SVGs with svgo
// ===============

await $`bunx svgo ${outDir}/*/`.quiet()

// 3. Create list of associations
// ===============

// We aren't generating this because we want to keep only some extensions
// _makeAssociationsList()

async function _makeAssociationsList() {
    const themesJSON: {
        folderNames: Record<string, string>
        fileNames: Record<string, string>
        fileExtensions: Record<string, string>
    } = await Bun.file(join(cloneDir.path, 'dist', 'themes', 'base', 'theme.json')).json()

    const newThemesJSON: typeof themesJSON = {
        folderNames: {},
        fileNames: {},
        fileExtensions: {},
    }

    for (const prop of ['folderNames', 'fileNames', 'fileExtensions'] as const) {
        const map = themesJSON[prop]
        for (const [key, iconBaseName] of Object.entries(map)) {
            // Only keep the definitions for the icons we picked
            if (
                fileIconNames.has(iconBaseName)
                || (prop == 'folderNames'
                    && folderIconNames.has(iconBaseName.replace('folder_', '')))
            )
                newThemesJSON[prop][key] = iconBaseName
        }
    }

    await Bun.write(
        join(outDir, 'definitions.json'),
        JSON.stringify(newThemesJSON, null, 4)
    )
}
