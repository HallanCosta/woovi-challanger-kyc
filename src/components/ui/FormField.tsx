import type React from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </label>
      {children}
    </div>
  )
}
