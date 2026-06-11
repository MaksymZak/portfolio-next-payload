import { redirect } from 'next/navigation'

import { routing } from '@/i18n/routing'

// Fallback for `/` if the i18n middleware did not run. Normally the middleware
// rewrites `/` to the default locale before this renders.
export default function FrontendIndexPage() {
  redirect(`/${routing.defaultLocale}`)
}
