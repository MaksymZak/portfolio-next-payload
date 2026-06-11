import type { Locale } from '@/i18n/routing'

export const siteName = 'Maksym Zakaliuzhnyi'

export type ContactChannelId = 'email' | 'telegram' | 'linkedin' | 'github'

export type ContactChannel = {
  id: ContactChannelId
  label: string
  value: string
  href: string
}

/**
 * Public contact channels shown in the site shell (footer).
 * Phone number and physical location are intentionally NOT here — they are
 * resume-only per the project scope. No private repository is referenced.
 */
export const siteContacts: ContactChannel[] = [
  {
    id: 'email',
    label: 'Email',
    value: 'zaksumy1989@gmail.com',
    href: 'mailto:zaksumy1989@gmail.com',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    value: '@MaksymZak',
    href: 'https://t.me/MaksymZak',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mzakaliuzhnyi/',
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'GitHub',
    href: 'https://github.com/MaksymZak',
  },
]

/** In-page section anchors used by the shell navigation (homepage sections land here later). */
export const navSections = ['work', 'experience', 'contact', 'resume'] as const

export type NavSection = (typeof navSections)[number]

export function getHomeAnchor(locale: Locale, section: NavSection): string {
  return `/${locale}#${section}`
}

/** Primary navigation order. `messageKey` maps to `Nav.*` message keys. */
export const navItems: { section: NavSection; messageKey: NavSection }[] = [
  { section: 'work', messageKey: 'work' },
  { section: 'experience', messageKey: 'experience' },
  { section: 'resume', messageKey: 'resume' },
  { section: 'contact', messageKey: 'contact' },
]
