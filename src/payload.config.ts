import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
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
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  plugins: [
    // Cloudflare R2 via S3-compatible API. Falls back to local ./media storage
    // when R2_BUCKET is not set (local dev without R2 credentials).
    s3Storage({
      enabled: Boolean(process.env.R2_BUCKET),
      // Keep the per-document `prefix` (folder) field in the schema even
      // without a collection-level prefix, so its value is persisted.
      alwaysInsertFields: true,
      collections: {
        media: process.env.R2_PUBLIC_URL
          ? {
              // Serve files straight from the R2 public domain instead of
              // proxying through Payload — requires a public bucket URL.
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) => {
                const key = prefix ? `${prefix}/${filename}` : filename
                return `${process.env.R2_PUBLIC_URL}/${key}`
              },
            }
          : true,
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
})
