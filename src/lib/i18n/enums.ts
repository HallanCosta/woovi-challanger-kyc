export const LANGUAGE_ENUM = {
  EN: "en",
  PT: "pt",
  ES: "es",
} as const

export type Language = (typeof LANGUAGE_ENUM)[keyof typeof LANGUAGE_ENUM]