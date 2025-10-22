import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from './LanguageSwitcher'

// Mock do useTranslation
const mockSetLanguage = vi.fn()
const mockLanguage = 'en'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: mockLanguage,
    setLanguage: mockSetLanguage,
  }),
}))

describe('LanguageSwitcher', () => {
  it('deve renderizar botão de idioma', () => {
    render(<LanguageSwitcher />)
    expect(screen.getByLabelText(/changeLanguage/i)).toBeInTheDocument()
  })

  it('deve abrir menu ao clicar', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)
    
    const button = screen.getByLabelText(/changeLanguage/i)
    await user.click(button)
    
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Português')).toBeInTheDocument()
    expect(screen.getByText('Español')).toBeInTheDocument()
  })

  it('deve fechar menu ao clicar em opção', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)
    
    // Abre o menu
    const button = screen.getByLabelText(/changeLanguage/i)
    await user.click(button)
    
    // Clica em uma opção
    const portuguesOption = screen.getByText('Português')
    await user.click(portuguesOption)
    
    // Menu deve estar fechado
    expect(screen.queryByText('English')).not.toBeInTheDocument()
  })

  it('deve chamar setLanguage ao selecionar idioma', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)
    
    const button = screen.getByLabelText(/changeLanguage/i)
    await user.click(button)
    
    const portuguesOption = screen.getByText('Português')
    await user.click(portuguesOption)
    
    expect(mockSetLanguage).toHaveBeenCalledWith('pt')
  })

  it('deve alternar menu ao clicar no botão múltiplas vezes', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)
    
    const button = screen.getByLabelText(/changeLanguage/i)
    
    // Abre
    await user.click(button)
    expect(screen.getByText('English')).toBeInTheDocument()
    
    // Fecha
    await user.click(button)
    expect(screen.queryByText('English')).not.toBeInTheDocument()
    
    // Abre novamente
    await user.click(button)
    expect(screen.getByText('English')).toBeInTheDocument()
  })
})

