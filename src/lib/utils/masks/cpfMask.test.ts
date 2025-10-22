import { describe, it, expect } from 'vitest'
import { formatCPF, getCPFMask } from './cpfMask'

describe('formatCPF', () => {
  it('deve formatar CPF parcial', () => {
    expect(formatCPF('123')).toBe('123')
    expect(formatCPF('1234')).toBe('123.4')
    expect(formatCPF('123456')).toBe('123.456')
  })

  it('deve formatar CPF completo', () => {
    expect(formatCPF('12345678909')).toBe('123.456.789-09')
  })

  it('deve remover caracteres não numéricos', () => {
    expect(formatCPF('123.456.789-09')).toBe('123.456.789-09')
    expect(formatCPF('123abc456def789ghi09')).toBe('123.456.789-09')
  })

  it('deve limitar a 11 dígitos', () => {
    expect(formatCPF('123456789099999')).toBe('123.456.789-09')
  })

  it('deve retornar string vazia para entrada vazia', () => {
    expect(formatCPF('')).toBe('')
  })
})

describe('getCPFMask', () => {
  it('deve retornar configuração da máscara', () => {
    const mask = getCPFMask()
    expect(mask).toEqual({
      mask: '000.000.000-00',
      placeholder: '000.000.000-00',
      maxLength: 14,
    })
  })
})

