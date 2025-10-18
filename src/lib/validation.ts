import type { PersonalInfo, ValidationErrors } from "./types"

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string, country?: string): boolean {
  const cleanPhone = phone.replace(/[\s\-+()]/g, "")

  if (!/^\d+$/.test(cleanPhone)) {
    return false
  }

  const countryPhoneLengths: Record<string, number[]> = {
    Brazil: [10, 11],
    "United States": [10],
    Canada: [10], 
    "United Kingdom": [10, 11],
    Spain: [9],
    Portugal: [9],
    Germany: [10, 11],
    France: [10],
    Italy: [10],
    Australia: [10]
  }

  if (country && country in countryPhoneLengths) {
    const validLengths = countryPhoneLengths[country]
    return validLengths.includes(cleanPhone.length)
  }

  return cleanPhone.length >= 8
}

export function calculateAge(dateOfBirth: string): number {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export function validatePersonalInfo(data: PersonalInfo): ValidationErrors {
  const errors: ValidationErrors = {}

  if (!data.fullName.trim()) {
    errors.fullName = "Full name is required"
  } else if (data.fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters"
  }

  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address"
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required"
  } else if (!validatePhone(data.phone, data.country)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required"
  } else {
    const age = calculateAge(data.dateOfBirth)
    if (age < 18) {
      errors.dateOfBirth = "You must be at least 18 years old"
    }
  }

  if (!data.country) {
    errors.country = "Country is required"
  }

  return errors
}

export function validateField(fieldName: string, value: any, allData?: any): string | null {
  switch (fieldName) {
    case "fullName":
      if (!value?.trim()) return "Full name is required"
      if (value.trim().length < 3) return "Full name must be at least 3 characters"
      return null

    case "email":
      if (!value?.trim()) return "Email is required"
      if (!validateEmail(value)) return "Please enter a valid email address"
      return null

    case "phone":
      if (!value?.trim()) return "Phone number is required"
      if (!validatePhone(value, allData?.country)) return "Please enter a valid phone number"
      return null

    case "dateOfBirth":
      if (!value) return "Date of birth is required"
      const age = calculateAge(value)
      if (age < 18) return "You must be at least 18 years old"
      return null

    case "country":
      if (!value) return "Country is required"
      return null

    default:
      return null
  }
}
