import { getTranslations } from 'next-intl/server'

export async function SkipLink() {
  const t = await getTranslations('a11y')

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:border-2 focus:border-foreground focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-[10px] focus:font-bold focus:tracking-widest focus:text-foreground focus:uppercase focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
    >
      {t('skipToContent')}
    </a>
  )
}
