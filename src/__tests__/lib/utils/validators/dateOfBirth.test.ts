import { it, expect } from 'vitest'
import { validateMinAge } from '@/lib/utils/validators/dateOfBirth'

it('should validate minimum age of 18 years', () => {
  const date20YearsAgo = new Date()
  date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20)
  expect(validateMinAge(date20YearsAgo.toISOString())).toBe(true)
})

it('should validate exactly 18 years', () => {
  const date18YearsAgo = new Date()
  date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18)
  expect(validateMinAge(date18YearsAgo.toISOString())).toBe(true)
})

it('should reject younger than 18 years', () => {
  const date17YearsAgo = new Date()
  date17YearsAgo.setFullYear(date17YearsAgo.getFullYear() - 17)
  expect(validateMinAge(date17YearsAgo.toISOString())).toBe(false)
})

it('should accept custom minimum age', () => {
  const date25YearsAgo = new Date()
  date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25)
  expect(validateMinAge(date25YearsAgo.toISOString(), 21)).toBe(true)
})

it('should reject when younger than custom minimum age', () => {
  const date20YearsAgo = new Date()
  date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20)
  expect(validateMinAge(date20YearsAgo.toISOString(), 21)).toBe(false)
})

it('should consider month and day for exact calculation', () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setFullYear(tomorrow.getFullYear() - 18)
  expect(validateMinAge(tomorrow.toISOString())).toBe(false)
})

