import { describe, it, expect } from 'vitest'
import { getPhoneFormat, formatPhoneNumber } from './phoneMask'

describe('getPhoneFormat', () => {
  it('deve retornar formato para Brasil', () => {
    const format = getPhoneFormat('Brazil')
    expect(format.mask).toBe('(##) #####-####')
    expect(format.placeholder).toBe('(11) 98765-4321')
    expect(format.maxLength).toBe(15)
  })

  it('deve retornar formato para Estados Unidos', () => {
    const format = getPhoneFormat('United States')
    expect(format.mask).toBe('(###) ###-####')
  })

  it('deve retornar formato padrão para país desconhecido', () => {
    const format = getPhoneFormat('Unknown')
    expect(format.mask).toBe('###############')
    expect(format.placeholder).toBe('Enter phone number')
  })
})

describe('formatPhoneNumber', () => {
  it('deve formatar telefone brasileiro', () => {
    expect(formatPhoneNumber('11987654321', 'Brazil')).toBe('(11) 98765-4321')
  })

  it('deve formatar telefone americano', () => {
    expect(formatPhoneNumber('5551234567', 'United States')).toBe('(555) 123-4567')
  })

  it('deve remover caracteres não numéricos', () => {
    expect(formatPhoneNumber('(11) 98765-4321', 'Brazil')).toBe('(11) 98765-4321')
  })

  it('deve retornar valor original se país não informado', () => {
    expect(formatPhoneNumber('11987654321', '')).toBe('11987654321')
  })

  it('deve formatar parcialmente se número incompleto', () => {
    expect(formatPhoneNumber('119', 'Brazil')).toBe('(11) 9')
  })
})

