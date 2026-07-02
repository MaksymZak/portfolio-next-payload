import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { collections } from '@/config/collections'
import { revalidateSiteCacheEndpoint } from '@/config/endpoints/revalidate-site-cache'
import { globals } from '@/config/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
  },
  admin: {
    user: collections.find((c) => c.slug === 'users')?.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      settingsMenu: ['@/components/admin/RevalidateCacheMenuItem#RevalidateCacheMenuItem'],
    },
  },
  collections: collections,
  globals,
  endpoints: [revalidateSiteCacheEndpoint],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
