import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({ t: (k: string) => k, language: 'en', setLanguage: vi.fn() })
}))

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({ toasts: [], dismiss: vi.fn() })
}))

vi.mock('@vladmandic/human', () => ({
  default: class HumanMock {
    draw: any
    webcam: any
    constructor(_: any) {
      this.draw = { canvas: vi.fn() }
      this.webcam = { stop: vi.fn() }
    }
    async load() {}
    async warmup() {}
    video(_: HTMLVideoElement | false) {}
    next() { return {} }
  }
}))

vi.mock('@/lib/theme/themeProvider', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
  ThemeProvider: ({ children }: any) => <>{children}</>,
}))

vi.mock('@/hooks/usePwaInstall', () => ({
  usePwaInstall: () => ({ isInstallable: false, isInstalled: true, isIosManualInstall: false, promptInstall: vi.fn() })
}))

it('should render KYC form title', () => {
  render(<App />)
  expect(screen.getByText('kycVerification')).toBeInTheDocument()
})
