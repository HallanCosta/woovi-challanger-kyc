"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  DollarSign,
  ArrowRightLeft,
  ArrowDownToLine,
  Share2,
  Trophy,
  HelpCircle,
  Mail,
  FileText,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/Button"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Contas", active: false },
  { icon: DollarSign, label: "Depósito", active: false },
  { icon: ArrowRightLeft, label: "Transferência", active: false },
  { icon: ArrowDownToLine, label: "Saque", active: false },
  { icon: Share2, label: "Afiliado", active: false },
  { icon: Trophy, label: "Rankings", active: false },
  { icon: HelpCircle, label: "FAQ", active: false },
  { icon: Mail, label: "Contato", active: false },
  { icon: FileText, label: "Documentos", active: false },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-sidebar-border px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-primary-foreground">
              <path
                d="M3 3L12 21L21 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">BANK</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="h-5 w-5 text-sidebar-foreground" />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <p className="mb-2 px-3 text-xs font-medium text-sidebar-foreground/60">Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-50 lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[200px] bg-sidebar lg:block">{sidebarContent}</aside>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed left-0 top-0 z-50 h-screen w-[250px] bg-sidebar lg:hidden">{sidebarContent}</aside>
        </>
      )}
    </>
  )
}
