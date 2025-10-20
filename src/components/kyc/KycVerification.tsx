import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/kyc/Header"
import { Sidebar } from "@/components/ui/Sidebar"
import { ProgressSteps } from "@/components/kyc/ProgressSteps"
import { PersonalInfoStep } from "@/components/kyc/PersonalInfoStep"
import { Toast, ToastContainer } from "@/components/ui/Toast"

import { useKYCForm } from "@/hooks/useKycForm"
import { useToast } from "@/hooks/useToast"
import { useTranslation } from "@/lib/i18n/useTranslation"

export function KycVerification() {
  const {
    formData,
    updatePersonalInfo,
    validateStep,
    errors,
    onSubmit
  } = useKYCForm()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  const { toasts, dismiss } = useToast()
  const { t } = useTranslation()

  const totalSteps = 5
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps
  const steps = [
    { number: 1, label: t("personalInfo") },
    { number: 2, label: t("address") },
    { number: 3, label: t("identity") },
    { number: 4, label: t("selfie") },
    { number: 5, label: t("review") },
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      nextStep()
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsSubmitting(true)
    
    onSubmit()

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select')) {
        return
      }

      if (!(event.ctrlKey && event.shiftKey)) return

      if (event.key === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        if (!isLastStep) handleNext()
        return
      }

      if (event.key === 'Backspace') {
        event.preventDefault()
        if (!isFirstStep) prevStep()
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, isFirstStep, isLastStep])

  

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
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  goToStep(1)
                }}
                variant="outline"
              >
                {t("submitAnother")}
              </Button>
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
              <ProgressSteps steps={steps} currentStep={currentStep} onStepClick={goToStep} />
            </motion.div>

            <form onSubmit={onSubmit}>
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
