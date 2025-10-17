import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Header } from "@/components/kyc/Header"
import { Sidebar } from "@/components/kyc/Sidebar"
import { ProgressSteps } from "@/components/ui/ProgressSteps"
import { PersonalInfoStep } from "@/components/kyc/PersonalInfoStep"
import { useKYCForm } from "@/hooks/useKycForm"

export function KYCVerification() {
  const {
    formData,
    updatePersonalInfo,
  } = useKYCForm()

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 5
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

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

  const steps = [
    { number: 1, label: "Informações Pessoais" },
    { number: 2, label: "Endereço" },
    { number: 3, label: "Identidade" },
    { number: 4, label: "Selfie" },
    { number: 5, label: "Revisão" },
  ]

  const handleNext = () => {
    nextStep()
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col bg-background lg:flex-row">
        <Sidebar />
        <main className="flex-1 lg:ml-[200px]">
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
              <h2 className="mb-3 text-2xl font-bold">Verificação Enviada</h2>
              <p className="mb-6 text-muted-foreground">Enviado com sucesso!</p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  goToStep(1)
                }}
                variant="outline"
              >
                Enviar Outro
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
      <main className="flex-1 lg:ml-[200px]">
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
                  variant="outline"
                  onClick={prevStep}
                  disabled={isFirstStep}
                  className="w-full bg-transparent sm:w-auto sm:min-w-[120px]"
                >
                  Voltar
                </Button>

                {!isLastStep ? (
                  <Button
                    onClick={handleNext}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto sm:min-w-[120px]"
                  >
                    Continuar
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto sm:min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
