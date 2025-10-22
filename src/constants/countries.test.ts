import { describe, it, expect } from 'vitest'
import { COUNTRIES } from './countries'

describe('COUNTRIES', () => {
  it('deve conter uma lista de países', () => {
    expect(COUNTRIES).toBeDefined()
    expect(Array.isArray(COUNTRIES)).toBe(true)
    expect(COUNTRIES.length).toBeGreaterThan(0)
  })

  it('deve conter Brazil', () => {
    expect(COUNTRIES).toContain('Brazil')
  })

  it('deve conter United States', () => {
    expect(COUNTRIES).toContain('United States')
  })

  it('todos os itens devem ser strings', () => {
    COUNTRIES.forEach(country => {
      expect(typeof country).toBe('string')
    })
  })

  it('não deve conter strings vazias', () => {
    COUNTRIES.forEach(country => {
      expect(country.length).toBeGreaterThan(0)
    })
  })
})

