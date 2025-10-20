import { useCallback, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import type { FieldPath } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { KYCFormData } from "@/lib/types"
import { 
  kycFormDataSchema,
  type PersonalInfo,
} from "@/lib/validation"
import { steps as stepsIds, type StepId } from "@/components/kyc/constants/steps"

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
  const form = useForm<KYCFormData>({
    resolver: zodResolver(kycFormDataSchema),
    defaultValues: initialFormData,
    mode: "onBlur",
    reValidateMode: "onChange",
    delayError: 1000,
  })

  const { 
    handleSubmit, 
    watch, 
    setValue, 
    getValues, 
    formState: { errors, isValid, isDirty },
    reset,
    trigger
  } = form

  const formData = watch()

  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const updatePersonalInfo = useCallback(
    (data: Partial<PersonalInfo>) => {
      setValue("personalInfo", { ...formData.personalInfo, ...data }, { 
        shouldValidate: false,
        shouldDirty: true 
      })

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }

      const changedKeys = Object.keys(data) as (keyof PersonalInfo)[]

      let fieldsToTrigger = changedKeys.map(key => (
        `personalInfo.${String(key)}` as FieldPath<KYCFormData>
      ))

      const isCountryChange = "country" in data && "phone" in data && data.phone === ""
      if (isCountryChange) {
        fieldsToTrigger = ["personalInfo.country" as FieldPath<KYCFormData>]
      }

      debounceTimeoutRef.current = setTimeout(() => {
        trigger(fieldsToTrigger)
      }, 500)
    },
    [setValue, formData.personalInfo, trigger]
  )

  const validateStep = useCallback(
    async (step: number): Promise<boolean> => {
      const stepId = stepsIds[step - 1]
      if (!stepId) return false

      const stepToFieldsMap: Record<StepId, keyof KYCFormData> = {
        personalInfo: "personalInfo",
        address: "addressInfo",
        identity: "identityInfo",
        selfie: "selfieInfo",
        review: "termsAccepted",
      }

      const field = stepToFieldsMap[stepId]
      return trigger([field])
    },
    [trigger]
  )

  const resetForm = useCallback(() => {
    reset(initialFormData)
  }, [reset])

  const onSubmit = useCallback(
    (data: KYCFormData) => {
      console.log("Form submitted:", data)
    },
    []
  )

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  return {
    formData,
    
    updatePersonalInfo,
    
    validateStep,
    resetForm,
    
    errors,
    isValid,
    isDirty,
    
    handleSubmit,
    setValue,
    getValues,
    trigger,
    
    onSubmit: handleSubmit(onSubmit)
  }
}


