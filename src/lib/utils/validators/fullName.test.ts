import { describe, it, expect } from 'vitest'
import { validateFullName } from './fullName'

describe('validateFullName', () => {
  it('deve validar nome completo válido', () => {
    expect(validateFullName('João Silva')).toBe(true)
    expect(validateFullName('Maria da Silva')).toBe(true)
    expect(validateFullName('José Carlos de Souza')).toBe(true)
  })

  it('deve aceitar nomes com espaços múltiplos', () => {
    expect(validateFullName('João   Silva')).toBe(true)
  })

  it('deve rejeitar nome com apenas uma palavra', () => {
    expect(validateFullName('João')).toBe(false)
  })

  it('deve rejeitar nome muito curto', () => {
    expect(validateFullName('A B')).toBe(false)
  })

  it('deve rejeitar nome com menos de 3 caracteres no total', () => {
    expect(validateFullName('Jo')).toBe(false)
  })

  it('deve rejeitar partes do nome com menos de 2 caracteres', () => {
    expect(validateFullName('João A')).toBe(false)
  })

  it('deve rejeitar string vazia', () => {
    expect(validateFullName('')).toBe(false)
  })

  it('deve rejeitar string apenas com espaços', () => {
    expect(validateFullName('   ')).toBe(false)
  })
})

