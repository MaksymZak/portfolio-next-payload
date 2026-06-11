import { useTranslations } from 'next-intl'

export function SkipToContent() {
  const t = useTranslations('Shell')

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
    >
      {t('skipToContent')}
    </a>
  )
}
