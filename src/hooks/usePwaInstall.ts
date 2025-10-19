import { useCallback, useEffect, useRef, useState } from "react"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function usePwaInstall() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isIosManualInstall, setIsIosManualInstall] = useState(false)
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const isStandalone = window.matchMedia?.("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
    if (isStandalone) {
      setIsInstalled(true)
    }

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent)
    if (isIos && !isStandalone) {
      setIsInstallable(true)
      setIsIosManualInstall(true)
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      deferredPromptRef.current = e as BeforeInstallPromptEvent
      setIsInstallable(true)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      deferredPromptRef.current = null
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)
    window.addEventListener("appinstalled", handleInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
      window.removeEventListener("appinstalled", handleInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (isIosManualInstall) return false
    const deferredPrompt = deferredPromptRef.current
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    deferredPromptRef.current = null
    setIsInstallable(false)
    return choice.outcome === "accepted"
  }, [isIosManualInstall])

  return { isInstallable, isInstalled, isIosManualInstall, promptInstall }
}


