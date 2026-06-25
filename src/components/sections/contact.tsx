'use client'

import {
  ArrowUpRight,
  Code2,
  Copy,
  Link2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MonoLabel } from '@/components/ui/mono-label'
import { SectionTag } from '@/components/ui/section-tag'
import { useToast } from '@/components/ui/toast'
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

type ContactItem = NonNullable<Setting['contacts']>[number]

type ContactProps = {
  contacts: Setting['contacts']
}

const CONTACT_ICONS: Record<ContactItem['type'], LucideIcon> = {
  phone: Phone,
  mail: Mail,
  telegram: Send,
  github: Code2,
  linkedin: Link2,
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
      // Clipboard API unavailable (permissions, insecure context, etc.)
    }
  }, [emailContact, show, tActions])

  return (
    <section
      id="contact"
      className="flex flex-1 flex-col justify-center border-t border-border bg-background p-6 lg:p-12"
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
                <span className="block select-all text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {emailContact.label}
                </span>
              </div>
              <Button
                type="button"
                id="btn-copy-email"
                variant="primary"
                size="lg"
                className="shrink-0 bg-foreground px-6 py-3 text-background motion-safe:transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={() => void handleCopyEmail()}
              >
                <Copy size={12} aria-hidden />
                {tActions('copyEmail')}
              </Button>
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
