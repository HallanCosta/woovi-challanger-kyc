import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Suspense } from "react"
import { ThemeProvider } from "@/lib/theme/themeProvider"

import '@/styles/globals.css'

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
