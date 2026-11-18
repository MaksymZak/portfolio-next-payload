'use client'

import { usePathname } from '@/i18n/navigation'
import { useEffect } from 'react'

type VisitBeaconProps = {
  locale: string
}

export function VisitBeacon({ locale }: VisitBeaconProps) {
  const pathname = usePathname()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref') ?? ''
    const path = window.location.pathname

    void fetch('/api/visits', {
      method: 'POST',
      keepalive: true,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        path,
        locale,
        referrer: document.referrer,
        ref,
      }),
    }).catch(() => {})
  }, [locale, pathname])

  return null
}
