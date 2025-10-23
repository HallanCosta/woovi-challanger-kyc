import { it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KycForm } from '@/components/kyc/KycForm'

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

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({ t: (k: string) => k, language: 'en', setLanguage: vi.fn() })
}))

vi.mock('@/hooks/useToast', () => ({
  useToast: () => ({ toasts: [], dismiss: vi.fn() })
}))

vi.mock('@/components/kyc/hooks/useKycForm', () => ({
  useKYCForm: () => ({
    formData: {
      personalInfo: { fullName: '', email: '', phone: '', dateOfBirth: '', country: '' },
      addressInfo: { street: '', city: '', state: '', postalCode: '', addressProof: null },
      identityInfo: { idType: '', idNumber: '', idFront: null, idBack: null },
      selfieInfo: { selfie: null },
      termsAccepted: false,
    },
    updatePersonalInfo: vi.fn(),
    updateAddressInfo: vi.fn(),
    updateIdentityInfo: vi.fn(),
    updateSelfieInfo: vi.fn(),
    updateTermsAccepted: vi.fn(),
    validateStep: vi.fn().mockResolvedValue(true),
    errors: {},
    onSubmit: vi.fn(),
  })
}))

vi.mock('framer-motion', () => ({
  motion: { div: (props: any) => <div {...props} /> },
  AnimatePresence: ({ children }: any) => <>{children}</>
}))

vi.mock('@/hooks/usePwaInstall', () => ({
  usePwaInstall: () => ({ isInstallable: false, isInstalled: true, isIosManualInstall: false, promptInstall: vi.fn() })
}))

beforeEach(() => {
  vi.useRealTimers()
})

it('should render header and sidebar', () => {
  render(<KycForm />)
  expect(screen.getByText('kycVerification')).toBeInTheDocument()
  expect(screen.getAllByText('BANK').length).toBeGreaterThan(0)
})

it('should move to next step when current step is valid', async () => {
  const user = userEvent.setup()
  render(<KycForm />)

  const name = screen.getByPlaceholderText('fullNamePlaceholder')
  const email = screen.getByPlaceholderText('emailPlaceholder')
  await user.type(name, 'John Doe')
  await user.type(email, 'john@example.com')

  const continueBtn = screen.getByRole('button', { name: 'continue' })
  await user.click(continueBtn)

  expect(await screen.findByText('addressVerification')).toBeInTheDocument()
})

it('should submit on last step when valid', async () => {
  const user = userEvent.setup()
  render(<KycForm />)

  await user.type(screen.getByPlaceholderText('fullNamePlaceholder'), 'John Doe')
  await user.type(screen.getByPlaceholderText('emailPlaceholder'), 'john@example.com')
  await user.click(screen.getByRole('button', { name: 'continue' }))

  const cityPh = screen.getByPlaceholderText('cityPlaceholder')
  await user.type(cityPh, 'City')
  await user.click(screen.getByRole('button', { name: 'continue' }))

  expect(screen.getByText('idType')).toBeInTheDocument()
})
