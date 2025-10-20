export const steps = [
  "personalInfo",
  "address",
  "identity",
  "selfie",
  "review",
] as const

export type StepId = typeof steps[number]
