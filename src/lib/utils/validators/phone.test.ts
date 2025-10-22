import { describe, it, expect } from 'vitest'
import { validatePhoneByCountry } from './phone'

describe('validatePhoneByCountry', () => {
  describe('Brasil', () => {
    it('deve validar telefone com 10 dígitos (fixo)', () => {
      expect(validatePhoneByCountry('(11) 3456-7890', 'Brazil')).toBe(true)
      expect(validatePhoneByCountry('1134567890', 'Brazil')).toBe(true)
    })

    it('deve validar telefone com 11 dígitos (celular)', () => {
      expect(validatePhoneByCountry('(11) 98765-4321', 'Brazil')).toBe(true)
      expect(validatePhoneByCountry('11987654321', 'Brazil')).toBe(true)
    })

    it('deve rejeitar telefone com número incorreto de dígitos', () => {
      expect(validatePhoneByCountry('123456789', 'Brazil')).toBe(false)
      expect(validatePhoneByCountry('123456789012', 'Brazil')).toBe(false)
    })
  })

  describe('Estados Unidos', () => {
    it('deve validar telefone com 10 dígitos', () => {
      expect(validatePhoneByCountry('(555) 123-4567', 'United States')).toBe(true)
      expect(validatePhoneByCountry('5551234567', 'United States')).toBe(true)
    })

    it('deve rejeitar telefone com número incorreto de dígitos', () => {
      expect(validatePhoneByCountry('123456789', 'United States')).toBe(false)
    })
  })

  describe('País genérico', () => {
    it('deve aceitar telefone com 8 ou mais dígitos para países não especificados', () => {
      expect(validatePhoneByCountry('12345678', 'Unknown Country')).toBe(true)
      expect(validatePhoneByCountry('123456789', 'Unknown Country')).toBe(true)
    })

    it('deve rejeitar telefone com menos de 8 dígitos', () => {
      expect(validatePhoneByCountry('1234567', 'Unknown Country')).toBe(false)
    })
  })

  it('deve rejeitar telefone com caracteres não numéricos', () => {
    expect(validatePhoneByCountry('123abc4567', 'Brazil')).toBe(false)
  })

  it('deve remover formatação ao validar', () => {
    // Com código do país +55, teria 13 dígitos (55 + 11 dígitos)
    // O validator espera apenas 10 ou 11 dígitos locais
    expect(validatePhoneByCountry('(11) 98765-4321', 'Brazil')).toBe(true)
  })
})

