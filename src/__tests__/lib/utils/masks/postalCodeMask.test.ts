import { it, expect } from 'vitest'
import { getPostalCodeFormat, formatPostalCode } from '@/lib/utils/masks/postalCodeMask'

it('should return format for Brazil', () => {
  const format = getPostalCodeFormat('Brazil')
  expect(format.mask).toBe('#####-###')
  expect(format.placeholder).toBe('01234-567')
  expect(format.maxLength).toBe(9)
})

it('should return format for United States', () => {
  const format = getPostalCodeFormat('United States')
  expect(format.mask).toBe('#####')
})

it('should return default format for unknown country', () => {
  const format = getPostalCodeFormat('Unknown')
  expect(format.mask).toBe('##########')
})
 

it('should format Brazilian CEP', () => {
  expect(formatPostalCode('01234567', 'Brazil')).toBe('01234-567')
})

it('should format US ZIP code', () => {
  expect(formatPostalCode('10001', 'United States')).toBe('10001')
})

it('should format United Kingdom postal code (alphanumeric)', () => {
  expect(formatPostalCode('SW1A1AA', 'United Kingdom')).toBe('SW1A 1AA')
})

it('should format Canada postal code (alphanumeric)', () => {
  expect(formatPostalCode('M5H2N2', 'Canada')).toBe('M5H 2N2')
})

it('should convert to uppercase for alphanumeric countries', () => {
  expect(formatPostalCode('sw1a1aa', 'United Kingdom')).toBe('SW1A 1AA')
})

it('should return original value if country not provided', () => {
  expect(formatPostalCode('01234567', '')).toBe('01234567')
})

it('should remove special characters', () => {
  expect(formatPostalCode('01234-567', 'Brazil')).toBe('01234-567')
})

