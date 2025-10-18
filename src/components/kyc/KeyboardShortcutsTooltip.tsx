import { HelpCircle } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip"

export function KeyboardShortcutsTooltip() {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Informações sobre atalhos de teclado"
          >
            <HelpCircle className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Atalhos de Teclado</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span>Avançar para o próximo passo</span>
                <kbd className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded ml-auto">Alt+Shift+&gt;</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Voltar ao passo anterior</span>
                <kbd className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded ml-auto">Alt+Shift+&lt;</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Focar primeiro campo obrigatório</span>
                <kbd className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded ml-auto">Alt+F</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span>Enviar formulário (último passo)</span>
                <kbd className="inline-block px-1.5 py-0.5 text-xs bg-muted rounded ml-auto">Alt+S</kbd>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
