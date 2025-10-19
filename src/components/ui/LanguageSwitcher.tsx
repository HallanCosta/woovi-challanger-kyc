import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Languages } from "lucide-react"
import { useTranslation } from "@/lib/i18n/useTranslation"
import type { Language } from "@/lib/i18n/translations"
import { LANGUAGE_ENUM } from "@/lib/i18n/enums"

export function LanguageSwitcher() {
  const { t, setLanguage } = useTranslation()
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
      <Button variant="ghost" size="icon" aria-label={t("changeLanguage")} onClick={() => setOpen((v) => !v)}>
        <Languages className="h-5 w-5" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-popover p-1 shadow-md">
          <button className="w-full rounded px-2 py-1 text-left hover:bg-accent" onClick={() => handleLanguageChange(LANGUAGE_ENUM.EN)}>English</button>
          <button className="w-full rounded px-2 py-1 text-left hover:bg-accent" onClick={() => handleLanguageChange(LANGUAGE_ENUM.PT)}>Português</button>
          <button className="w-full rounded px-2 py-1 text-left hover:bg-accent" onClick={() => handleLanguageChange(LANGUAGE_ENUM.ES)}>Español</button>
        </div>
      )}
    </div>
  )
}


