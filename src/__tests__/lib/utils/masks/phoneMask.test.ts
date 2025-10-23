import { it, expect } from 'vitest'
import { getPhoneFormat, formatPhoneNumber } from '@/lib/utils/masks/phoneMask'

it('should return format for Brazil', () => {
  const format = getPhoneFormat('Brazil')
  expect(format.mask).toBe('(##) #####-####')
  expect(format.placeholder).toBe('(11) 98765-4321')
  expect(format.maxLength).toBe(15)
})

it('should return format for United States', () => {
  const format = getPhoneFormat('United States')
  expect(format.mask).toBe('(###) ###-####')
})

it('should return default format for unknown country', () => {
  const format = getPhoneFormat('Unknown')
  expect(format.mask).toBe('###############')
  expect(format.placeholder).toBe('Enter phone number')
})
 

it('should format Brazilian phone', () => {
  expect(formatPhoneNumber('11987654321', 'Brazil')).toBe('(11) 98765-4321')
})

it('should format US phone', () => {
  expect(formatPhoneNumber('5551234567', 'United States')).toBe('(555) 123-4567')
})

it('should remove non-numeric characters', () => {
  expect(formatPhoneNumber('(11) 98765-4321', 'Brazil')).toBe('(11) 98765-4321')
})

it('should return original value if country not provided', () => {
  expect(formatPhoneNumber('11987654321', '')).toBe('11987654321')
})

it('should partially format when number is incomplete', () => {
  expect(formatPhoneNumber('119', 'Brazil')).toBe('(11) 9')
})

