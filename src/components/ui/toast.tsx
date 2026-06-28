'use client'

import { Check } from 'lucide-react'
import * as React from 'react'

import { approvedMotionR21 } from '@/lib/brutalist-motion'
import { cn } from '@/lib/cn'

const DEFAULT_DURATION_MS = 2500

type ToastItem = {
  id: number
  message: string
}

type ToastContextValue = {
  show: (message: string, durationMs?: number) => void
  dismiss: () => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<ToastItem | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const idRef = React.useRef(0)

  const dismiss = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToast(null)
  }, [])

  const show = React.useCallback((message: string, durationMs = DEFAULT_DURATION_MS) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    idRef.current += 1
    const id = idRef.current
    setToast({ id, message })

    timeoutRef.current = setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current))
      timeoutRef.current = null
    }, durationMs)
  }, [])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const value = React.useMemo(() => ({ show, dismiss }), [show, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? <Toast message={toast.message} /> : null}
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

type ToastProps = Omit<React.ComponentProps<'div'>, 'children'> & {
  message: string
}

function Toast({ message, className, id = 'copy-toast', ...props }: ToastProps) {
  return (
    <div
      id={id}
      role="status"
      aria-live="polite"
      data-slot="toast"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-none border border-border bg-foreground px-4 py-3 font-mono text-xs text-background',
        approvedMotionR21,
        'motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    >
      <Check aria-hidden data-icon className="text-accent" />
      <span className="font-bold tracking-wider">{message}</span>
    </div>
  )
}

export { DEFAULT_DURATION_MS, Toast, ToastProvider, useToast }
