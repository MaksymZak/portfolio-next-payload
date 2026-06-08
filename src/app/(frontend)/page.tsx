import { redirect } from 'next/navigation'

import { defaultPortfolioLocale, getPortfolioHomePath } from '@/lib/portfolio/routes'

export default function FrontendIndexPage() {
  redirect(getPortfolioHomePath(defaultPortfolioLocale))
}
