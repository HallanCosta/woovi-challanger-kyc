import { it, expect } from 'vitest'
import { validateCPF } from '@/lib/utils/validators/cpf'

it('should validate a valid CPF', () => {
  expect(validateCPF('123.456.789-09')).toBe(true)
  expect(validateCPF('111.444.777-35')).toBe(true)
})

it('should accept CPF without formatting', () => {
  expect(validateCPF('12345678909')).toBe(true)
})

it('should reject CPF with fewer than 11 digits', () => {
  expect(validateCPF('123.456.789-0')).toBe(false)
  expect(validateCPF('1234567890')).toBe(false)
})

it('should reject CPF with more than 11 digits', () => {
  expect(validateCPF('123.456.789-099')).toBe(false)
  expect(validateCPF('123456789099')).toBe(false)
})

it('should reject CPF with all digits equal', () => {
  expect(validateCPF('111.111.111-11')).toBe(false)
  expect(validateCPF('22222222222')).toBe(false)
  expect(validateCPF('00000000000')).toBe(false)
})

it('should reject CPF with invalid check digits', () => {
  expect(validateCPF('123.456.789-00')).toBe(false)
  expect(validateCPF('123.456.789-99')).toBe(false)
})

it('should reject empty string', () => {
  expect(validateCPF('')).toBe(false)
})

