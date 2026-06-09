import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all public frontend pathnames except:
  // - Payload admin (`/admin`) and API (`/api`)
  // - Next internals (`/_next`, `/_vercel`)
  // - files with an extension (e.g. `favicon.ico`)
  matcher: '/((?!api|admin|trpc|_next|_vercel|.*\\..*).*)',
}
