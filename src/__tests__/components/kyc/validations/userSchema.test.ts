import { it, expect } from 'vitest'
import { validateUser } from '@/components/kyc/validations/userSchema'

it('should validate valid user', () => {
  const result = validateUser({ fullName: 'John Doe', email: 'john@example.com', dateOfBirth: '2000-01-01' })
  expect(result.success).toBe(true)
})

it('should invalidate user with bad email and name', () => {
  const result = validateUser({ fullName: 'A', email: 'bad', dateOfBirth: '' })
  expect(result.success).toBe(false)
})
