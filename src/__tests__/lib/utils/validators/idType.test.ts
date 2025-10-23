import { it, expect } from 'vitest'
import { validateIdTypeSelected, validateIdBackRequired } from '@/lib/utils/validators/idType'

it('should return true when ID type is selected', () => {
  expect(validateIdTypeSelected('passport')).toBe(true)
  expect(validateIdTypeSelected('drivers_license')).toBe(true)
})

it('should return false when ID type is empty', () => {
  expect(validateIdTypeSelected('')).toBe(false)
})
 

it('should return true for passport (no back required)', () => {
  expect(validateIdBackRequired('passport', null)).toBe(true)
})

it('should return true when back is provided for required document', () => {
  const file = new File(['content'], 'id-back.jpg', {
    type: 'image/jpeg'
  })
  expect(validateIdBackRequired('drivers_license', file)).toBe(true)
})

it('should return false when back is missing for required document', () => {
  expect(validateIdBackRequired('drivers_license', null)).toBe(false)
})

it('should return false for empty ID type without file', () => {
  expect(validateIdBackRequired('', null)).toBe(false)
})

it('should validate file as File instance', () => {
  const file = new File(['content'], 'id.jpg', { type: 'image/jpeg' })
  expect(validateIdBackRequired('id_card', file)).toBe(true)
})

