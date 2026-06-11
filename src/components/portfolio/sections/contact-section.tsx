import { ArrowUpRight } from 'lucide-react'

import type { HomeContent } from '@/content/portfolio/home'

import { SectionShell } from './section-shell'

export function ContactSection({ id, contact }: { id?: string; contact: HomeContent['contact'] }) {
  return (
    <SectionShell id={id} eyebrow={contact.eyebrow} title={contact.title} intro={contact.intro}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
        <dl className="space-y-4">
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {contact.location}
            </dt>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {contact.availability}
            </dt>
          </div>
        </dl>

        <ul className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2">
          {contact.channels.map((channel) => {
            const isExternal = channel.href.startsWith('http')
            return (
              <li key={channel.id} className="bg-surface">
                <a
                  href={channel.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-surface-muted"
                >
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                      {channel.label}
                    </span>
                    <span className="mt-1 block text-sm text-foreground">{channel.value}</span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionShell>
  )
}
