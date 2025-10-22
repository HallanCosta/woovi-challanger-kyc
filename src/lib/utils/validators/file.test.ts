import { describe, it, expect } from 'vitest'
import { 
  validateFileSize, 
  validateFileType, 
  validateFileRequired,
  FILE_TYPES 
} from './file'

describe('validateFileSize', () => {
  it('deve retornar true para arquivo nulo', () => {
    expect(validateFileSize(null)).toBe(true)
  })

  it('deve validar arquivo dentro do limite', () => {
    const file = new File(['x'.repeat(1024 * 1024)], 'test.pdf', {
      type: 'application/pdf'
    })
    expect(validateFileSize(file, 2)).toBe(true)
  })

  it('deve rejeitar arquivo acima do limite', () => {
    const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', {
      type: 'application/pdf'
    })
    expect(validateFileSize(file, 5)).toBe(false)
  })

  it('deve usar limite padrão de 5MB', () => {
    const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', {
      type: 'application/pdf'
    })
    expect(validateFileSize(file)).toBe(false)
  })
})

describe('validateFileType', () => {
  it('deve retornar true para arquivo nulo', () => {
    expect(validateFileType(null, FILE_TYPES.IMAGES)).toBe(true)
  })

  it('deve validar tipo de arquivo permitido', () => {
    const file = new File(['content'], 'image.jpg', {
      type: 'image/jpeg'
    })
    expect(validateFileType(file, FILE_TYPES.IMAGES)).toBe(true)
  })

  it('deve rejeitar tipo de arquivo não permitido', () => {
    const file = new File(['content'], 'doc.txt', {
      type: 'text/plain'
    })
    expect(validateFileType(file, FILE_TYPES.IMAGES)).toBe(false)
  })

  it('deve validar PDF em tipos de documentos', () => {
    const file = new File(['content'], 'doc.pdf', {
      type: 'application/pdf'
    })
    expect(validateFileType(file, FILE_TYPES.DOCUMENTS)).toBe(true)
  })
})

describe('validateFileRequired', () => {
  it('deve retornar false para arquivo nulo', () => {
    expect(validateFileRequired(null)).toBe(false)
  })

  it('deve retornar true para arquivo presente', () => {
    const file = new File(['content'], 'test.pdf', {
      type: 'application/pdf'
    })
    expect(validateFileRequired(file)).toBe(true)
  })
})

describe('FILE_TYPES', () => {
  it('deve ter tipos de imagem definidos', () => {
    expect(FILE_TYPES.IMAGES).toContain('image/jpeg')
    expect(FILE_TYPES.IMAGES).toContain('image/png')
  })

  it('deve ter tipos de documento definidos', () => {
    expect(FILE_TYPES.DOCUMENTS).toContain('application/pdf')
    expect(FILE_TYPES.DOCUMENTS).toContain('image/jpeg')
    expect(FILE_TYPES.DOCUMENTS).toContain('image/png')
  })
})

