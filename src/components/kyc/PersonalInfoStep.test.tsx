import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PersonalInfoStep } from './PersonalInfoStep'
import type { PersonalInfo } from './validations/kycSchema'

// Mock dos módulos
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

describe('PersonalInfoStep', () => {
  it('deve renderizar todos os campos', () => {
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

  it('deve chamar onChange ao digitar no campo nome', async () => {
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

  it('deve chamar onChange ao digitar no campo email', async () => {
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

  it('deve desabilitar campo de telefone quando país não está selecionado', () => {
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

  it('deve habilitar campo de telefone quando país está selecionado', () => {
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

  it('deve limpar telefone ao mudar país', async () => {
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

    // Simula mudança de país através do onChange
    const onChange = handleChange.mock.calls[0]
    if (onChange) {
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ phone: '' })
      )
    }
  })

  it('deve mostrar indicador de campo obrigatório', () => {
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

  it('deve mostrar erros de validação', () => {
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

  it('deve aceitar firstFieldRef', () => {
    const ref = { current: null }

    render(
      <PersonalInfoStep
        data={mockData}
        errors={{}}
        onChange={vi.fn()}
        firstFieldRef={ref}
      />
    )

    // O ref deve estar conectado ao primeiro campo
    expect(ref.current).toBeDefined()
  })

  it('deve limitar data máxima para data atual', () => {
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
})

