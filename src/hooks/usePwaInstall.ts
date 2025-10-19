import { useCallback, useEffect, useRef, useState } from "react"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function usePwaInstall() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
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
    const deferredPrompt = deferredPromptRef.current
    if (!deferredPrompt) return false
    await deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    deferredPromptRef.current = null
    setIsInstallable(false)
    return choice.outcome === "accepted"
  }, [])

  return { isInstallable, isInstalled, promptInstall }
}


