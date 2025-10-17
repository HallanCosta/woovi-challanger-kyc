import { useState, useCallback } from "react"
import type { KYCFormData, PersonalInfo } from "@/lib/types"

const initialFormData: KYCFormData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
  },
  addressInfo: {
    street: "",
    city: "",
    state: "",
    postalCode: "",
    addressProof: null,
  },
  identityInfo: {
    idType: "",
    idNumber: "",
    idFront: null,
    idBack: null,
  },
  selfieInfo: {
    selfie: null,
  },
  termsAccepted: false,
}

export function useKYCForm() {
  const [formData, setFormData] = useState<KYCFormData>(initialFormData)

  const updatePersonalInfo = useCallback(
    (data: Partial<PersonalInfo>) => {
      setFormData((prev) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, ...data },
      }))
    },
    [],
  )

  const validateStep = useCallback(
    (_step: number): boolean => {
      return true
    },
    [formData],
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
  }, [])

  return {
    formData,
    updatePersonalInfo,
    validateStep,
    resetForm,
  }
}
