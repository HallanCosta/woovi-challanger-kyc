import { useState, useCallback } from "react"

const initialFormData = {
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
  const [formData, setFormData] = useState(initialFormData)
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldName))
  }, [])

  const validateStep = useCallback(
    (step: number): boolean => {
      return true
    },
    [formData],
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setTouchedFields(new Set())
  }, [])

  const loadDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem("kyc-form-draft")
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (error) {
      console.error("[v0] Error loading draft:", error)
    }
    return null
  }, [])

  return {
    formData,
    touchedFields,
    markFieldTouched,
    validateStep,
    resetForm,
    loadDraft,
  }
}
