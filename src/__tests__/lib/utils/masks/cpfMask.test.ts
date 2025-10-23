import { it, expect } from 'vitest'
import { formatCPF, getCPFMask } from '@/lib/utils/masks/cpfMask'

it('should format partial CPF', () => {
  expect(formatCPF('123')).toBe('123')
  expect(formatCPF('1234')).toBe('123.4')
  expect(formatCPF('123456')).toBe('123.456')
})

it('should format full CPF', () => {
  expect(formatCPF('12345678909')).toBe('123.456.789-09')
})

it('should remove non-numeric characters', () => {
  expect(formatCPF('123.456.789-09')).toBe('123.456.789-09')
  expect(formatCPF('123abc456def789ghi09')).toBe('123.456.789-09')
})

it('should limit to 11 digits', () => {
  expect(formatCPF('123456789099999')).toBe('123.456.789-09')
})

it('should return empty string for empty input', () => {
  expect(formatCPF('')).toBe('')
})
 

it('should return mask configuration', () => {
  const mask = getCPFMask()
  expect(mask).toEqual({
    mask: '000.000.000-00',
    placeholder: '000.000.000-00',
    maxLength: 14,
  })
})

