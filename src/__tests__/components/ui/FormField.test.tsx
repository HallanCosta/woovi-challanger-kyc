import { it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { FormField } from '@/components/ui/FormField'

vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'pt',
    setLanguage: vi.fn(),
  }),
}))

it('should render label', () => {
  render(
    <FormField label="Nome">
      <input />
    </FormField>
  )
  expect(screen.getByText('Nome')).toBeInTheDocument()
})

it('should render children', () => {
  render(
    <FormField label="Email">
      <input data-testid="email-input" />
    </FormField>
  )
  expect(screen.getByTestId('email-input')).toBeInTheDocument()
})

it('should show asterisk when required=true', () => {
  render(
    <FormField label="Nome" required>
      <input />
    </FormField>
  )
  expect(screen.getByText('*')).toBeInTheDocument()
})

it('should not show asterisk when required=false', () => {
  render(
    <FormField label="Nome">
      <input />
    </FormField>
  )
  expect(screen.queryByText('*')).not.toBeInTheDocument()
})

it('should show error message', () => {
  render(
    <FormField label="Email" error="Campo obrigatório">
      <input />
    </FormField>
  )
  expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
})

it('error should have role="alert"', () => {
  render(
    <FormField label="Email" error="Erro">
      <input />
    </FormField>
  )
  expect(screen.getByRole('alert')).toHaveTextContent('Erro')
})

it('should not show error when error is undefined', () => {
  render(
    <FormField label="Email">
      <input />
    </FormField>
  )
  expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})

it('should apply custom className', () => {
  const { container } = render(
    <FormField label="Nome" className="custom-class">
      <input />
    </FormField>
  )
  expect(container.firstChild).toHaveClass('custom-class')
})

it('should add shake class when there is an error', async () => {
  const { container, rerender } = render(
    <FormField label="Email">
      <input />
    </FormField>
  )
  
  rerender(
    <FormField label="Email" error="Campo obrigatório">
      <input />
    </FormField>
  )
  
  expect(container.firstChild).toHaveClass('shake')
  
  await waitFor(() => {
    expect(container.firstChild).not.toHaveClass('shake')
  }, { timeout: 600 })
})

it('should use translation for error message', () => {
  render(
    <FormField label="Email" error="validation.required">
      <input />
    </FormField>
  )
  expect(screen.getByText('validation.required')).toBeInTheDocument()
})

