import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Languages, Check } from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"
import type { Language } from "@/lib/i18n/translations"
import { LANGUAGE_ENUM } from "@/lib/i18n/enums"

export function LanguageSwitcher() {
  const { t, setLanguage, language } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!ref.current) return
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  const handleLanguageChange = (language: Language) => {
    setLanguage(language)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        aria-label={`${t("changeLanguage")} (${language.toUpperCase()})`}
        onClick={() => setOpen((v) => !v)}
      >
        <Languages className="h-5 w-5" />
        <span className="ml-2 hidden uppercase md:inline">{language}</span>
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md">
          <button
            className={`flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-accent ${language === LANGUAGE_ENUM.EN ? "bg-accent/70 font-semibold" : ""}`}
            onClick={() => handleLanguageChange(LANGUAGE_ENUM.EN)}
          >
            English
            {language === LANGUAGE_ENUM.EN && <Check className="h-4 w-4" />}
          </button>
          <button
            className={`flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-accent ${language === LANGUAGE_ENUM.PT ? "bg-accent/70 font-semibold" : ""}`}
            onClick={() => handleLanguageChange(LANGUAGE_ENUM.PT)}
          >
            Português
            {language === LANGUAGE_ENUM.PT && <Check className="h-4 w-4" />}
          </button>
          <button
            className={`flex w-full items-center justify-between rounded px-2 py-1 text-left hover:bg-accent ${language === LANGUAGE_ENUM.ES ? "bg-accent/70 font-semibold" : ""}`}
            onClick={() => handleLanguageChange(LANGUAGE_ENUM.ES)}
          >
            Español
            {language === LANGUAGE_ENUM.ES && <Check className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}


