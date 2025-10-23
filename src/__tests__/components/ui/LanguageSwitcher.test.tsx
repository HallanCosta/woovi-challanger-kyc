import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

const mockSetLanguage = vi.fn()
const mockLanguage = 'en'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: mockLanguage,
    setLanguage: mockSetLanguage,
  }),
}))

it('should render language button', () => {
  render(<LanguageSwitcher />)
  expect(screen.getByLabelText(/changeLanguage/i)).toBeInTheDocument()
})

it('should open menu on click', async () => {
  const user = userEvent.setup()
  render(<LanguageSwitcher />)
  
  const button = screen.getByLabelText(/changeLanguage/i)
  await user.click(button)
  
  expect(screen.getByText('English')).toBeInTheDocument()
  expect(screen.getByText('Português')).toBeInTheDocument()
  expect(screen.getByText('Español')).toBeInTheDocument()
})

it('should close menu when clicking an option', async () => {
  const user = userEvent.setup()
  render(<LanguageSwitcher />)
  
  const button = screen.getByLabelText(/changeLanguage/i)
  await user.click(button)
  
  const portuguesOption = screen.getByText('Português')
  await user.click(portuguesOption)
  
  expect(screen.queryByText('English')).not.toBeInTheDocument()
})

it('should call setLanguage when selecting language', async () => {
  const user = userEvent.setup()
  render(<LanguageSwitcher />)
  
  const button = screen.getByLabelText(/changeLanguage/i)
  await user.click(button)
  
  const portuguesOption = screen.getByText('Português')
  await user.click(portuguesOption)
  
  expect(mockSetLanguage).toHaveBeenCalledWith('pt')
})

it('should toggle menu when clicking the button multiple times', async () => {
  const user = userEvent.setup()
  render(<LanguageSwitcher />)
  
  const button = screen.getByLabelText(/changeLanguage/i)
  
  await user.click(button)
  expect(screen.getByText('English')).toBeInTheDocument()
  
  await user.click(button)
  expect(screen.queryByText('English')).not.toBeInTheDocument()
  
  await user.click(button)
  expect(screen.getByText('English')).toBeInTheDocument()
})

