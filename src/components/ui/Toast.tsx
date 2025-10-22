'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastProps = {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
  onDismiss: (id: string) => void
}

export function Toast({ id, title, description, variant = 'default', onDismiss }: ToastProps) {
  return (
    <div
      className={cn(
        'group pointer-events-auto relative flex w-full items-center justify-between space-x-3',
        'overflow-hidden rounded-md border p-4 pr-7 shadow-md transition-all',
        'animate-in slide-in-from-top-full sm:slide-in-from-bottom-full',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-80',
        'data-[state=closed]:slide-out-to-right-full',
        variant === 'default' && 'border bg-background text-foreground',
        variant === 'destructive' && 'border-destructive bg-destructive text-white'
      )}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-semibold truncate">
            {title}
          </div>
        )}
        {description && (
          <div className="text-sm opacity-90 mt-1 line-clamp-2">
            {description}
          </div>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className={cn(
          'absolute right-2 top-2 rounded-sm p-1 opacity-0 transition-opacity',
          'hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-1',
          'text-foreground/50 hover:text-foreground',
          variant === 'destructive' && 'text-white/70 hover:text-white focus:ring-white/50'
        )}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        // Sempre no topo à direita (mobile e desktop), respeitando safe-area
        'fixed top-0 right-0 z-[100] flex max-h-screen w-full sm:w-auto flex-col p-2 '
        + 'pt-[calc(env(safe-area-inset-top)+0.5rem)] pr-[calc(env(safe-area-inset-right,0)+0.5rem)] '
        + 'sm:p-4'
      }
    >
      <div className="space-y-2 ml-auto w-full max-w-[92vw] sm:max-w-[360px]">
        {children}
      </div>
    </div>
  )
}
