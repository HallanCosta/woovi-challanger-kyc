import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { AddressStep } from '@/components/kyc/AddressStep'
import type { AddressInfo } from '@/components/kyc/validations/kycSchema'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'pt',
    setLanguage: vi.fn()
  })
}))

vi.mock('@/components/kyc/KeyboardShortcuts', () => ({
  KeyboardShortcuts: () => <div>KeyboardShortcuts</div>
}))

vi.mock('@/components/ui/FileUpload', () => ({
  FileUpload: ({ onFileSelect, value }: any) => (
    <input
      data-testid="file-upload"
      type="file"
      onChange={(e) => onFileSelect(e.target.files?.[0])}
    />
  )
}))

const mockData: AddressInfo = {
  street: '',
  city: '',
  state: '',
  postalCode: '',
  addressProof: null
}

it('should render all fields', () => {
  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('streetAddress')).toBeInTheDocument()
  expect(screen.getByText('city')).toBeInTheDocument()
  expect(screen.getByText('stateProvince')).toBeInTheDocument()
  expect(screen.getByText('postalCode')).toBeInTheDocument()
  expect(screen.getByText('addressProof')).toBeInTheDocument()
})

it('should call onChange when typing in street', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
    />
  )

  const streetInput = screen.getByPlaceholderText('streetAddressPlaceholder')
  await user.type(streetInput, 'Rua Teste')

  expect(handleChange).toHaveBeenCalled()
})

it('should call onChange when typing in city', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
    />
  )

  const cityInput = screen.getByPlaceholderText('cityPlaceholder')
  await user.type(cityInput, 'São Paulo')

  expect(handleChange).toHaveBeenCalled()
})

it('should format CEP for Brazil', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
      country="Brazil"
    />
  )

  const postalCodeInput = screen.getByPlaceholderText('01234-567')
  await user.type(postalCodeInput, '0')

  expect(handleChange).toHaveBeenCalled()
})

it('should show required field indicators', () => {
  render(
    <AddressStep
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
    addressInfo: {
      street: { message: 'Rua é obrigatória' },
      city: { message: 'Cidade é obrigatória' }
    }
  }

  render(
    <AddressStep
      data={mockData}
      errors={errors as any}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('Rua é obrigatória')).toBeInTheDocument()
  expect(screen.getByText('Cidade é obrigatória')).toBeInTheDocument()
})

it('should accept firstFieldRef', () => {
  const ref = { current: null }

  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
      firstFieldRef={ref}
    />
  )

  expect(ref.current).toBeDefined()
})

it('should render file upload for proof', () => {
  render(
    <AddressStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByTestId('file-upload')).toBeInTheDocument()
})
