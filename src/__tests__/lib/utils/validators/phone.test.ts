import { it, expect } from 'vitest'
import { validatePhoneByCountry } from '@/lib/utils/validators/phone'

  it('should validate Brazilian phone with 10 digits (landline)', () => {
    expect(validatePhoneByCountry('(11) 3456-7890', 'Brazil')).toBe(true)
    expect(validatePhoneByCountry('1134567890', 'Brazil')).toBe(true)
  })

  it('should validate Brazilian phone with 11 digits (mobile)', () => {
    expect(validatePhoneByCountry('(11) 98765-4321', 'Brazil')).toBe(true)
    expect(validatePhoneByCountry('11987654321', 'Brazil')).toBe(true)
  })

  it('should reject Brazilian phone with incorrect number of digits', () => {
    expect(validatePhoneByCountry('123456789', 'Brazil')).toBe(false)
    expect(validatePhoneByCountry('123456789012', 'Brazil')).toBe(false)
  })
 

  it('should validate US phone with 10 digits', () => {
    expect(validatePhoneByCountry('(555) 123-4567', 'United States')).toBe(true)
    expect(validatePhoneByCountry('5551234567', 'United States')).toBe(true)
  })

  it('should reject US phone with incorrect number of digits', () => {
    expect(validatePhoneByCountry('123456789', 'United States')).toBe(false)
  })
 

  it('should accept phone with 8+ digits for unspecified countries', () => {
    expect(validatePhoneByCountry('12345678', 'Unknown Country')).toBe(true)
    expect(validatePhoneByCountry('123456789', 'Unknown Country')).toBe(true)
  })

  it('should reject phone with fewer than 8 digits', () => {
    expect(validatePhoneByCountry('1234567', 'Unknown Country')).toBe(false)
  })
 

it('should reject phone with non-numeric characters', () => {
  expect(validatePhoneByCountry('123abc4567', 'Brazil')).toBe(false)
})

it('should remove formatting before validation', () => {
  expect(validatePhoneByCountry('(11) 98765-4321', 'Brazil')).toBe(true)
})

