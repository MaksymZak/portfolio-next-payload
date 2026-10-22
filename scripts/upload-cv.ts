/**
 * Uploads the PDFs in ./cv-dist to the Cloudflare R2 bucket.
 *
 * Prerequisite: `bun run cv:generate`, and `wrangler login` once on this machine.
 *
 * Usage:
 *   bun run cv:upload
 *   CV_R2_BUCKET=other-bucket bun run cv:upload
 */
import 'dotenv/config'

import { spawn } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const OUT_DIR = path.resolve(process.cwd(), 'cv-dist')
const R2_BUCKET = process.env.CV_R2_BUCKET ?? 'portfolio-cv'

function runWrangler(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn('bun', ['x', 'wrangler', ...args], { stdio: 'inherit' })

    child.on('error', (error) => {
      reject(error)
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`wrangler exited with code ${code ?? 'unknown'}`))
    })
  })
}

async function main() {
  let fileNames: string[]
  try {
    const entries = await readdir(OUT_DIR)
    fileNames = entries.filter((name) => name.endsWith('.pdf')).sort()
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined
    if (code === 'ENOENT') {
      throw new Error(`No ${OUT_DIR}. Run bun run cv:generate first.`)
    }
    throw error
  }

  if (fileNames.length === 0) {
    throw new Error(`No PDFs in ${OUT_DIR}. Run bun run cv:generate first.`)
  }

  console.log(`[cv:upload] bucket: ${R2_BUCKET}`)

  for (const fileName of fileNames) {
    const filePath = path.join(OUT_DIR, fileName)
    console.log(`[cv:upload] ${fileName}`)
    await runWrangler([
      'r2',
      'object',
      'put',
      `${R2_BUCKET}/${fileName}`,
      '--remote',
      '--file',
      filePath,
      '--content-type',
      'application/pdf',
      '--content-disposition',
      `attachment; filename="${fileName}"`,
    ])
  }

  console.log(
    '\n[cv:upload] Done. NEXT_PUBLIC_CV_URL_EN / NEXT_PUBLIC_CV_URL_UK should already point at these object names.',
  )
}

main().catch((error) => {
  console.error('[cv:upload] ERROR', error instanceof Error ? error.message : error)
  process.exit(1)
})
