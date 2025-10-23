import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/Button'

it('should render button with text', () => {
  render(<Button>Click me</Button>)
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
})

it('should call onclick when clicked', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()
  
  render(<Button onClick={handleClick}>Click</Button>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalledTimes(1)
})

it('should apply variant default by default', () => {
  render(<Button>Button</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('bg-primary')
})

it('should apply variant destructive', () => {
  render(<Button variant="destructive">Delete</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('bg-destructive')
})

it('should apply variant outline', () => {
  render(<Button variant="outline">Outline</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('border')
})

it('should apply variant ghost', () => {
  render(<Button variant="ghost">Ghost</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('hover:bg-accent')
})

it('should apply size small', () => {
  render(<Button size="sm">Small</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('h-8')
})

it('should apply size large', () => {
  render(<Button size="lg">Large</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('h-10')
})

it('should estar disabled when disabled=true', () => {
  render(<Button disabled>Disabled</Button>)
  const button = screen.getByRole('button')
  expect(button).toBeDisabled()
})

it('should not call onclick when disabled', async () => {
  const handleClick = vi.fn()
  const user = userEvent.setup()
  
  render(<Button disabled onClick={handleClick}>Disabled</Button>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).not.toHaveBeenCalled()
})

it('should apply classname customizada', () => {
  render(<Button className="custom-class">Button</Button>)
  const button = screen.getByRole('button')
  expect(button.className).toContain('custom-class')
})

it('should render como child when aschild=true', () => {
  render(
    <Button asChild>
      <a href="/test">Link</a>
    </Button>
  )
  expect(screen.getByRole('link')).toHaveAttribute('href', '/test')
})

it('should apply aria-label', () => {
  render(<Button aria-label="Custom label">Button</Button>)
  expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
})

