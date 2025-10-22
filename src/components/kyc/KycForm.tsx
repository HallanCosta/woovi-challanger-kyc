import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/kyc/Header"
import { Sidebar } from "@/components/ui/Sidebar"
import { ProgressSteps } from "@/components/kyc/ProgressSteps"
import { PersonalInfoStep } from "@/components/kyc/PersonalInfoStep"
import { AddressStep } from "@/components/kyc/AddressStep"
import { IdentityStep } from "@/components/kyc/IdentityStep"
import { SelfieStep } from "@/components/kyc/SelfieStep"
import { ReviewStep } from "@/components/kyc/ReviewStep"
import { Toast, ToastContainer } from "@/components/ui/Toast"

import { useKYCForm } from "@/components/kyc/hooks/useKycForm"
import { useToast } from "@/hooks/useToast"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { useMultiStepForm } from "@/hooks/useMultiStepForm"
import { steps as stepsIds } from "@/components/kyc/constants/steps"

export function KycForm() {
  const {
    formData,
    updatePersonalInfo,
    updateAddressInfo,
    updateIdentityInfo,
    updateSelfieInfo,
    updateTermsAccepted,
    validateStep,
    errors,
    onSubmit
  } = useKYCForm()

  const totalSteps = stepsIds.length
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm(totalSteps)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [validatedSteps, setValidatedSteps] = useState<number[]>([])
  const [maxReachedStep, setMaxReachedStep] = useState(1)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const { toasts, dismiss } = useToast()
  const { t } = useTranslation()
  const steps = stepsIds.map((id, index) => ({ number: index + 1, label: t(id) }))

  const handleNext = useCallback(async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setValidatedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep]
        }
        return prev
      })
      const nextStepNumber = currentStep + 1
      setMaxReachedStep((prev) => Math.max(prev, nextStepNumber))
      nextStep()
    }
  }, [currentStep, validateStep, nextStep])

  const handleStepClick = useCallback(async (step: number) => {
    if (step < currentStep) {
      goToStep(step)
      return
    }
    
    if (step > currentStep && step <= maxReachedStep) {
      const isValid = await validateStep(currentStep)
      if (isValid) {
        setValidatedSteps((prev) => {
          if (!prev.includes(currentStep)) {
            return [...prev, currentStep]
          }
          return prev
        })
        goToStep(step)
      }
    }
  }, [currentStep, maxReachedStep, validateStep, goToStep])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isLastStep) {
      return
    }
    
    const isValid = await validateStep(currentStep)
    if (!isValid) {
      return
    }
    
    setIsSubmitting(true)
    onSubmit()
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleSubmitShortcut = useCallback(async () => {
    if (!isLastStep || isSubmitting) return
    
    const isValid = await validateStep(currentStep)
    if (!isValid) return
    
    setIsSubmitting(true)
    onSubmit()
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }, [isLastStep, isSubmitting, currentStep, validateStep, onSubmit])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isInInput = event.target instanceof HTMLElement && 
                       event.target.matches('input, textarea, select')

      if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
        if (!isLastStep) {
          handleNext()
        } else {
          handleSubmitShortcut()
        }
        return
      }

      if (event.ctrlKey && !event.shiftKey && !event.altKey && event.key === 'Backspace') {
        event.preventDefault()
        event.stopPropagation()
        if (!isFirstStep) {
          prevStep()
        }
        return
      }

      if (event.key === 'Enter' && !event.ctrlKey && !isLastStep && isInInput) {
        event.preventDefault()
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true })
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [currentStep, isFirstStep, isLastStep, handleNext, prevStep, handleSubmitShortcut])

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-background lg:flex-row">
        <Sidebar />
        <main className="flex-1 lg:ml-[226px]">
          <Header />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6"
          >
            <div className="max-w-md text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 flex justify-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 className="h-10 w-10 text-success" />
                </div>
              </motion.div>
              <h2 className="mb-3 text-2xl font-bold">{t("verificationSubmitted")}</h2>
              <p className="mb-6 text-muted-foreground">{t("submittedSuccessfully")}</p>
            </div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-[226px]">
        <Header />
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-lg bg-card p-4 shadow-sm md:mb-8 md:p-6"
            >
              <ProgressSteps 
                steps={steps} 
                currentStep={currentStep} 
                validatedSteps={validatedSteps}
                maxReachedStep={maxReachedStep}
                onStepClick={handleStepClick} 
              />
            </motion.div>

            <form onSubmit={handleSubmit}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="rounded-lg bg-card p-4 shadow-sm md:p-6 lg:p-8"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentStep === 1 && (
                      <PersonalInfoStep
                        data={formData.personalInfo}
                        onChange={updatePersonalInfo}
                        errors={errors}
                        firstFieldRef={firstFieldRef}
                      />
                    )}
                    {currentStep === 2 && (
                      <AddressStep
                        data={formData.addressInfo}
                        onChange={updateAddressInfo}
                        errors={errors}
                        firstFieldRef={firstFieldRef}
                        country={formData.personalInfo.country}
                      />
                    )}
                    {currentStep === 3 && (
                      <IdentityStep
                        data={formData.identityInfo}
                        onChange={updateIdentityInfo}
                        errors={errors}
                        firstFieldRef={firstFieldRef}
                      />
                    )}
                    {currentStep === 4 && (
                      <SelfieStep
                        data={formData.selfieInfo}
                        onChange={updateSelfieInfo}
                        errors={errors}
                      />
                    )}
                    {currentStep === 5 && (
                      <ReviewStep
                        data={formData}
                        onEditStep={goToStep}
                        termsAccepted={formData.termsAccepted}
                        onTermsChange={(accepted) => updateTermsAccepted(accepted)}
                        termsError={errors.termsAccepted?.message}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row md:mt-8"
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isFirstStep}
                    className="w-full bg-transparent sm:w-auto sm:min-w-[120px]"
                  >
                    {t("back")}
                  </Button>

                  {!isLastStep ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto sm:min-w-[120px]"
                    >
                      {t("continue")}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto sm:min-w-[120px]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("submitting")}
                        </>
                      ) : (
                        t("submit")
                      )}
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </form>
          </div>
        </div>
      </main>
      
      <ToastContainer>
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            id={toastItem.id}
            title={toastItem.title}
            description={toastItem.description}
            variant={toastItem.variant}
            onDismiss={dismiss}
          />
        ))}
      </ToastContainer>
    </div>
  )
}


