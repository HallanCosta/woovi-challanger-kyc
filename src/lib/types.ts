
export type PersonalInfo = {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  country: string
}

export type AddressInfo = {
  street: string
  city: string
  state: string
  postalCode: string
  addressProof: File | null
}

export type IdentityInfo = {
  idType: "passport" | "drivers-license" | "rg" | ""
  idNumber: string
  idFront: File | null
  idBack: File | null
}

export type SelfieInfo = {
  selfie: File | null
}

export type KYCFormData = {
  personalInfo: PersonalInfo
  addressInfo: AddressInfo
  identityInfo: IdentityInfo
  selfieInfo: SelfieInfo
  termsAccepted: boolean
}

export type ValidationErrors = {
  [key: string]: string
}