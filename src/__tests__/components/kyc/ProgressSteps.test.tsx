import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProgressSteps } from '@/components/kyc/ProgressSteps'

const steps = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Address' },
  { number: 3, label: 'Identity' },
]

it('should render all steps', () => {
  render(<ProgressSteps steps={steps} currentStep={1} />)
  
  expect(screen.getByLabelText('Step 1: Personal Info')).toBeInTheDocument()
  expect(screen.getByLabelText('Step 2: Address')).toBeInTheDocument()
  expect(screen.getByLabelText('Step 3: Identity')).toBeInTheDocument()
})

it('should highlight current step', () => {
  render(<ProgressSteps steps={steps} currentStep={2} />)
  
  const currentStep = screen.getByLabelText('Step 2: Address')
  expect(currentStep).toHaveAttribute('aria-current', 'step')
})

it('should show check mark in validated steps', () => {
  render(
    <ProgressSteps 
      steps={steps} 
      currentStep={3} 
      validatedSteps={[1, 2]}
    />
  )
  
  const checkIcons = screen.getAllByRole('button').filter(
    btn => btn.querySelector('svg')
  )
  expect(checkIcons.length).toBeGreaterThan(0)
})

it('should call onStepClick when clickable step is clicked', async () => {
  const handleStepClick = vi.fn()
  const user = userEvent.setup()
  
  render(
    <ProgressSteps 
      steps={steps} 
      currentStep={2} 
      maxReachedStep={2}
      onStepClick={handleStepClick}
    />
  )
  
  await user.click(screen.getByLabelText('Step 1: Personal Info'))
  expect(handleStepClick).toHaveBeenCalledWith(1)
})

it('should not allow click on current step', async () => {
  const handleStepClick = vi.fn()
  const user = userEvent.setup()
  
  render(
    <ProgressSteps 
      steps={steps} 
      currentStep={2} 
      maxReachedStep={3}
      onStepClick={handleStepClick}
    />
  )
  
  const currentStepButton = screen.getByLabelText('Step 2: Address')
  await user.click(currentStepButton)
  
  expect(handleStepClick).not.toHaveBeenCalled()
})

it('should not allow click on unreached step', async () => {
  const handleStepClick = vi.fn()
  const user = userEvent.setup()
  
  render(
    <ProgressSteps 
      steps={steps} 
      currentStep={1} 
      maxReachedStep={1}
      onStepClick={handleStepClick}
    />
  )
  
  const button = screen.getByLabelText('Step 3: Identity')
  await user.click(button)
  
  expect(handleStepClick).not.toHaveBeenCalled()
})

it('should disable buttons for non-clickable steps', () => {
  render(
    <ProgressSteps 
      steps={steps} 
      currentStep={1} 
      maxReachedStep={1}
      onStepClick={vi.fn()}
    />
  )
  
  const step3Button = screen.getByLabelText('Step 3: Identity')
  expect(step3Button).toBeDisabled()
})

it('should render connecting lines between steps', () => {
  const { container } = render(
    <ProgressSteps steps={steps} currentStep={1} />
  )
  
  const lines = container.querySelectorAll('div.h-0\\.5')
  expect(lines.length).toBe(2)
})

it('should highlight line when previous step is validated', () => {
  const { container } = render(
    <ProgressSteps 
      steps={steps} 
      currentStep={2} 
      validatedSteps={[1]}
    />
  )
  
  const lines = container.querySelectorAll('div.h-0\\.5')
  expect(lines[0]).toHaveClass('bg-primary')
})

it('should work without onStepClick (non-clickable steps)', () => {
  render(<ProgressSteps steps={steps} currentStep={1} />)
  
  const button = screen.getByLabelText('Step 2: Address')
  expect(button).toBeDisabled()
})

