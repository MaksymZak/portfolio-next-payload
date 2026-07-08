/**
 * Generates both CV PDFs by calling the local /api/cv route (which renders the
 * resume page in your locally installed Chrome) and writes them to ./cv-dist/.
 *
 * Prerequisite: dev server running (`bun run dev`).
 *
 * Usage:
 *   bun run cv:generate                                 # uses http://localhost:3000
 *   CV_SOURCE_URL=https://example.com bun run cv:generate
 *
 * Upload the results to the R2 bucket, then point the production env vars
 * NEXT_PUBLIC_CV_URL_EN / NEXT_PUBLIC_CV_URL_UK at the public object URLs.
 * The script prints ready-to-run wrangler commands after generating.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const BASE_URL = (process.env.CV_SOURCE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const OUT_DIR = path.resolve(process.cwd(), 'cv-dist')
const LOCALES = ['en', 'uk'] as const
const R2_BUCKET = process.env.CV_R2_BUCKET ?? 'portfolio-cv'

async function generate(locale: (typeof LOCALES)[number]): Promise<string> {
  const url = `${BASE_URL}/api/cv?locale=${locale}`
  const response = await fetch(url)

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`${url} responded ${response.status}: ${body.slice(0, 200)}`)
  }

  const disposition = response.headers.get('content-disposition')
  const fileName =
    disposition?.match(/filename="([^"]+)"/)?.[1] ?? `CV_${locale.toUpperCase()}.pdf`

  const filePath = path.join(OUT_DIR, fileName)
  await writeFile(filePath, Buffer.from(await response.arrayBuffer()))
  console.log(`[cv:generate] ${locale} → ${filePath}`)

  return fileName
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  console.log(`[cv:generate] source: ${BASE_URL}`)

  const fileNames: string[] = []
  for (const locale of LOCALES) {
    fileNames.push(await generate(locale))
  }

  console.log('\n[cv:generate] Done. Upload to R2 (Content-Disposition forces download):\n')
  for (const fileName of fileNames) {
    console.log(
      `  bunx wrangler r2 object put "${R2_BUCKET}/${fileName}" --remote --file "cv-dist/${fileName}" \\`,
    )
    console.log(`    --content-type application/pdf --content-disposition 'attachment; filename="${fileName}"'`)
    console.log()
  }
  console.log(
    '[cv:generate] Then verify NEXT_PUBLIC_CV_URL_EN / NEXT_PUBLIC_CV_URL_UK point at the public bucket URLs.',
  )
}

main().catch((error) => {
  console.error('[cv:generate] ERROR', error)
  process.exit(1)
})
