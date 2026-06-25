'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/cn'

const kyivFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/Kyiv',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

function formatKyivTime(date: Date): string {
  try {
    return kyivFormatter.format(date)
  } catch {
    return date.toTimeString().split(' ')[0] ?? '00:00:00'
  }
}

type ClockProps = {
  className?: string
  suffix?: string
}

export function Clock({ className, suffix = '(Kyiv)' }: ClockProps) {
  const [time, setTime] = useState(() => formatKyivTime(new Date()))

  useEffect(() => {
    const tick = () => setTime(formatKyivTime(new Date()))
    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className={cn('font-mono tabular-nums', className)}>
      <span suppressHydrationWarning>{time}</span>
      {suffix ? ` ${suffix}` : null}
    </span>
  )
}
