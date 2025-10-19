
import { useState, useCallback, useEffect, useRef } from "react"
import type { ValidationErrors } from "@/lib/types"

type ValidationFunction = (fieldName: string, value: any, allData?: any) => string | null

export function useFieldValidation(
  validateFn: ValidationFunction,
  debounceMs = 800,
) {
  const [fieldErrors, setFieldErrors] = useState<ValidationErrors>({})
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearPreviousTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const updateFieldError = useCallback((fieldName: string, error: string | null) => {
    setFieldErrors((prev) => {
      const newErrors = { ...prev }
      if (error) {
        newErrors[fieldName] = error
      } else {
        delete newErrors[fieldName]
      }
      return newErrors
    })
  }, [])

  const validateField = useCallback(
    (fieldName: string, value: any, allData?: any) => {
      clearPreviousTimeout()

      timeoutRef.current = setTimeout(() => {
        const error = validateFn(fieldName, value, allData)
        updateFieldError(fieldName, error)
      }, debounceMs)
    },
    [validateFn, debounceMs, clearPreviousTimeout, updateFieldError],
  )

  const clearFieldError = useCallback((fieldName: string) => {
    updateFieldError(fieldName, null)
  }, [updateFieldError])

  const setErrors = useCallback((errors: ValidationErrors) => {
    setFieldErrors(errors)
  }, [])

  useEffect(() => {
    return () => {
      clearPreviousTimeout()
    }
  }, [clearPreviousTimeout])

  return {
    fieldErrors,
    validateField,
    clearFieldError,
    setErrors,
  }
}
