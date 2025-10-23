import { it, expect } from 'vitest'
import { validateTermsAccepted } from '@/lib/utils/validators/terms'

it('should return true when terms are accepted', () => {
  expect(validateTermsAccepted(true)).toBe(true)
})

it('should return false when terms are not accepted', () => {
  expect(validateTermsAccepted(false)).toBe(false)
})

