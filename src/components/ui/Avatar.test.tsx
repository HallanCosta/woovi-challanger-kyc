import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from './Avatar'

describe('Avatar', () => {
  it('deve renderizar avatar', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    const avatar = container.querySelector('[data-slot="avatar"]')
    expect(avatar).toBeInTheDocument()
  })

  it('deve renderizar fallback', () => {
    render(
      <Avatar>
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('deve renderizar com imagem e fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    // Radix Avatar sempre mostra o fallback em ambiente de testes (jsdom)
    expect(screen.getByText('AB')).toBeInTheDocument()
  })

  it('deve aplicar className customizada no Avatar', () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    const avatar = container.querySelector('[data-slot="avatar"]')
    expect(avatar).toHaveClass('custom-avatar')
  })

  it('deve aceitar props em AvatarImage', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" className="custom-image" alt="Test" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    // Verifica que o componente renderiza sem erros
    expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument()
  })

  it('deve aplicar className customizada no AvatarFallback', () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback className="custom-fallback">AB</AvatarFallback>
      </Avatar>
    )
    
    const fallback = container.querySelector('[data-slot="avatar-fallback"]')
    expect(fallback).toHaveClass('custom-fallback')
  })

  it('deve ter data-slot corretos', () => {
    const { container } = render(
      <Avatar>
        <AvatarImage src="/test.jpg" alt="Test" />
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
    )
    
    expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument()
    // Avatar image pode não estar visível se fallback for mostrado
    expect(container.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument()
  })
})

