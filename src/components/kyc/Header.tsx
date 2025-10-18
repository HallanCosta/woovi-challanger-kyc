import { Button } from "@/components/ui/Button"
import { Moon, Sun, Languages } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { useTheme } from "@/lib/theme/themeProvider"

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <h1 className="text-lg font-semibold md:text-xl">Verificação KYC</h1>

      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" aria-label="Alterar idioma">
          <Languages className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" />
          <AvatarFallback>HC</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
