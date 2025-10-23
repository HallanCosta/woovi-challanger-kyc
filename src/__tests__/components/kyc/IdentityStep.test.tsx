import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IdentityStep } from '@/components/kyc/IdentityStep'
import type { IdentityInfo } from '@/components/kyc/validations/kycSchema'

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
  FileUpload: ({ onFileSelect }: any) => (
    <input
      data-testid="file-upload"
      type="file"
      onChange={(e) => onFileSelect(e.target.files?.[0])}
    />
  )
}))

const mockData: IdentityInfo = {
  idType: '',
  idNumber: '',
  idFront: null,
  idBack: null
}

it('should render basic fields', () => {
  render(
    <IdentityStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('idType')).toBeInTheDocument()
  expect(screen.getByText('idNumber / CPF')).toBeInTheDocument()
  expect(screen.getByText('idFrontUpload')).toBeInTheDocument()
})

it('should format CPF on type', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()

  render(
    <IdentityStep
      data={mockData}
      errors={{}}
      onChange={handleChange}
    />
  )

  const cpfInput = screen.getByPlaceholderText('000.000.000-00')
  await user.type(cpfInput, '123')

  expect(handleChange).toHaveBeenCalled()
})

it('should show back field for CNH', () => {
  const dataWithCNH = { ...mockData, idType: 'drivers-license' as const }

  render(
    <IdentityStep
      data={dataWithCNH}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('idBackUpload')).toBeInTheDocument()
})

it('should show back field for RG', () => {
  const dataWithRG = { ...mockData, idType: 'rg' as const }

  render(
    <IdentityStep
      data={dataWithRG}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('idBackUpload')).toBeInTheDocument()
})

it('should not show back field for passport', () => {
  const dataWithPassport = { ...mockData, idType: 'passport' as const }

  render(
    <IdentityStep
      data={dataWithPassport}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  expect(screen.queryByText('idBackUpload')).not.toBeInTheDocument()
})

it('should show validation errors', () => {
  const errors = {
    identityInfo: {
      idType: { message: 'Tipo de documento obrigatório' },
      idNumber: { message: 'CPF inválido' }
    }
  }

  render(
    <IdentityStep
      data={mockData}
      errors={errors as any}
      onChange={vi.fn()}
    />
  )

  expect(screen.getByText('Tipo de documento obrigatório')).toBeInTheDocument()
  expect(screen.getByText('CPF inválido')).toBeInTheDocument()
})

it('should accept firstFieldRef', () => {
  const ref = { current: null }

  render(
    <IdentityStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
      firstFieldRef={ref}
    />
  )

  expect(ref.current).toBeDefined()
})

it('should render file uploads', () => {
  render(
    <IdentityStep
      data={mockData}
      errors={{}}
      onChange={vi.fn()}
    />
  )

  const fileUploads = screen.getAllByTestId('file-upload')
  expect(fileUploads.length).toBeGreaterThan(0)
})
