"use client"

import { Fragment } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  number: number
  label: string
}

interface ProgressStepsProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function ProgressSteps({ steps, currentStep, onStepClick }: ProgressStepsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep
          const isCurrent = step.number === currentStep
          const isClickable = onStepClick && step.number < currentStep

          // O conector antes do nó usa o estado do passo anterior
          const prevCompleted = index > 0 ? steps[index - 1].number < currentStep : false

          return (
            <Fragment key={step.number}>
              {index > 0 && (
                <div className={cn("mx-1 md:mx-2 h-0.5 flex-1 transition-colors", prevCompleted ? "bg-primary" : "bg-border")} />
              )}

              <div className="w-auto md:w-[118px] md:flex-shrink-0 flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary bg-background text-primary",
                    !isCompleted && !isCurrent && "border-border bg-background text-muted-foreground",
                    isClickable && "cursor-pointer hover:border-primary/70",
                  )}
                  aria-label={`Step ${step.number}: ${step.label}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.number}</span>
                  )}
                </button>
                <span
                  className={cn(
                    "mt-2 hidden text-xs font-medium md:block text-center",
                    isCurrent ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
