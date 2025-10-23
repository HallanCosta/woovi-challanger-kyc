import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReviewStep } from '@/components/kyc/ReviewStep'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({ t: (k: string) => k })
}))

const mockData: any = {
  personalInfo: { fullName: 'John Doe', email: 'john@example.com', phone: '+1', country: 'United States', dateOfBirth: '2000-01-01' },
  addressInfo: { street: 'Main', city: 'NY', state: 'NY', postalCode: '10001', addressProof: null },
  identityInfo: { idType: 'passport', idNumber: '123', idFront: null, idBack: null },
  selfieInfo: { selfie: null },
}

it('should render sections and toggle terms', async () => {
  const onEditStep = vi.fn()
  const onTermsChange = vi.fn()
  const user = userEvent.setup()

  render(
    <ReviewStep
      data={mockData}
      onEditStep={onEditStep}
      termsAccepted={false}
      onTermsChange={onTermsChange}
    />
  )

  expect(screen.getByText('reviewAndSubmit')).toBeInTheDocument()
  expect(screen.getByText('personalInfo')).toBeInTheDocument()
  expect(screen.getByText('address')).toBeInTheDocument()
  expect(screen.getByText('identity')).toBeInTheDocument()
  expect(screen.getByText('selfie')).toBeInTheDocument()

  const checkbox = screen.getByRole('checkbox')
  await user.click(checkbox)
  expect(onTermsChange).toHaveBeenCalledWith(true)
})

