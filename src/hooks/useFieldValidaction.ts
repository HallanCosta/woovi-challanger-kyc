
import { useState, useCallback, useEffect, useRef } from "react"
import type { ValidationErrors } from "@/lib/types"

export function useFieldValidation(
  validateFn: (fieldName: string, value: any, allData?: any) => string | null,
  debounceMs = 800,
) {
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({})
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const validateField = useCallback(
    (fieldName: string, value: any, allData?: any) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        const error = validateFn(fieldName, value, allData)

        setFieldErrors((prev) => {
          const newErrors = { ...prev }
          if (error) {
            newErrors[fieldName] = error
          } else {
            delete newErrors[fieldName]
          }
          return newErrors
        })
      }, debounceMs)
    },
    [validateFn, debounceMs],
  )

  const clearFieldError = useCallback((fieldName: string) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev }
      delete newErrors[fieldName]
      return newErrors
    })
  }, [])

  const setErrors = useCallback((errors: ValidationErrors) => {
    setFieldErrors(errors)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    fieldErrors,
    validateField,
    clearFieldError,
    setErrors,
  }
}
