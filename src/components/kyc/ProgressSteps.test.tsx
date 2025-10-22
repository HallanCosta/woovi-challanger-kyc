import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProgressSteps } from './ProgressSteps'

const steps = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Address' },
  { number: 3, label: 'Identity' },
]

describe('ProgressSteps', () => {
  it('deve renderizar todos os steps', () => {
    render(<ProgressSteps steps={steps} currentStep={1} />)
    
    expect(screen.getByLabelText('Step 1: Personal Info')).toBeInTheDocument()
    expect(screen.getByLabelText('Step 2: Address')).toBeInTheDocument()
    expect(screen.getByLabelText('Step 3: Identity')).toBeInTheDocument()
  })

  it('deve destacar o step atual', () => {
    render(<ProgressSteps steps={steps} currentStep={2} />)
    
    const currentStep = screen.getByLabelText('Step 2: Address')
    expect(currentStep).toHaveAttribute('aria-current', 'step')
  })

  it('deve mostrar check mark em steps validados', () => {
    render(
      <ProgressSteps 
        steps={steps} 
        currentStep={3} 
        validatedSteps={[1, 2]}
      />
    )
    
    // Verifica se há ícones de check
    const checkIcons = screen.getAllByRole('button').filter(
      btn => btn.querySelector('svg')
    )
    expect(checkIcons.length).toBeGreaterThan(0)
  })

  it('deve chamar onStepClick quando step clicável é clicado', async () => {
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

  it('não deve permitir clicar em step atual', async () => {
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

  it('não deve permitir clicar em step não alcançado', async () => {
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

  it('deve desabilitar botões de steps não clicáveis', () => {
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

  it('deve renderizar linhas de conexão entre steps', () => {
    const { container } = render(
      <ProgressSteps steps={steps} currentStep={1} />
    )
    
    // Deve haver 2 linhas para 3 steps (entre step 1-2 e 2-3)
    const lines = container.querySelectorAll('div.h-0\\.5')
    expect(lines.length).toBe(2)
  })

  it('deve destacar linha quando step anterior está validado', () => {
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

  it('deve funcionar sem onStepClick (steps não clicáveis)', () => {
    render(<ProgressSteps steps={steps} currentStep={1} />)
    
    const button = screen.getByLabelText('Step 2: Address')
    expect(button).toBeDisabled()
  })
})

