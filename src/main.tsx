import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense } from "react"
import { ThemeProvider } from "@/lib/theme/themeProvider"

import '@/styles/globals.css'
// import '@/styles/globals-ocean.css'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </ThemeProvider>
  </StrictMode>
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then((reg) => {
      if (!reg) {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      }
    })
  })
}
