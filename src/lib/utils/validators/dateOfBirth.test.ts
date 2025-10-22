import { describe, it, expect } from 'vitest'
import { validateMinAge } from './dateOfBirth'

describe('validateMinAge', () => {
  it('deve validar idade mínima de 18 anos', () => {
    const date20YearsAgo = new Date()
    date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20)
    expect(validateMinAge(date20YearsAgo.toISOString())).toBe(true)
  })

  it('deve validar exatamente 18 anos', () => {
    const date18YearsAgo = new Date()
    date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18)
    expect(validateMinAge(date18YearsAgo.toISOString())).toBe(true)
  })

  it('deve rejeitar menor de 18 anos', () => {
    const date17YearsAgo = new Date()
    date17YearsAgo.setFullYear(date17YearsAgo.getFullYear() - 17)
    expect(validateMinAge(date17YearsAgo.toISOString())).toBe(false)
  })

  it('deve aceitar idade mínima customizada', () => {
    const date25YearsAgo = new Date()
    date25YearsAgo.setFullYear(date25YearsAgo.getFullYear() - 25)
    expect(validateMinAge(date25YearsAgo.toISOString(), 21)).toBe(true)
  })

  it('deve rejeitar quando menor que idade mínima customizada', () => {
    const date20YearsAgo = new Date()
    date20YearsAgo.setFullYear(date20YearsAgo.getFullYear() - 20)
    expect(validateMinAge(date20YearsAgo.toISOString(), 21)).toBe(false)
  })

  it('deve considerar mês e dia para cálculo exato', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setFullYear(tomorrow.getFullYear() - 18)
    expect(validateMinAge(tomorrow.toISOString())).toBe(false)
  })
})

