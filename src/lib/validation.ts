import { z } from 'zod'

const emailSchema = z.string().email('Please enter a valid email address')

const fullNameSchema = z.string()
  .min(1, 'Full name is required')
  .refine((name) => {
    const trimmedName = name.trim()
    if (trimmedName.length < 3) return false
    
    const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0)
    if (nameParts.length < 2) return false
    
    return nameParts.every(part => part.length >= 2)
  }, 'Please enter your full name with at least first and last name')

const dateOfBirthSchema = z.string()
  .min(1, 'Date of birth is required')
  .refine((date) => {
    const today = new Date()
    const birthDate = new Date(date)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age >= 18
  }, 'You must be at least 18 years old')

export const personalInfoSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: z.string().min(1, 'Phone number is required'),
  dateOfBirth: dateOfBirthSchema,
  country: z.string().min(1, 'Country is required')
}).refine((data) => {
  const cleanPhone = data.phone.replace(/[\s\-+()]/g, '')

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

  if (data.country in countryPhoneLengths) {
    const validLengths = countryPhoneLengths[data.country]
    return validLengths.includes(cleanPhone.length)
  }

  return cleanPhone.length >= 8
}, {
  message: 'Please enter a valid phone number',
  path: ['phone']
})

export const addressInfoSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  addressProof: z.instanceof(File).nullable()
})

export const identityInfoSchema = z.object({
  idType: z.enum(['passport', 'drivers-license', 'rg', '']).refine((val) => val !== '', 'Please select an ID type'),
  idNumber: z.string().min(1, 'ID number is required'),
  idFront: z.instanceof(File).nullable(),
  idBack: z.instanceof(File).nullable()
})

export const selfieInfoSchema = z.object({
  selfie: z.instanceof(File).nullable()
})

export const kycFormDataSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  identityInfo: identityInfoSchema,
  selfieInfo: selfieInfoSchema,
  termsAccepted: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions')
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>
export type AddressInfo = z.infer<typeof addressInfoSchema>
export type IdentityInfo = z.infer<typeof identityInfoSchema>
export type SelfieInfo = z.infer<typeof selfieInfoSchema>
export type KYCFormData = z.infer<typeof kycFormDataSchema>

export function validatePersonalInfo(data: unknown) {
  return personalInfoSchema.safeParse(data)
}

export function validateAddressInfo(data: unknown) {
  return addressInfoSchema.safeParse(data)
}

export function validateIdentityInfo(data: unknown) {
  return identityInfoSchema.safeParse(data)
}

export function validateSelfieInfo(data: unknown) {
  return selfieInfoSchema.safeParse(data)
}

export function validateKYCFormData(data: unknown) {
  return kycFormDataSchema.safeParse(data)
}

export function validateField(fieldName: string, value: any, allData?: any) {
  switch (fieldName) {
    case 'fullName':
      const fullNameResult = fullNameSchema.safeParse(value)
      return fullNameResult.success ? null : fullNameResult.error.issues[0]?.message || 'Invalid full name'
    
    case 'email':
      const emailResult = emailSchema.safeParse(value)
      return emailResult.success ? null : emailResult.error.issues[0]?.message || 'Invalid email'
    
    case 'phone':
      if (!value?.trim()) return 'Phone number is required'
      const phoneResult = personalInfoSchema.pick({ phone: true, country: true }).safeParse({ phone: value, country: allData?.country })
      return phoneResult.success ? null : phoneResult.error.issues[0]?.message || 'Invalid phone number'
    
    case 'dateOfBirth':
      const dateResult = dateOfBirthSchema.safeParse(value)
      return dateResult.success ? null : dateResult.error.issues[0]?.message || 'Invalid date of birth'
    
    case 'country':
      if (!value) return 'Country is required'
      return null
    
    default:
      return null
  }
}

export function getValidationErrors(result: { success: boolean; error?: { issues: Array<{ path: (string | number)[]; message: string }> } }): Record<string, string> {
  if (result.success) return {}
  
  const errors: Record<string, string> = {}
  
  result.error?.issues.forEach((error) => {
    const path = error.path.join('.')
    errors[path] = error.message
  })
  
  return errors
}
