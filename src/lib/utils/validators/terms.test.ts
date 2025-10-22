import { describe, it, expect } from 'vitest'
import { validateTermsAccepted } from './terms'

describe('validateTermsAccepted', () => {
  it('deve retornar true quando termos aceitos', () => {
    expect(validateTermsAccepted(true)).toBe(true)
  })

  it('deve retornar false quando termos não aceitos', () => {
    expect(validateTermsAccepted(false)).toBe(false)
  })
})

