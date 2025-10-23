import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/Input'

it('should render input', () => {
  render(<Input />)
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()
})

it('should accept typed value', async () => {
  const user = userEvent.setup()
  render(<Input />)
  const input = screen.getByRole('textbox')
  
  await user.type(input, 'Test value')
  expect(input).toHaveValue('Test value')
})

it('should call onChange when value changes', async () => {
  const handleChange = vi.fn()
  const user = userEvent.setup()
  
  render(<Input onChange={handleChange} />)
  const input = screen.getByRole('textbox')
  
  await user.type(input, 'a')
  expect(handleChange).toHaveBeenCalled()
})

it('should accept placeholder', () => {
  render(<Input placeholder="Enter text" />)
  expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
})

it('should accept initial value', () => {
  render(<Input value="Initial value" onChange={() => {}} />)
  expect(screen.getByRole('textbox')).toHaveValue('Initial value')
})

it('should be disabled when disabled=true', () => {
  render(<Input disabled />)
  expect(screen.getByRole('textbox')).toBeDisabled()
})

it('should accept type="email"', () => {
  render(<Input type="email" />)
  const input = screen.getByRole('textbox')
  expect(input).toHaveAttribute('type', 'email')
})

it('should accept type="password"', () => {
  render(<Input type="password" />)
  const input = document.querySelector('input[type="password"]')
  expect(input).toBeInTheDocument()
})

it('should apply custom className', () => {
  render(<Input className="custom-class" />)
  const input = screen.getByRole('textbox')
  expect(input.className).toContain('custom-class')
})

it('should have data-slot="input"', () => {
  render(<Input />)
  const input = screen.getByRole('textbox')
  expect(input).toHaveAttribute('data-slot', 'input')
})

it('should accept required', () => {
  render(<Input required />)
  expect(screen.getByRole('textbox')).toBeRequired()
})

it('should accept maxlength', () => {
  render(<Input maxLength={10} />)
  expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10')
})

