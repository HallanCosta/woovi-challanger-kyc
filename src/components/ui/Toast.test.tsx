import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast, ToastContainer } from './Toast'

describe('Toast', () => {
  it('deve renderizar título', () => {
    const handleDismiss = vi.fn()
    render(
      <Toast 
        id="1" 
        title="Test Title" 
        onDismiss={handleDismiss}
      />
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('deve renderizar descrição', () => {
    const handleDismiss = vi.fn()
    render(
      <Toast 
        id="1" 
        title="Title"
        description="Test Description" 
        onDismiss={handleDismiss}
      />
    )
    
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('deve renderizar sem descrição', () => {
    const handleDismiss = vi.fn()
    render(
      <Toast 
        id="1" 
        title="Only Title" 
        onDismiss={handleDismiss}
      />
    )
    
    expect(screen.getByText('Only Title')).toBeInTheDocument()
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('deve chamar onDismiss ao clicar no botão fechar', async () => {
    const handleDismiss = vi.fn()
    const user = userEvent.setup()
    
    render(
      <Toast 
        id="test-1" 
        title="Test" 
        onDismiss={handleDismiss}
      />
    )
    
    const dismissButton = screen.getByLabelText('Dismiss notification')
    await user.click(dismissButton)
    
    expect(handleDismiss).toHaveBeenCalledWith('test-1')
  })

  it('deve aplicar variante default por padrão', () => {
    const handleDismiss = vi.fn()
    const { container } = render(
      <Toast 
        id="1" 
        title="Test" 
        onDismiss={handleDismiss}
      />
    )
    
    const toast = container.firstChild as HTMLElement
    expect(toast.className).toContain('bg-background')
  })

  it('deve aplicar variante destructive', () => {
    const handleDismiss = vi.fn()
    const { container } = render(
      <Toast 
        id="1" 
        title="Error" 
        variant="destructive"
        onDismiss={handleDismiss}
      />
    )
    
    const toast = container.firstChild as HTMLElement
    expect(toast.className).toContain('bg-destructive')
  })

  it('deve ter botão de dismiss', () => {
    const handleDismiss = vi.fn()
    render(
      <Toast 
        id="1" 
        title="Test" 
        onDismiss={handleDismiss}
      />
    )
    
    expect(screen.getByLabelText('Dismiss notification')).toBeInTheDocument()
  })
})

describe('ToastContainer', () => {
  it('deve renderizar children', () => {
    render(
      <ToastContainer>
        <div>Toast Content</div>
      </ToastContainer>
    )
    
    expect(screen.getByText('Toast Content')).toBeInTheDocument()
  })

  it('deve renderizar múltiplos toasts', () => {
    const handleDismiss = vi.fn()
    
    render(
      <ToastContainer>
        <Toast id="1" title="Toast 1" onDismiss={handleDismiss} />
        <Toast id="2" title="Toast 2" onDismiss={handleDismiss} />
        <Toast id="3" title="Toast 3" onDismiss={handleDismiss} />
      </ToastContainer>
    )
    
    expect(screen.getByText('Toast 1')).toBeInTheDocument()
    expect(screen.getByText('Toast 2')).toBeInTheDocument()
    expect(screen.getByText('Toast 3')).toBeInTheDocument()
  })

  it('deve ter posicionamento fixo no topo direita', () => {
    const { container } = render(
      <ToastContainer>
        <div>Content</div>
      </ToastContainer>
    )
    
    const toastContainer = container.firstChild as HTMLElement
    expect(toastContainer.className).toContain('fixed')
    expect(toastContainer.className).toContain('top-0')
    expect(toastContainer.className).toContain('right-0')
  })
})

