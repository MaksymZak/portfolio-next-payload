'use client'

import { ArrowUpRight, Copy, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ComponentType, SVGProps } from 'react'
import { useCallback, useMemo } from 'react'

import { GithubIcon, LinkedinIcon, TelegramIcon } from '@/components/ui/brand-icons'
import { Card } from '@/components/ui/card'
import { MonoLabel } from '@/components/ui/mono-label'
import { SectionTag } from '@/components/ui/section-tag'
import { useToast } from '@/components/ui/toast'
import { approvedMotionR20 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
import { HOME_SECTION_SCROLL_MT } from '@/lib/home-scroll'
import type { Setting } from '@/payload-types'

type ContactItem = NonNullable<Setting['contacts']>[number]

type ContactProps = {
  contacts: Setting['contacts']
}

type ContactIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>

const CONTACT_ICONS: Record<ContactItem['type'], ContactIcon> = {
  phone: Phone,
  mail: Mail,
  telegram: TelegramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  map: MapPin,
}

function stripNavNumber(label: string): string {
  return label.replace(/^\d+\s+/, '')
}

function getEmailForClipboard(url: string, label: string): string {
  if (url.startsWith('mailto:')) {
    return url.slice('mailto:'.length).split('?')[0] ?? label
  }
  return label
}

function resolveMailtoHref(url: string, label: string): string {
  if (url.startsWith('mailto:')) {
    return url
  }

  const address = getEmailForClipboard(url, label)
  return `mailto:${address}`
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

type ContactContentProps = {
  contacts: ContactItem[]
}

function ContactContent({ contacts }: ContactContentProps) {
  const tNav = useTranslations('nav')
  const tActions = useTranslations('actions')
  const tContactTypes = useTranslations('contact.types')
  const tA11y = useTranslations('a11y')
  const { show } = useToast()

  const emailContact = useMemo(
    () => contacts.find((contact) => contact.type === 'mail'),
    [contacts],
  )

  const socialContacts = useMemo(
    () => contacts.filter((contact) => contact.type !== 'mail'),
    [contacts],
  )

  const handleCopyEmail = useCallback(async () => {
    if (!emailContact) return

    const email = getEmailForClipboard(emailContact.url, emailContact.label)

    try {
      await navigator.clipboard.writeText(email)
      show(tActions('copied'))
    } catch {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Contact] clipboard write failed')
      }
      show(tActions('copyFailed'))
    }
  }, [emailContact, show, tActions])

  return (
    <section
      id="contact"
      className={cn(
        'flex flex-1 flex-col justify-center border-t border-border bg-background p-6 lg:p-12',
        HOME_SECTION_SCROLL_MT,
      )}
    >
      <div className="w-full space-y-10">
        <div className="max-w-2xl space-y-3">
          <SectionTag index={6}>{stripNavNumber(tNav('contact'))}</SectionTag>
        </div>

        <div className="flex flex-col gap-4">
          {emailContact ? (
            <Card className="group relative flex flex-col justify-between gap-4 p-6 motion-safe:transition-colors hover:border-foreground sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Mail size={12} aria-hidden className="text-primary" />
                  <MonoLabel>{tContactTypes('mail')}</MonoLabel>
                </div>
                <a
                  href={resolveMailtoHref(emailContact.url, emailContact.label)}
                  className="block select-all text-xl font-bold tracking-tight text-foreground motion-safe:transition-colors hover:text-primary sm:text-2xl"
                >
                  {emailContact.label}
                </a>
              </div>
              <button
                type="button"
                id="btn-copy-email"
                className={cn(
                  'flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-foreground px-6 py-3 font-mono text-[10px] font-bold tracking-widest text-background uppercase select-none hover:bg-primary hover:text-primary-foreground',
                  approvedMotionR20,
                )}
                onClick={() => void handleCopyEmail()}
              >
                <Copy size={12} aria-hidden />
                {tActions('copyEmail')}
              </button>
            </Card>
          ) : null}

          {socialContacts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {socialContacts.map((contact) => {
                const Icon = CONTACT_ICONS[contact.type]
                const external = isExternalUrl(contact.url)

                return (
                  <a
                    key={contact.id ?? `${contact.type}-${contact.url}`}
                    href={contact.url}
                    id={`link-${contact.type}`}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={
                      external
                        ? tA11y('externalLink', {
                            label: contact.label,
                            hint: tA11y('opensInNewTab'),
                          })
                        : undefined
                    }
                    className={cn(
                      'group flex flex-col justify-between rounded-none border border-border bg-surface p-4 motion-safe:transition-[transform,background-color,border-color] hover:border-muted-foreground hover:bg-surface-muted',
                    )}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <MonoLabel size="sm">{tContactTypes(contact.type)}</MonoLabel>
                      <ArrowUpRight
                        size={12}
                        aria-hidden
                        className="text-muted-foreground motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon size={14} aria-hidden className="shrink-0 text-primary" />
                      <span className="truncate text-sm font-bold text-foreground">
                        {contact.label}
                      </span>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function Contact({ contacts }: ContactProps) {
  return <ContactContent contacts={contacts ?? []} />
}

export { Contact }
