'use client'

import { useAuth } from '@payloadcms/ui'
import { useEffect, type ReactNode } from 'react'

type ClaimOwnerCookieProps = {
  children?: ReactNode
}

export function ClaimOwnerCookie({ children }: ClaimOwnerCookieProps) {
  const { user } = useAuth()
  const userId = user?.id

  useEffect(() => {
    if (!userId) return

    void fetch('/api/claim-owner', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => {})
  }, [userId])

  return children ?? null
}
