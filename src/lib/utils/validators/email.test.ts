import { describe, it, expect } from 'vitest'
import { validateEmail } from './email'

describe('validateEmail', () => {
  it('deve validar email válido', () => {
    expect(validateEmail('user@example.com')).toBe(true)
    expect(validateEmail('test.user@domain.com.br')).toBe(true)
    expect(validateEmail('name+tag@email.co')).toBe(true)
  })

  it('deve rejeitar email sem @', () => {
    expect(validateEmail('useremail.com')).toBe(false)
  })

  it('deve rejeitar email sem domínio', () => {
    expect(validateEmail('user@')).toBe(false)
  })

  it('deve rejeitar email sem nome de usuário', () => {
    expect(validateEmail('@example.com')).toBe(false)
  })

  it('deve rejeitar email sem extensão', () => {
    expect(validateEmail('user@domain')).toBe(false)
  })

  it('deve rejeitar email com espaços', () => {
    expect(validateEmail('user @example.com')).toBe(false)
    expect(validateEmail('user@example .com')).toBe(false)
  })

  it('deve rejeitar string vazia', () => {
    expect(validateEmail('')).toBe(false)
  })
})

