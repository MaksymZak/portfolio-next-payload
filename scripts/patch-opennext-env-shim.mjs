/**
 * Payload imports `@next/env` as default (`import nextEnv from '@next/env'`).
 * OpenNext's shim only exported `loadEnvConfig` as a named export.
 * Upstream alias: @opennextjs/cloudflare bundle-server.js → shims/env.js
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const envShimPath = path.join(
  root,
  'node_modules/@opennextjs/cloudflare/dist/cli/templates/shims/env.js',
)

const marker = '/* opennext-env-shim-default-export */'

if (!existsSync(envShimPath)) {
  console.warn('[patch-opennext-env-shim] env.js not found — patch skipped')
  process.exit(0)
}

const source = readFileSync(envShimPath, 'utf8')

if (source.includes(marker)) {
  process.exit(0)
}

const patched = `${marker}
export function loadEnvConfig() {}

export default { loadEnvConfig }
`

writeFileSync(envShimPath, patched, 'utf8')
console.log('[patch-opennext-env-shim] Added default export to @next/env shim')
