import { it, expect } from 'vitest'
import { COUNTRIES } from '@/constants/countries'

it('should contain a list of countries', () => {
  expect(COUNTRIES).toBeDefined()
  expect(Array.isArray(COUNTRIES)).toBe(true)
  expect(COUNTRIES.length).toBeGreaterThan(0)
})

it('should contain Brazil', () => {
  expect(COUNTRIES).toContain('Brazil')
})

it('should contain United States', () => {
  expect(COUNTRIES).toContain('United States')
})

it('all items should be strings', () => {
  COUNTRIES.forEach(country => {
    expect(typeof country).toBe('string')
  })
})

it('should not contain empty strings', () => {
  COUNTRIES.forEach(country => {
    expect(country.length).toBeGreaterThan(0)
  })
})

