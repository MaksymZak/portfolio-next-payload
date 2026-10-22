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
 * Then upload with `bun run cv:upload`. Production env vars
 * NEXT_PUBLIC_CV_URL_EN / NEXT_PUBLIC_CV_URL_UK should point at those object URLs.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const BASE_URL = (process.env.CV_SOURCE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
const OUT_DIR = path.resolve(process.cwd(), 'cv-dist')
const LOCALES = ['en', 'uk'] as const

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

  console.log(`\n[cv:generate] Done (${fileNames.join(', ')}). Upload with: bun run cv:upload`)
}

main().catch((error) => {
  console.error('[cv:generate] ERROR', error)
  process.exit(1)
})
