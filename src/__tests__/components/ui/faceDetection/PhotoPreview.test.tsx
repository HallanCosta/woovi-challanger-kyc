import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PhotoPreview } from '@/components/ui/faceDetection/PhotoPreview'

it('should render image with src', () => {
  render(<PhotoPreview src="blob:preview" />)
  const img = screen.getByRole('img')
  expect(img).toHaveAttribute('src', 'blob:preview')
})

it('should render label and icon when provided', () => {
  render(<PhotoPreview src="blob:preview" label="Captured" icon={<span data-testid="icon">i</span>} />)
  expect(screen.getByText('Captured')).toBeInTheDocument()
  expect(screen.getByTestId('icon')).toBeInTheDocument()
})
