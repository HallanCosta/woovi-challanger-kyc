import { it, expect } from 'vitest'
import { validateEmail } from '@/lib/utils/validators/email'

it('should validate valid email', () => {
  expect(validateEmail('user@example.com')).toBe(true)
  expect(validateEmail('test.user@domain.com.br')).toBe(true)
  expect(validateEmail('name+tag@email.co')).toBe(true)
})

it('should reject email without @', () => {
  expect(validateEmail('useremail.com')).toBe(false)
})

it('should reject email without domain', () => {
  expect(validateEmail('user@')).toBe(false)
})

it('should reject email without username', () => {
  expect(validateEmail('@example.com')).toBe(false)
})

it('should reject email without TLD/extension', () => {
  expect(validateEmail('user@domain')).toBe(false)
})

it('should reject email with spaces', () => {
  expect(validateEmail('user @example.com')).toBe(false)
  expect(validateEmail('user@example .com')).toBe(false)
})

it('should reject empty string', () => {
  expect(validateEmail('')).toBe(false)
})

