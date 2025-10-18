import type React from "react"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium mb-1 block">  
        {label}
        {required && <span className="ml-1 text-error">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
