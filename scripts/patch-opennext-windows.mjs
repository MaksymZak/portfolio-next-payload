/**
 * OpenNext on Windows fails with EPERM when recreating traced symlinks (e.g. pg).
 * Upstream: https://github.com/opennextjs/opennextjs-cloudflare/issues/577
 * No-op on Linux/macOS (CI builds do not need this).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

if (process.platform !== 'win32') {
  process.exit(0)
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const copyTracedFilesPath = path.join(
  root,
  'node_modules/@opennextjs/aws/dist/build/copyTracedFiles.js',
)

if (!existsSync(copyTracedFilesPath)) {
  console.warn('[patch-opennext-windows] copyTracedFiles.js not found — patch skipped')
  process.exit(0)
}

const marker = '/* opennext-windows-symlink-patch */'
const source = readFileSync(copyTracedFilesPath, 'utf8')

if (source.includes(marker)) {
  process.exit(0)
}

const original = `        if (symlink) {
            try {
                symlinkSync(symlink, to);
            }
            catch (e) {
                if (e.code !== "EEXIST") {
                    throw e;
                }
            }
        }`

const patched = `${marker}
        if (symlink) {
            try {
                if (process.platform === "win32") {
                    const linkTarget = path.isAbsolute(symlink)
                        ? symlink
                        : path.resolve(path.dirname(from), symlink);
                    symlinkSync(linkTarget, to, "junction");
                }
                else {
                    symlinkSync(symlink, to);
                }
            }
            catch (e) {
                if (e.code === "EEXIST") {
                    // already linked
                }
                else if (process.platform === "win32" && (e.code === "EPERM" || e.code === "ENOENT")) {
                    cpSync(from, to, { recursive: true, dereference: true });
                }
                else {
                    throw e;
                }
            }
        }`

if (!source.includes(original)) {
  console.warn('[patch-opennext-windows] copyTracedFiles.js layout changed — patch skipped')
  process.exit(0)
}

writeFileSync(copyTracedFilesPath, source.replace(original, patched), 'utf8')
console.log('[patch-opennext-windows] Applied Windows symlink patch to copyTracedFiles.js')
