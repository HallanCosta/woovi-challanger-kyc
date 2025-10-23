import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toast, ToastContainer } from '@/components/ui/Toast'

it('should render title', () => {
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

it('should render description', () => {
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

it('should render without description', () => {
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

it('should call onDismiss when clicking the close button', async () => {
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

it('should apply default variant', () => {
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

it('should apply variant destructive', () => {
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

it('should have dismiss button', () => {
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
 

it('should render children', () => {
  render(
    <ToastContainer>
      <div>Toast Content</div>
    </ToastContainer>
  )
  
  expect(screen.getByText('Toast Content')).toBeInTheDocument()
})

it('should render multiple toasts', () => {
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

it('should have fixed position at top-right', () => {
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
 

