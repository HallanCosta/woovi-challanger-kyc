import type React from "react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  const [shouldShake, setShouldShake] = useState(false)

  useEffect(() => {
    if (error) {
      setShouldShake(true)
      const timer = setTimeout(() => setShouldShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className={cn("space-y-2", shouldShake && "shake", className)}>
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
