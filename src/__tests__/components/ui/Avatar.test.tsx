import { it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'

it('should render avatar', () => {
  const { container } = render(
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  const avatar = container.querySelector('[data-slot="avatar"]')
  expect(avatar).toBeInTheDocument()
})

it('should render fallback', () => {
  render(
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  expect(screen.getByText('AB')).toBeInTheDocument()
})

it('should render with image and fallback', () => {
  render(
    <Avatar>
      <AvatarImage src="/test.jpg" alt="Test" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  expect(screen.getByText('AB')).toBeInTheDocument()
})

it('should apply custom className on avatar', () => {
  const { container } = render(
    <Avatar className="custom-avatar">
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  const avatar = container.querySelector('[data-slot="avatar"]')
  expect(avatar).toHaveClass('custom-avatar')
})

it('should accept props on AvatarImage', () => {
  const { container } = render(
    <Avatar>
      <AvatarImage src="/test.jpg" className="custom-image" alt="Test" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument()
})

it('should apply custom className on AvatarFallback', () => {
  const { container } = render(
    <Avatar>
      <AvatarFallback className="custom-fallback">AB</AvatarFallback>
    </Avatar>
  )
  
  const fallback = container.querySelector('[data-slot="avatar-fallback"]')
  expect(fallback).toHaveClass('custom-fallback')
})

it('should have correct data-slot attributes', () => {
  const { container } = render(
    <Avatar>
      <AvatarImage src="/test.jpg" alt="Test" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
  
  expect(container.querySelector('[data-slot="avatar"]')).toBeInTheDocument()
  expect(container.querySelector('[data-slot="avatar-fallback"]')).toBeInTheDocument()
})

