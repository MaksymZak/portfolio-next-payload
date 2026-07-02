'use client'

import { PopupList, toast } from '@payloadcms/ui'
import { useCallback, useState } from 'react'

export function RevalidateCacheMenuItem() {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/revalidate-site-cache', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      toast.success('Site cache cleared')
    } catch {
      toast.error('Failed to clear site cache')
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <PopupList.ButtonGroup>
      <PopupList.Button onClick={handleClick} disabled={loading}>
        {loading ? 'Clearing cache…' : 'Clear site cache'}
      </PopupList.Button>
    </PopupList.ButtonGroup>
  )
}
