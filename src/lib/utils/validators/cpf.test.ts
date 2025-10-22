import { describe, it, expect } from 'vitest'
import { validateCPF } from './cpf'

describe('validateCPF', () => {
  it('deve validar um CPF válido', () => {
    expect(validateCPF('123.456.789-09')).toBe(true)
    expect(validateCPF('111.444.777-35')).toBe(true)
  })

  it('deve aceitar CPF sem formatação', () => {
    expect(validateCPF('12345678909')).toBe(true)
  })

  it('deve rejeitar CPF com menos de 11 dígitos', () => {
    expect(validateCPF('123.456.789-0')).toBe(false)
    expect(validateCPF('1234567890')).toBe(false)
  })

  it('deve rejeitar CPF com mais de 11 dígitos', () => {
    expect(validateCPF('123.456.789-099')).toBe(false)
    expect(validateCPF('123456789099')).toBe(false)
  })

  it('deve rejeitar CPF com todos os dígitos iguais', () => {
    expect(validateCPF('111.111.111-11')).toBe(false)
    expect(validateCPF('22222222222')).toBe(false)
    expect(validateCPF('00000000000')).toBe(false)
  })

  it('deve rejeitar CPF com dígitos verificadores inválidos', () => {
    expect(validateCPF('123.456.789-00')).toBe(false)
    expect(validateCPF('123.456.789-99')).toBe(false)
  })

  it('deve rejeitar string vazia', () => {
    expect(validateCPF('')).toBe(false)
  })
})

