
export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  country: string
}

export interface AddressInfo {
  street: string
  city: string
  state: string
  postalCode: string
  addressProof: File | null
}

export interface IdentityInfo {
  idType: "passport" | "drivers-license" | "rg" | ""
  idNumber: string
  idFront: File | null
  idBack: File | null
}

export interface SelfieInfo {
  selfie: File | null
}

export interface KYCFormData {
  personalInfo: PersonalInfo
  addressInfo: AddressInfo
  identityInfo: IdentityInfo
  selfieInfo: SelfieInfo
  termsAccepted: boolean
}
