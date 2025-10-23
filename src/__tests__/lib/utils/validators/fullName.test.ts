import { it, expect } from 'vitest'
import { validateFullName } from '@/lib/utils/validators/fullName'

it('should validate valid full name', () => {
  expect(validateFullName('João Silva')).toBe(true)
  expect(validateFullName('Maria da Silva')).toBe(true)
  expect(validateFullName('José Carlos de Souza')).toBe(true)
})

it('should accept names with multiple spaces', () => {
  expect(validateFullName('João   Silva')).toBe(true)
})

it('should reject name with only one word', () => {
  expect(validateFullName('João')).toBe(false)
})

it('should reject very short name', () => {
  expect(validateFullName('A B')).toBe(false)
})

it('should reject name with fewer than 3 total characters', () => {
  expect(validateFullName('Jo')).toBe(false)
})

it('should reject name parts with fewer than 2 characters', () => {
  expect(validateFullName('João A')).toBe(false)
})

it('should reject empty string', () => {
  expect(validateFullName('')).toBe(false)
})

it('should reject string with only spaces', () => {
  expect(validateFullName('   ')).toBe(false)
})

it('should accept name with extra spaces and trimming', () => {
  expect(validateFullName('  John   Doe  ')).toBe(true)
})

it('should reject when any middle part is shorter than 2 chars', () => {
  expect(validateFullName('Jo A Silva')).toBe(false)
  expect(validateFullName('AB C')).toBe(false)
})

it('should accept names with hyphen and apostrophe', () => {
  expect(validateFullName('Ana-Maria Souza')).toBe(true)
  expect(validateFullName("O'Connor Silva")).toBe(true)
})

