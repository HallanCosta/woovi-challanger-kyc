import { useState, useCallback } from "react"

export function useMultiStepForm(totalSteps: number) {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }, [])

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step)
      }
    },
    [totalSteps],
  )

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps
  const progress = (currentStep / totalSteps) * 100

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
    progress,
    totalSteps,
  }
}
