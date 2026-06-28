import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { CvJson } from './types'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(dirname, '../../..')

export const cv = JSON.parse(
  readFileSync(path.join(rootDir, '.cursor/docs/cv.json'), 'utf-8'),
) as CvJson
