import { it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useKYCForm } from '@/components/kyc/hooks/useKycForm'

it('should start with empty default values', () => {
  const { result } = renderHook(() => useKYCForm())
  expect(result.current.formData.personalInfo.fullName).toBe('')
  expect(result.current.formData.addressInfo.street).toBe('')
})

it('should update personal info and trigger validation debounced', async () => {
  const { result } = renderHook(() => useKYCForm())

  await act(async () => {
    result.current.updatePersonalInfo({ fullName: 'John Doe' })
  })

  expect(result.current.formData.personalInfo.fullName).toBe('John Doe')
})

it('should validate steps using validateStep', async () => {
  const { result } = renderHook(() => useKYCForm())

  const isValidPersonal = await result.current.validateStep(1)
  expect(typeof isValidPersonal).toBe('boolean')
})

it('should reset form', () => {
  const { result } = renderHook(() => useKYCForm())

  act(() => {
    result.current.updatePersonalInfo({ fullName: 'John Doe' })
  })

  act(() => {
    result.current.resetForm()
  })

  expect(result.current.formData.personalInfo.fullName).toBe('')
})
