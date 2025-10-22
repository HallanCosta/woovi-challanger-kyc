import { describe, it, expect } from 'vitest'
import { validateIdTypeSelected, validateIdBackRequired } from './idType'

describe('validateIdTypeSelected', () => {
  it('deve retornar true quando tipo de ID está selecionado', () => {
    expect(validateIdTypeSelected('passport')).toBe(true)
    expect(validateIdTypeSelected('drivers_license')).toBe(true)
  })

  it('deve retornar false quando tipo de ID está vazio', () => {
    expect(validateIdTypeSelected('')).toBe(false)
  })
})

describe('validateIdBackRequired', () => {
  it('deve retornar true para passaporte (não requer verso)', () => {
    expect(validateIdBackRequired('passport', null)).toBe(true)
  })

  it('deve retornar true quando verso está presente para documento que requer', () => {
    const file = new File(['content'], 'id-back.jpg', {
      type: 'image/jpeg'
    })
    expect(validateIdBackRequired('drivers_license', file)).toBe(true)
  })

  it('deve retornar false quando verso não está presente para documento que requer', () => {
    expect(validateIdBackRequired('drivers_license', null)).toBe(false)
  })

  it('deve retornar false para tipo de ID vazio sem arquivo', () => {
    expect(validateIdBackRequired('', null)).toBe(false)
  })

  it('deve validar arquivo como File instance', () => {
    const file = new File(['content'], 'id.jpg', { type: 'image/jpeg' })
    expect(validateIdBackRequired('id_card', file)).toBe(true)
  })
})

