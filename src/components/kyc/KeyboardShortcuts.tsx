import { useEffect, useRef, useState } from "react"
import { HelpCircle, X } from "lucide-react"

import { useTranslation } from "@/lib/i18n/useTranslation"

export function KeyboardShortcuts() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current) return
      if (event.target instanceof Node && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative inline-block ml-auto">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label={t("keyboardShortcuts")}
      >
        <HelpCircle className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t("keyboardShortcuts")}
          className="absolute right-0 z-50 mt-2 w-72 rounded-md border bg-popover p-3 text-popover-foreground shadow-md"
        >
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold">{t("keyboardShortcuts")}</h4>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-muted-foreground hover:text-foreground"
              aria-label={t("closeMenu")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span>{t("shortcutNext")}</span>
              <kbd className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs ml-auto">Alt+Shift+&gt;</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("shortcutPrev")}</span>
              <kbd className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs ml-auto">Alt+Shift+&lt;</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("shortcutFocusFirst")}</span>
              <kbd className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs ml-auto">Alt+F</kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("shortcutSubmit")}</span>
              <kbd className="inline-block rounded bg-muted px-1.5 py-0.5 text-xs ml-auto">Alt+S</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


