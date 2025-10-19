import { Button } from "@/components/ui/Button"
import { Moon, Sun, Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useTheme } from "@/lib/theme/themeProvider"
import { usePwaInstall } from "@/hooks/usePwaInstall"
import { useToast } from "@/hooks/useToast"
import { Toast, ToastContainer } from "@/components/ui/Toast"
import { useTranslation } from "@/lib/i18n/useTranslation"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { isInstallable, isInstalled, isIosManualInstall, promptInstall } = usePwaInstall()
  const { toasts, toast, dismiss } = useToast()
  const { t } = useTranslation()

  const handleInstall = () => {
    if (isIosManualInstall) {
      toast({
        title: t("installAppTitle"),
        description: t("installAppMessageIOS"),
      })
    } else {
      void promptInstall()
    }
  }
 
  const shouldShowInstall = isIosManualInstall || (!isInstalled && isInstallable)

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background pl-14 pr-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-xl">{t("kycVerification")}</h1>

        <div className="flex items-center gap-2 md:gap-3">
          {shouldShowInstall && (
            <Button
              variant="secondary"
              className="w-9 px-0 md:w-auto md:px-4"
              onClick={handleInstall}
              aria-label={t("installApp")}
            >
              <Download className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">{t("install")}</span>
            </Button>
          )}
          <LanguageSwitcher />

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={t("toggleTheme")}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>HC</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <ToastContainer>
        {toasts.map((t) => (
          <Toast key={t.id} id={t.id} title={t.title} description={t.description} onDismiss={dismiss} />
        ))}
      </ToastContainer>
    </>
  )
}
