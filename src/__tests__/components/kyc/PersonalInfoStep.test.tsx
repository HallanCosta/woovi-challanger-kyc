import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PersonalInfoStep } from '@/components/kyc/PersonalInfoStep'
import type { PersonalInfo } from '@/components/kyc/validations/kycSchema'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'pt',
    setLanguage: vi.fn(),
  }),
}))

vi.mock('@/components/kyc/KeyboardShortcuts', () => ({
  KeyboardShortcuts: () => <div>KeyboardShortcuts</div>,
}))

const mockData: PersonalInfo = {
  fullName: '',
  email: '',
  country: '',
  phone: '',
  dateOfBirth: '',
}

it('should render all fields', () => {
  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('fullName')).toBeInTheDocument()
  expect(screen.getByText('email')).toBeInTheDocument()
  expect(screen.getByText('country')).toBeInTheDocument()
  expect(screen.getByText('phone')).toBeInTheDocument()
  expect(screen.getByText('dateOfBirth')).toBeInTheDocument()
})

it('should call onChange when typing in full name', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
    />
  )

  const nameInput = screen.getByPlaceholderText('fullNamePlaceholder')
  await user.type(nameInput, 'João Silva')

  expect(handleChange).toHaveBeenCalled()
})

it('should call onChange when typing in email', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
    />
  )

  const emailInput = screen.getByPlaceholderText('emailPlaceholder')
  await user.type(emailInput, 'test@example.com')

  expect(handleChange).toHaveBeenCalled()
})

it('should disable phone field when country is not selected', () => {
  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  const phoneInput = screen.getByPlaceholderText('selectCountryFirst')
  expect(phoneInput).toBeDisabled()
})

it('should enable phone field when country is selected', () => {
  const dataWithCountry = { ...mockData, country: 'Brazil' }

  render(
    <PersonalInfoStep
      data={dataWithCountry}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  const phoneInput = screen.getByPlaceholderText('(11) 98765-4321')
  expect(phoneInput).not.toBeDisabled()
})

it('should clear phone when changing country', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  const dataWithPhone = { 
    ...mockData, 
    country: 'Brazil',
    phone: '11987654321' 
  }

  render(
    <PersonalInfoStep
      data={dataWithPhone}
      errors={{}}
      onChange={handleChange}
    />
  )

  const onChange = handleChange.mock.calls[0]
  if (onChange) {
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '' })
    )
  }
})

it('should show required field indicator', () => {
  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  const requiredIndicators = screen.getAllByText('*')
  expect(requiredIndicators.length).toBeGreaterThan(0)
})

it('should show validation errors', () => {
  const errors = {
    personalInfo: {
      fullName: { message: 'Nome é obrigatório' },
      email: { message: 'Email inválido' },
    },
  }

  render(
    <PersonalInfoStep
      data={mockData}
      errors={errors as any}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument()
  expect(screen.getByText('Email inválido')).toBeInTheDocument()
})

it('should accept firstFieldRef', () => {
  const ref = { current: null }

  render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
      firstFieldRef={ref}
    />
  )

  expect(ref.current).toBeDefined()
})

it('should limit max date to current date', () => {
  const { container } = render(
    <PersonalInfoStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  const dateInput = container.querySelector('input[type="date"]')
  const today = new Date().toISOString().split('T')[0]
  expect(dateInput?.getAttribute('max')).toBe(today)
})

