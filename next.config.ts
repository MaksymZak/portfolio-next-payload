import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import path from 'path'
import { fileURLToPath } from 'url'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // OpenNext + Payload on Cloudflare: keep workerd-specific and migration tooling external.
  // https://opennext.js.org/cloudflare/howtos/workerd
  // https://github.com/opennextjs/opennextjs-cloudflare/issues/263
  serverExternalPackages: [
    '@payloadcms/db-postgres',
    '@payloadcms/drizzle',
    '@cloudflare/puppeteer',
    'drizzle-kit',
    'jose',
    'pg',
    'pg-cloudflare',
    'prettier',
    'puppeteer-core',
  ],
  outputFileTracingExcludes: {
    '*': [
      '**/node_modules/puppeteer-core/**',
      '**/node_modules/payload/dist/bin/**',
    ],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(withNextIntl(nextConfig), { devBundleServerPackages: false })

// Bindings stub for `next dev` only — skip during production build (opennextjs-cloudflare build)
if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare').then((m) => m.initOpenNextCloudflareForDev())
}
