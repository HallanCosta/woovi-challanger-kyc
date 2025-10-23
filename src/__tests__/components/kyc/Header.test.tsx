import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Header } from '@/components/kyc/Header'
import { useTheme } from '@/lib/theme/themeProvider'
import * as themeProvider from '@/lib/theme/themeProvider'

vi.mock('@/lib/theme/themeProvider', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}))

vi.mock('@/hooks/usePwaInstall', () => ({
  usePwaInstall: () => ({
    isInstallable: false,
    isInstalled: true,
    isIosManualInstall: false,
    promptInstall: vi.fn(),
  }),
}))

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({
    toasts: [],
    toast: vi.fn(),
    dismiss: vi.fn(),
  }),
}))

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'pt',
    setLanguage: vi.fn(),
  }),
}))

vi.mock('@/components/ui/LanguageSwitcher', () => ({
  LanguageSwitcher: () => <div>Language Switcher</div>,
}))

it('should render title', () => {
  render(<Header />)
  expect(screen.getByText('kycVerification')).toBeInTheDocument()
})

it('should render theme button', () => {
  render(<Header />)
  const themeButton = screen.getByLabelText('toggleTheme')
  expect(themeButton).toBeInTheDocument()
})

it('should render avatar', () => {
  render(<Header />)
  const avatar = screen.getByText('HC')
  expect(avatar).toBeInTheDocument()
})

it('should render language switcher', () => {
  render(<Header />)
  expect(screen.getByText('Language Switcher')).toBeInTheDocument()
})

it('should not show install button when already installed', () => {
  render(<Header />)
  const installButton = screen.queryByLabelText('installApp')
  expect(installButton).not.toBeInTheDocument()
})

it('should call toggleTheme when clicking theme button', async () => {
  const toggleTheme = vi.fn()
  
  vi.spyOn(themeProvider, 'useTheme').mockReturnValue({
    theme: 'light',
    toggleTheme,
  } as any)

  const user = userEvent.setup()
  render(<Header />)
  
  const themeButton = screen.getByLabelText('toggleTheme')
  await user.click(themeButton)

  expect(toggleTheme).toHaveBeenCalled()
})

it('should render header with correct classes', () => {
  const { container } = render(<Header />)
  const header = container.querySelector('header')
  
  expect(header).toHaveClass('sticky', 'top-0', 'z-30')
})

