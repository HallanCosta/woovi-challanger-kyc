import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { FormField } from './FormField'

// Mock do hook useTranslation
vi.mock('@/lib/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'pt',
    setLanguage: vi.fn(),
  }),
}))

describe('FormField', () => {
  it('deve renderizar label', () => {
    render(
      <FormField label="Nome">
        <input />
      </FormField>
    )
    expect(screen.getByText('Nome')).toBeInTheDocument()
  })

  it('deve renderizar children', () => {
    render(
      <FormField label="Email">
        <input data-testid="email-input" />
      </FormField>
    )
    expect(screen.getByTestId('email-input')).toBeInTheDocument()
  })

  it('deve mostrar asterisco quando required=true', () => {
    render(
      <FormField label="Nome" required>
        <input />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('não deve mostrar asterisco quando required=false', () => {
    render(
      <FormField label="Nome">
        <input />
      </FormField>
    )
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  it('deve mostrar mensagem de erro', () => {
    render(
      <FormField label="Email" error="Campo obrigatório">
        <input />
      </FormField>
    )
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('erro deve ter role="alert"', () => {
    render(
      <FormField label="Email" error="Erro">
        <input />
      </FormField>
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Erro')
  })

  it('não deve mostrar erro quando error não está definido', () => {
    render(
      <FormField label="Email">
        <input />
      </FormField>
    )
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('deve aplicar className customizada', () => {
    const { container } = render(
      <FormField label="Nome" className="custom-class">
        <input />
      </FormField>
    )
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('deve adicionar classe shake quando há erro', async () => {
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
    
    // Deve remover a classe após 500ms
    await waitFor(() => {
      expect(container.firstChild).not.toHaveClass('shake')
    }, { timeout: 600 })
  })

  it('deve usar tradução para mensagem de erro', () => {
    render(
      <FormField label="Email" error="validation.required">
        <input />
      </FormField>
    )
    // Como o mock retorna a própria key, deve exibir a key
    expect(screen.getByText('validation.required')).toBeInTheDocument()
  })
})

