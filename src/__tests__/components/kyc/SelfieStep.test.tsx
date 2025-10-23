import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SelfieStep } from '@/components/kyc/SelfieStep'
import type { SelfieInfo } from '@/components/kyc/validations/kycSchema'

vi.mock('@/lib/i18n/useTranslation', () => ({
useTranslation: () => ({
  t: (key: string) => key,
  language: 'pt',
  setLanguage: vi.fn() }) }))

vi.mock('@/components/kyc/KeyboardShortcuts', () => ({
KeyboardShortcuts: () => <div>KeyboardShortcuts</div> }))

vi.mock('@/components/ui/faceDetection/SelfieCapture', () => ({
SelfieCapture: ({ onCapture, onClear }: any) => (
  <div data-testid="selfie-capture">
    <button onClick={() => onCapture(new File([''], 'selfie.jpg'))}>
      Capture
    </button>
    <button onClick={onClear}>Clear</button>
  </div>
) }))

const mockData: SelfieInfo = {
selfie: null }

it('should render title and instructions', () => {
  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={vi.fn()}
  />
)

  expect(screen.getByText('selfieVerification')).toBeInTheDocument()
  expect(screen.getByText('selfieInstructions')).toBeInTheDocument()
})

it('should render SelfieCapture', () => {
  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={vi.fn()}
  />
)

  expect(screen.getByTestId('selfie-capture')).toBeInTheDocument()
})

it('should call onChange on capture selfie', () => {
  const handleChange = vi.fn()

  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={handleChange}
  />
)

const captureButton = screen.getByText('Capture')
captureButton.click()

  expect(handleChange).toHaveBeenCalledWith(
  expect.objectContaining({ selfie: expect.any(File) })
)
})

it('should call onChange on clear selfie', () => {
  const handleChange = vi.fn()

  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={handleChange}
  />
)

const clearButton = screen.getByText('Clear')
clearButton.click()

  expect(handleChange).toHaveBeenCalledWith({ selfie: null })
})

it('should show validation error', () => {
  const errors = {
  selfieInfo: {
    selfie: { message: 'Selfie é obrigatória' } } }

  render(
  <SelfieStep
    data={mockData}
    errors={errors as any}
    onChange={vi.fn()}
  />
)

  expect(screen.getByText('Selfie é obrigatória')).toBeInTheDocument()
})

it('should show field label', () => {
  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={vi.fn()}
  />
)

  expect(screen.getByText('selfieUpload')).toBeInTheDocument()
})

it('should render KeyboardShortcuts', () => {
  render(
  <SelfieStep
    data={mockData}
    errors={{}}
    onChange={vi.fn()}
  />
)

  expect(screen.getByText('KeyboardShortcuts')).toBeInTheDocument()
})
