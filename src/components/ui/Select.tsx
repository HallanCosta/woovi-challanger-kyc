'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

type A11yContextValue = {
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  ariaRequired?: boolean
}

const SelectA11yContext = React.createContext<A11yContextValue | undefined>(undefined)

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  const ariaLabel = (props as any)['aria-label'] as string | undefined
  const ariaLabelledBy = (props as any)['aria-labelledby'] as string | undefined
  const ariaDescribedBy = (props as any)['aria-describedby'] as string | undefined
  const ariaRequired = (props as any)['aria-required'] as boolean | undefined

  const { ['aria-label']: _a, ['aria-labelledby']: _b, ['aria-describedby']: _c, ['aria-required']: _d, ...rest } = props as any

  return (
    <SelectA11yContext.Provider value={{ ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaRequired }}>
      <SelectPrimitive.Root {...rest} />
    </SelectA11yContext.Provider>
  )
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  const a11y = React.useContext(SelectA11yContext)
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between px-3 py-2",
        "rounded-md border border-input bg-transparent dark:bg-input/30",
        "text-sm placeholder:text-muted-foreground",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      aria-label={(props as any)['aria-label'] ?? a11y?.ariaLabel}
      aria-labelledby={(props as any)['aria-labelledby'] ?? a11y?.ariaLabelledBy}
      aria-describedby={(props as any)['aria-describedby'] ?? a11y?.ariaDescribedBy}
      aria-required={(props as any)['aria-required'] ?? (a11y?.ariaRequired as any)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden',
          'rounded-md border bg-popover text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
          'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex w-full cursor-default select-none items-center',
        'rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export {
  Select,
  SelectA11yContext,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
}
