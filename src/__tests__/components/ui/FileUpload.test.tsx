import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FileUpload } from '@/components/ui/FileUpload'

vi.mock('@/lib/i18n/useTranslation', () => ({
useTranslation: () => ({
  t: (key: string) => key,
  language: 'pt',
  setLanguage: vi.fn() }) }))

it('should render file input', () => {
  render(<FileUpload onFileSelect={vi.fn()} />)
  const input = document.querySelector('input[type="file"]')
  expect(input).toBeInTheDocument()
})

it('should have hidden file input', () => {
  render(<FileUpload onFileSelect={vi.fn()} />)
  const input = document.querySelector('input[type="file"]')
  expect(input).toHaveClass('hidden')
})

it('should show helper text', () => {
  render(
  <FileUpload 
    onFileSelect={vi.fn()} 
    helperText="Send PDF only"
  />
)

  expect(screen.getByText('Send PDF only')).toBeInTheDocument()
})

it('should show selected file', () => {
  const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })

  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    value={file}
  />
)

  expect(screen.getByText('document.pdf')).toBeInTheDocument()
})

it('should show file name when value is defined', () => {
  const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })

  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    value={file}
  />
)

  expect(screen.getByText('document.pdf')).toBeInTheDocument()
})

it('should be disabled when disabled=true', () => {
  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    disabled
  />
)

const input = document.querySelector('input[type="file"]')
  expect(input).toBeDisabled()
})

it('should render with custom maxSizeMB', () => {
  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    maxSizeMB={10}
  />
)

const input = document.querySelector('input[type="file"]')
  expect(input).toBeInTheDocument()
})

it('should accept specific file types', () => {
  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    accept=".pdf,.doc"
  />
)

const input = document.querySelector('input[type="file"]')
  expect(input).toHaveAttribute('accept', '.pdf,.doc')
})

it('should render image preview', () => {
  const file = new File([''], 'image.jpg', { type: 'image/jpeg' })

  render(
  <FileUpload 
    onFileSelect={vi.fn()}
    value={file}
  />
)

  expect(screen.getByText('image.jpg')).toBeInTheDocument()
})

