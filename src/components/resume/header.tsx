import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import type { ComponentType, ReactNode, SVGProps } from 'react'

import { cn } from '@/lib/cn'
import type { Setting } from '@/payload-types'

type ContactItem = NonNullable<Setting['contacts']>[number]
type SocialIconProps = SVGProps<SVGSVGElement> & { size?: number }

function GithubIcon({ size = 22, className, ...props }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-.1.58-.18.88-.27 0 0 .6.22.83 2.45a4.65 4.65 0 0 1-1.3-.25 4.87 4.87 0 0 0 6.91 4.27 9.82 9.82 0 0 1-2.78 1.2 10.1 10.1 0 0 1-1.55-.1 4.87 4.87 0 0 0 4.63 3.37A9.81 9.81 0 0 1 2 18.56a13.91 13.91 0 0 0 7.55 2.21" />
    </svg>
  )
}

function LinkedinIcon({ size = 22, className, ...props }: SocialIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const SOCIAL_ICON_COMPONENTS: Record<
  'telegram' | 'github' | 'linkedin',
  ComponentType<SocialIconProps>
> = {
  telegram: MessageCircle,
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
        <div className="bg-surface/80 backdrop-blur-sm print:bg-transparent">
          <h1 className="inline-block text-4xl leading-none font-extrabold tracking-tight text-foreground uppercase print:text-black md:text-5xl">
            {firstName}
            {lastName ? (
              <>
                <br />
                {lastName}
              </>
            ) : null}
          </h1>
          <div className="mt-4 block bg-foreground px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-background uppercase print:bg-black print:text-white sm:text-xs">
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
              className="-m-1 flex items-center gap-2 p-1 motion-safe:transition-colors hover:text-foreground md:justify-end print:text-gray-800"
            >
              <Phone size={14} aria-hidden className="shrink-0" />
              {phoneContact.label}
            </a>
          ) : null}

          <div className="mt-3 flex items-center gap-4 text-foreground print:text-black md:justify-end">
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
                  className="-m-2 p-2 motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 motion-safe:hover:text-primary print:text-black"
                >
                  <Icon size={22} strokeWidth={1.5} className="sm:size-5" />
                </a>
              )
            })}

            {locationLabel ? (
              <span className="ml-2 flex items-center gap-1.5 p-1 text-muted-foreground print:text-gray-700">
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
