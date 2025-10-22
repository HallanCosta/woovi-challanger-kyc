import { z } from 'zod'
import { validateFullName, validateMinAge } from '@/lib/utils/validators'

const emailSchema = z.string().email('validation.email.invalid')

const fullNameSchema = z.string()
  .min(1, 'validation.fullName.required')
  .refine((name) => validateFullName(name), 'validation.fullName.format')

const dateOfBirthSchema = z.string()
  .min(1, 'validation.dateOfBirth.required')
  .refine((date) => validateMinAge(date, 18), 'validation.dateOfBirth.minAge')

export const userSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  dateOfBirth: dateOfBirthSchema,
})

export type User = z.infer<typeof userSchema>

export function validateUser(data: unknown) {
  return userSchema.safeParse(data)
}

