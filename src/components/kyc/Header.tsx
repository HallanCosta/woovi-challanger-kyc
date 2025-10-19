import { Button } from "@/components/ui/Button"
import { Moon, Sun, Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useTheme } from "@/lib/theme/themeProvider"
import { usePwaInstall } from "@/hooks/usePwaInstall"
import { useToast } from "@/hooks/useToast"
import { Toast, ToastContainer } from "@/components/ui/Toast"

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { isInstallable, isInstalled, isIosManualInstall, promptInstall } = usePwaInstall()
  const { toasts, toast, dismiss } = useToast()

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background pl-14 pr-4 md:px-6">
        <h1 className="text-lg font-semibold md:text-xl">Verificação KYC</h1>

        <div className="flex items-center gap-2 md:gap-3">
          {!isInstalled && isInstallable && (
            <>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => {
                  if (isIosManualInstall) {
                    toast({
                      title: "Adicionar à Tela de Início",
                      description: "No iPhone, toque em Compartilhar → Adicionar à Tela de Início.",
                    })
                  } else {
                    void promptInstall()
                  }
                }}
                aria-label="Instalar app"
              >
                <Download className="h-4 w-4" />
              </Button>
            </>
          )}
          {/* <Button variant="ghost" size="icon" aria-label="Alterar idioma">
            <Languages className="h-5 w-5" />
          </Button> */}

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
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
