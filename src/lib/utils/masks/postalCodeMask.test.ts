import { describe, it, expect } from 'vitest'
import { getPostalCodeFormat, formatPostalCode } from './postalCodeMask'

describe('getPostalCodeFormat', () => {
  it('deve retornar formato para Brasil', () => {
    const format = getPostalCodeFormat('Brazil')
    expect(format.mask).toBe('#####-###')
    expect(format.placeholder).toBe('01234-567')
    expect(format.maxLength).toBe(9)
  })

  it('deve retornar formato para Estados Unidos', () => {
    const format = getPostalCodeFormat('United States')
    expect(format.mask).toBe('#####')
  })

  it('deve retornar formato padrão para país desconhecido', () => {
    const format = getPostalCodeFormat('Unknown')
    expect(format.mask).toBe('##########')
  })
})

describe('formatPostalCode', () => {
  it('deve formatar CEP brasileiro', () => {
    expect(formatPostalCode('01234567', 'Brazil')).toBe('01234-567')
  })

  it('deve formatar ZIP code americano', () => {
    expect(formatPostalCode('10001', 'United States')).toBe('10001')
  })

  it('deve formatar código postal do Reino Unido (alfanumérico)', () => {
    expect(formatPostalCode('SW1A1AA', 'United Kingdom')).toBe('SW1A 1AA')
  })

  it('deve formatar código postal do Canadá (alfanumérico)', () => {
    expect(formatPostalCode('M5H2N2', 'Canada')).toBe('M5H 2N2')
  })

  it('deve converter para maiúsculas em países alfanuméricos', () => {
    expect(formatPostalCode('sw1a1aa', 'United Kingdom')).toBe('SW1A 1AA')
  })

  it('deve retornar valor original se país não informado', () => {
    expect(formatPostalCode('01234567', '')).toBe('01234567')
  })

  it('deve remover caracteres especiais', () => {
    expect(formatPostalCode('01234-567', 'Brazil')).toBe('01234-567')
  })
})

