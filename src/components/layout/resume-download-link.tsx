import type { ReactNode } from 'react'

import { Link } from '@/i18n/navigation'
import { resolveResumeHref } from '@/lib/external-url'

type ResumeDownloadLinkProps = {
  resumeUrl?: string | null
  className?: string
  children: ReactNode
  /** Accessible name for the link (required when opening externally). */
  linkLabel: string
  externalAriaLabel?: string
}

export function ResumeDownloadLink({
  resumeUrl,
  className,
  children,
  linkLabel,
  externalAriaLabel,
}: ResumeDownloadLinkProps) {
  const { href, external } = resolveResumeHref(resumeUrl)

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={externalAriaLabel ?? linkLabel}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}
