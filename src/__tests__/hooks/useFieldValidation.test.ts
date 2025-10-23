import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFieldValidation } from '@/hooks/useFieldValidaction'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

it('should debounce validation and set error', () => {
  const validateFn = vi.fn().mockReturnValue('Error')
  const { result } = renderHook(() => useFieldValidation(validateFn, 500))

  act(() => {
    result.current.validateField('fullName', '')
  })

  expect(result.current.fieldErrors.fullName).toBeUndefined()

  act(() => {
    vi.advanceTimersByTime(500)
  })

  expect(result.current.fieldErrors.fullName).toBe('Error')
})

it('should clear specific field error', () => {
  const validateFn = vi.fn().mockReturnValue(null)
  const { result } = renderHook(() => useFieldValidation(validateFn, 0))

  act(() => {
    result.current.setErrors({ email: 'Invalid' })
  })
  expect(result.current.fieldErrors.email).toBe('Invalid')

  act(() => {
    result.current.clearFieldError('email')
  })
  expect(result.current.fieldErrors.email).toBeUndefined()
})
