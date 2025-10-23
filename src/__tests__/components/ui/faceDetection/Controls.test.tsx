import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Controls } from '@/components/ui/faceDetection/Controls'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({ t: (k: string) => k })
}))

it('should call onCancel and onCapture', async () => {
  const onCancel = vi.fn()
  const onCapture = vi.fn()
  const user = userEvent.setup()

  render(<Controls onCancel={onCancel} onCapture={onCapture} />)

  await user.click(screen.getByRole('button', { name: 'faceDetection.cancel' }))
  expect(onCancel).toHaveBeenCalled()

  await user.click(screen.getByRole('button', { name: 'faceDetection.capturePhoto' }))
  expect(onCapture).toHaveBeenCalled()
})

it('should disable capture when canCapture=false', () => {
  const { getByRole } = render(<Controls onCancel={vi.fn()} onCapture={vi.fn()} canCapture={false} />)
  expect(getByRole('button', { name: 'faceDetection.capturePhoto' })).toBeDisabled()
})
