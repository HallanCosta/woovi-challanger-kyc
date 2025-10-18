import { useState, useCallback } from "react"
import type { KYCFormData, ValidationErrors } from "@/lib/types"
import { validatePersonalInfo, validateField } from "@/lib/validation"
import { useFieldValidation } from "./useFieldValidaction"

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
  const [errors, setErrors] = useState<ValidationErrors>({})

  const {
    fieldErrors,
    validateField: validateFieldRealtime,
    setErrors: setFieldErrors,
  } = useFieldValidation((fieldName, value, allData) => validateField(fieldName, value, allData), 300)

  const updatePersonalInfo = useCallback(
    (data: Partial<KYCFormData["personalInfo"]>) => {
      setFormData((prev) => {
        const newData = {
          ...prev,
          personalInfo: { ...prev.personalInfo, ...data },
        }

        Object.keys(data).forEach((key) => {
          validateFieldRealtime(key, data[key as keyof typeof data], newData.personalInfo)
        })

        return newData
      })
    },
    [validateFieldRealtime],
  )

  const validateStep = useCallback(
    (step: number): boolean => {
      let stepErrors: ValidationErrors = {}

      if (step === 1) {
        stepErrors = validatePersonalInfo(formData.personalInfo)
      }

      const mergedErrors = { ...fieldErrors, ...stepErrors }
      setErrors(mergedErrors)
      setFieldErrors(mergedErrors)
      return Object.keys(mergedErrors).length === 0
    },
    [formData, fieldErrors, setFieldErrors],
  )

  const resetForm = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
  }, [])

  return {
    formData,
    updatePersonalInfo,
    validateStep,
    resetForm,
    errors
  }
}
