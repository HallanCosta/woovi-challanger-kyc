import { z } from 'zod'
import {
  validateCPF,
  validateFullName,
  validateMinAge,
  validatePhoneByCountry,
  validateFileSize,
  validateFileType,
  validateFileRequired,
  validateIdTypeSelected,
  validateIdBackRequired,
  validateTermsAccepted,
  FILE_TYPES,
} from '@/lib/utils/validators'

const emailSchema = z.string().email('validation.email.invalid')

const fullNameSchema = z.string()
  .min(1, 'validation.fullName.required')
  .refine((name) => validateFullName(name), 'validation.fullName.format')

const dateOfBirthSchema = z.string()
  .min(1, 'validation.dateOfBirth.required')
  .refine((date) => validateMinAge(date, 18), 'validation.dateOfBirth.minAge')

export const personalInfoSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: z.string().min(1, 'validation.phone.required'),
  dateOfBirth: dateOfBirthSchema,
  country: z.string().min(1, 'validation.country.required')
}).refine((data) => validatePhoneByCountry(data.phone, data.country), {
  message: 'validation.phone.invalid',
  path: ['phone']
})

export const addressInfoSchema = z.object({
  street: z.string().min(1, 'validation.address.street.required'),
  city: z.string().min(1, 'validation.address.city.required'),
  state: z.string().min(1, 'validation.address.state.required'),
  postalCode: z.string().min(1, 'validation.address.postalCode.required'),
  addressProof: z.instanceof(File)
    .nullable()
    .refine((file) => validateFileRequired(file), 'validation.address.addressProof.required')
    .refine((file) => validateFileSize(file, 5), 'validation.address.addressProof.maxSize')
    .refine((file) => validateFileType(file, FILE_TYPES.DOCUMENTS), 'validation.address.addressProof.type')
})

export const identityInfoSchema = z.object({
  idType: z.enum(['passport', 'drivers-license', 'rg', '']).refine(
    (val) => validateIdTypeSelected(val), 
    'validation.identity.idType.required'
  ),
  idNumber: z.string()
    .min(1, 'validation.identity.idNumber.required')
    .refine((cpf) => validateCPF(cpf), 'validation.identity.idNumber.invalid'),
  idFront: z.instanceof(File)
    .nullable()
    .refine((file) => validateFileRequired(file), 'validation.identity.idFront.required')
    .refine((file) => validateFileSize(file, 5), 'validation.identity.idFront.maxSize')
    .refine((file) => validateFileType(file, FILE_TYPES.IMAGES), 'validation.identity.idFront.type'),
  idBack: z.instanceof(File)
    .nullable()
    .refine((file) => validateFileSize(file, 5), 'validation.identity.idBack.maxSize')
    .refine((file) => validateFileType(file, FILE_TYPES.IMAGES), 'validation.identity.idBack.type')
}).refine(
  (data) => validateIdBackRequired(data.idType, data.idBack),
  {
    message: 'validation.identity.idBack.required',
    path: ['idBack']
  }
)

export const selfieInfoSchema = z.object({
  selfie: z.instanceof(File)
    .nullable()
    .refine((file) => validateFileRequired(file), 'validation.selfie.required')
    .refine((file) => validateFileSize(file, 5), 'validation.selfie.maxSize')
    .refine((file) => validateFileType(file, FILE_TYPES.IMAGES), 'validation.selfie.type')
})

export const kycFormDataSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  identityInfo: identityInfoSchema,
  selfieInfo: selfieInfoSchema,
  termsAccepted: z.boolean().refine((val) => validateTermsAccepted(val), 'validation.terms.accept')
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

export function getValidationErrors(result: { success: boolean; error?: { issues: Array<{ path: (string | number)[]; message: string }> } }): Record<string, string> {
  if (result.success) return {}
  
  const errors: Record<string, string> = {}
  
  result.error?.issues.forEach((error) => {
    const path = error.path.join('.')
    errors[path] = error.message
  })
  
  return errors
}

