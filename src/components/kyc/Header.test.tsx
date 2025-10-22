import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Header } from './Header'

// Mocks
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

describe('Header', () => {
  it('deve renderizar título', () => {
    render(<Header />)
    expect(screen.getByText('kycVerification')).toBeInTheDocument()
  })

  it('deve renderizar botão de tema', () => {
    render(<Header />)
    const themeButton = screen.getByLabelText('toggleTheme')
    expect(themeButton).toBeInTheDocument()
  })

  it('deve renderizar avatar', () => {
    render(<Header />)
    const avatar = screen.getByText('HC')
    expect(avatar).toBeInTheDocument()
  })

  it('deve renderizar Language Switcher', () => {
    render(<Header />)
    expect(screen.getByText('Language Switcher')).toBeInTheDocument()
  })

  it('não deve mostrar botão de instalação quando já instalado', () => {
    render(<Header />)
    const installButton = screen.queryByLabelText('installApp')
    expect(installButton).not.toBeInTheDocument()
  })

  it('deve chamar toggleTheme ao clicar no botão de tema', async () => {
    const toggleTheme = vi.fn()
    
    vi.mocked(await import('@/lib/theme/themeProvider')).useTheme = () => ({
      theme: 'light',
      toggleTheme,
    }) as any

    const user = userEvent.setup()
    render(<Header />)
    
    const themeButton = screen.getByLabelText('toggleTheme')
    await user.click(themeButton)

    expect(toggleTheme).toHaveBeenCalled()
  })

  it('deve renderizar header com classes corretas', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    
    expect(header).toHaveClass('sticky', 'top-0', 'z-30')
  })
})

