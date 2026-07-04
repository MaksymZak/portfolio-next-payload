import { Mail, MapPin, Phone } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'

import { GithubIcon, LinkedinIcon, TelegramIcon, type BrandIconProps } from '@/components/ui/brand-icons'
import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

type ContactItem = NonNullable<Setting['contacts']>[number]

const SOCIAL_ICON_COMPONENTS: Record<
  'telegram' | 'github' | 'linkedin',
  ComponentType<BrandIconProps>
> = {
  telegram: TelegramIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
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

function resumeLocationLabel(location: string): string {
  const city = location.split(',')[0]?.trim()
  return city || location
}

export function ResumeHeader({ settings, children, className }: ResumeHeaderProps) {
  const [firstName, lastName] = splitDisplayName(settings.name)
  const contacts = settings.contacts ?? []

  const mailContact = contacts.find((contact) => contact.type === 'mail')
  const phoneContact = contacts.find((contact) => contact.type === 'phone')
  const socialContacts = contacts.filter((contact) => SOCIAL_TYPES.has(contact.type))
  const mapContact = contacts.find((contact) => contact.type === 'map')
  const locationLabel = resumeLocationLabel(mapContact?.label ?? settings.location ?? '')

  return (
    <header
      className={cn(
        'relative mb-6 overflow-hidden border-2 border-foreground bg-surface p-6 sheet:mb-3 sheet:flex sheet:h-[160px] sheet:flex-col sheet:justify-center sheet:border-black sheet:bg-white sheet:p-5 sm:p-10',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:32px_32px] opacity-30 sheet:hidden"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] bg-[size:16px_16px] opacity-[0.05] sheet:hidden"
      />

      {children ? <div className="relative z-10 mb-4 sheet:hidden">{children}</div> : null}

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="bg-surface/80 backdrop-blur-sm sheet:bg-transparent">
          <h1 className="inline-block text-4xl leading-none font-extrabold tracking-tight text-foreground uppercase sheet:text-[40px] sheet:text-black md:text-5xl md:sheet:text-[40px]">
            {firstName}
            {lastName ? (
              <>
                <br />
                {lastName}
              </>
            ) : null}
          </h1>
          <div className="mt-4 block bg-foreground px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-background uppercase sheet:mt-3 sheet:bg-black sheet:text-[11px] sheet:text-white sm:text-xs">
            {settings.position}
          </div>
        </div>

        <div className="-m-2 flex flex-col gap-3 bg-surface/80 p-2 font-mono text-[10px] font-bold text-muted-foreground backdrop-blur-sm sheet:gap-2 sheet:bg-transparent sheet:text-[11px] sheet:text-gray-700">
          {mailContact ? (
            <a
              href={mailContact.url}
              className="-m-1 flex items-center gap-2 p-1 motion-safe:transition-colors hover:text-foreground sheet:text-gray-800 md:justify-end"
            >
              <Mail size={14} aria-hidden className="shrink-0" />
              {mailContact.label}
            </a>
          ) : null}

          {phoneContact ? (
            <a
              href={phoneContact.url}
              className="-m-1 flex items-center gap-2 p-1 motion-safe:transition-colors hover:text-foreground sheet:text-gray-800 md:justify-end"
            >
              <Phone size={14} aria-hidden className="shrink-0" />
              {phoneContact.label}
            </a>
          ) : null}

          <div className="mt-3 flex items-center gap-4 text-foreground sheet:mt-2 sheet:text-black md:justify-end">
            {socialContacts.map((contact) => {
              const socialType = contact.type as keyof typeof SOCIAL_ICON_COMPONENTS
              const Icon = SOCIAL_ICON_COMPONENTS[socialType]
              const external = isExternalUrl(contact.url)

              return (
                <a
                  key={contact.id ?? `${contact.type}-${contact.url}`}
                  href={contact.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={contact.label}
                  className="-m-2 p-2 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 motion-safe:hover:text-primary sheet:text-black"
                >
                  <Icon size={20} className="sm:size-[18px]" />
                </a>
              )
            })}

            {locationLabel ? (
              <span className="ml-2 flex items-center gap-1.5 p-1 text-muted-foreground sheet:text-gray-700">
                <MapPin size={14} aria-hidden className="shrink-0" />
                {locationLabel}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
