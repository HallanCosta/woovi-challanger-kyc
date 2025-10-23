import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tips } from '@/components/ui/faceDetection/Tips'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({ t: (k: string) => k })
}))

it('should render tips title and all items', () => {
  render(<Tips />)
  expect(screen.getByText('faceDetection.tipsTitle')).toBeInTheDocument()
  expect(screen.getByText('faceDetection.tipFaceCentered')).toBeInTheDocument()
  expect(screen.getByText('faceDetection.tipGoodLighting')).toBeInTheDocument()
  expect(screen.getByText('faceDetection.tipRemoveAccessories')).toBeInTheDocument()
  expect(screen.getByText('faceDetection.tipLookAtCamera')).toBeInTheDocument()
  expect(screen.getByText('faceDetection.tipNoPhotosOrVideos')).toBeInTheDocument()
})
