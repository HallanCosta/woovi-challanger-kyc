import type React from "react"
import { useEffect, useId, useState } from "react"

import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/i18n/useTranslation"

interface FormFieldProps {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, error, required, children, className }: FormFieldProps) {
  const { t } = useTranslation()
  const [shouldShake, setShouldShake] = useState(false)
  const uid = useId()
  const labelId = `label-${uid}`
  const errorId = `error-${uid}`

  useEffect(() => {
    if (error) {
      setShouldShake(true)
      const timer = setTimeout(() => setShouldShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [error])

  return (
    <div className={cn("space-y-2", shouldShake && "shake", className)}>
      <label id={labelId} className="text-sm font-medium mb-1 block">
        {label}
        {required && <span className="ml-1 text-error">*</span>}
        <div className="mt-1" aria-describedby={error ? errorId : undefined}>
          {children}
        </div>
      </label>
      {error && (
        <p id={errorId} className="text-sm text-error" role="alert">
          {t(error)}
        </p>
      )}
    </div>
  )
}
