import {
  Code2,
  Link2,
  Mail,
  MapPin,
  Phone,
  Send,
  type LucideIcon,
} from 'lucide-react'
import type { ReactNode } from 'react'

import { approvedMotionR18 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

type ContactItem = NonNullable<Setting['contacts']>[number]

const CONTACT_ICONS: Record<ContactItem['type'], LucideIcon> = {
  phone: Phone,
  mail: Mail,
  telegram: Send,
  github: Code2,
  linkedin: Link2,
  map: MapPin,
}

const SOCIAL_TYPES = new Set<ContactItem['type']>(['telegram', 'github', 'linkedin'])

export type ResumeHeaderProps = {
  settings: Pick<Setting, 'name' | 'position' | 'location' | 'contacts'>
  /** Optional chrome (e.g. back link) — hidden when printing. */
  children?: ReactNode
  className?: string
}

function splitDisplayName(name: string): [string, string] {
  const spaceIndex = name.indexOf(' ')
  if (spaceIndex === -1) {
    return [name, '']
  }
  return [name.slice(0, spaceIndex), name.slice(spaceIndex + 1)]
}

function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}

export function ResumeHeader({ settings, children, className }: ResumeHeaderProps) {
  const [firstName, lastName] = splitDisplayName(settings.name)
  const contacts = settings.contacts ?? []

  const mailContact = contacts.find((contact) => contact.type === 'mail')
  const phoneContact = contacts.find((contact) => contact.type === 'phone')
  const socialContacts = contacts.filter((contact) => SOCIAL_TYPES.has(contact.type))
  const mapContact = contacts.find((contact) => contact.type === 'map')

  return (
    <header
      className={cn(
        'relative mb-6 overflow-hidden border-2 border-foreground bg-surface p-6 sm:p-10 print:mb-4 print:border-black print:p-5',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:32px_32px] opacity-30 print:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.05] print:hidden"
      />

      {children ? <div className="relative z-10 mb-4 print:hidden">{children}</div> : null}

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="inline-block self-start bg-surface/80 text-4xl leading-none font-extrabold tracking-tight text-foreground uppercase backdrop-blur-sm print:bg-transparent print:text-black md:text-5xl">
            {firstName}
            {lastName ? (
              <>
                <br />
                {lastName}
              </>
            ) : null}
          </h1>
          <div className="mt-4 inline-block bg-foreground px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-background uppercase print:bg-black print:text-white sm:text-xs">
            {settings.position}
          </div>
        </div>

        <div className="-m-2 flex flex-col gap-3 bg-surface/80 p-2 font-mono text-[10px] font-bold text-muted-foreground backdrop-blur-sm print:bg-transparent print:text-gray-700">
          {mailContact ? (
            <a
              href={mailContact.url}
              className="-m-1 flex items-center gap-2 p-1 motion-safe:transition-colors hover:text-foreground md:justify-end print:text-gray-800"
            >
              <Mail size={14} aria-hidden className="shrink-0" />
              {mailContact.label}
            </a>
          ) : null}

          {phoneContact ? (
            <a
              href={phoneContact.url}
              className="-m-1 mt-1 flex items-center gap-2 p-1 motion-safe:transition-colors hover:text-foreground md:justify-end print:text-gray-800"
            >
              <Phone size={14} aria-hidden className="shrink-0" />
              {phoneContact.label}
            </a>
          ) : null}

          <div className="mt-3 flex flex-wrap items-center gap-4 text-foreground print:text-black md:justify-end">
            {socialContacts.map((contact) => {
              const Icon = CONTACT_ICONS[contact.type]
              const external = isExternalUrl(contact.url)

              return (
                <a
                  key={contact.id ?? `${contact.type}-${contact.url}`}
                  href={contact.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={contact.label}
                  className={cn(
                    '-m-2 p-2 hover:text-primary print:hidden',
                    approvedMotionR18,
                  )}
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden className="sm:size-5" />
                </a>
              )
            })}

            {(mapContact ?? settings.location) ? (
              <span className="flex items-center gap-1.5 p-1 text-muted-foreground print:text-gray-700">
                <MapPin size={14} aria-hidden className="shrink-0" />
                {mapContact?.label ?? settings.location}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
