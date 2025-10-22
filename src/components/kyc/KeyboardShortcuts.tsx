import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
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

  const KeyCombo = ({ keys }: { keys: string[] }) => (
    <span className="ml-auto flex items-center">
      {keys.map((key, index) => (
        <span key={`${key}-${index}`} className="flex items-center">
          {index > 0 && <span className="px-1 text-muted-foreground/80">+</span>}
          <kbd className="inline-flex items-center rounded bg-muted px-1.5 py-0.5 text-xs font-medium">{key}</kbd>
        </span>
      ))}
    </span>
  )

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

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("keyboardShortcuts")}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-[300px] rounded-md border bg-popover p-3 text-popover-foreground shadow-md"
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

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>{t("shortcutNext")}</span>
              <KeyCombo keys={["Ctrl", "Enter"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>{t("shortcutPrev")}</span>
              <KeyCombo keys={["Ctrl", "Backspace"]} />
            </div>
            <div className="flex items-center justify-between">
              <span>{t("shortcutTab")}</span>
              <KeyCombo keys={["Tab"]} />
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


