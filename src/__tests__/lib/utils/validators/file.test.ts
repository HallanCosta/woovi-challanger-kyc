import { it, expect } from 'vitest'
import { 
  validateFileSize, 
  validateFileType, 
  validateFileRequired,
  FILE_TYPES 
} from '@/lib/utils/validators/file'

it('should return true for null file', () => {
  expect(validateFileSize(null)).toBe(true)
})

it('should validate file within the limit', () => {
  const file = new File(['x'.repeat(1024 * 1024)], 'test.pdf', {
    type: 'application/pdf'
  })
  expect(validateFileSize(file, 2)).toBe(true)
})

it('should reject file above the limit', () => {
  const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', {
    type: 'application/pdf'
  })
  expect(validateFileSize(file, 5)).toBe(false)
})

it('should use default limit of 5MB', () => {
  const file = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', {
    type: 'application/pdf'
  })
  expect(validateFileSize(file)).toBe(false)
})
 

it('should return true for null file', () => {
  expect(validateFileType(null, FILE_TYPES.IMAGES)).toBe(true)
})

it('should validate allowed file type', () => {
  const file = new File(['content'], 'image.jpg', {
    type: 'image/jpeg'
  })
  expect(validateFileType(file, FILE_TYPES.IMAGES)).toBe(true)
})

it('should reject disallowed file type', () => {
  const file = new File(['content'], 'doc.txt', {
    type: 'text/plain'
  })
  expect(validateFileType(file, FILE_TYPES.IMAGES)).toBe(false)
})

it('should validate PDF in document types', () => {
  const file = new File(['content'], 'doc.pdf', {
    type: 'application/pdf'
  })
  expect(validateFileType(file, FILE_TYPES.DOCUMENTS)).toBe(true)
})
 

it('should return false for null file', () => {
  expect(validateFileRequired(null)).toBe(false)
})

it('should return true for present file', () => {
  const file = new File(['content'], 'test.pdf', {
    type: 'application/pdf'
  })
  expect(validateFileRequired(file)).toBe(true)
})
 

it('should have image types defined', () => {
  expect(FILE_TYPES.IMAGES).toContain('image/jpeg')
  expect(FILE_TYPES.IMAGES).toContain('image/png')
})

it('should have document types defined', () => {
  expect(FILE_TYPES.DOCUMENTS).toContain('application/pdf')
  expect(FILE_TYPES.DOCUMENTS).toContain('image/jpeg')
  expect(FILE_TYPES.DOCUMENTS).toContain('image/png')
})

