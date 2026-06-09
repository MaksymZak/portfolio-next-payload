import { useTranslations } from 'next-intl'

import { siteContacts, siteName } from '@/config/site'

export function SiteFooter() {
  const t = useTranslations('Footer')
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 sm:grid-cols-2">
        <div>
          <p className="font-mono text-sm font-semibold">{siteName}</p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t('availability')}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {t('contactsLabel')}
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {siteContacts.map((channel) => {
              const isExternal = channel.href.startsWith('http')
              return (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="text-foreground">{channel.label}</span>
                    <span aria-hidden="true"> — </span>
                    {channel.value}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-6 py-4 font-mono text-xs text-muted-foreground">
          © {year} {siteName}. {t('rights')}
        </div>
      </div>
    </footer>
  )
}
