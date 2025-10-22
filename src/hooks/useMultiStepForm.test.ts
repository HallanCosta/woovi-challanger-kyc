import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMultiStepForm } from './useMultiStepForm'

describe('useMultiStepForm', () => {
  it('deve iniciar no step 1', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    expect(result.current.currentStep).toBe(1)
  })

  it('deve avançar para o próximo step', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.nextStep()
    })
    
    expect(result.current.currentStep).toBe(2)
  })

  it('deve voltar para o step anterior', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.nextStep()
      result.current.nextStep()
    })
    
    expect(result.current.currentStep).toBe(3)
    
    act(() => {
      result.current.prevStep()
    })
    
    expect(result.current.currentStep).toBe(2)
  })

  it('não deve passar do último step', () => {
    const { result } = renderHook(() => useMultiStepForm(3))
    
    act(() => {
      result.current.goToStep(3)
      result.current.nextStep()
    })
    
    expect(result.current.currentStep).toBe(3)
  })

  it('não deve voltar antes do primeiro step', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.prevStep()
    })
    
    expect(result.current.currentStep).toBe(1)
  })

  it('deve ir para um step específico', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.goToStep(4)
    })
    
    expect(result.current.currentStep).toBe(4)
  })

  it('não deve ir para step inválido (menor que 1)', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.goToStep(0)
    })
    
    expect(result.current.currentStep).toBe(1)
  })

  it('não deve ir para step inválido (maior que total)', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    act(() => {
      result.current.goToStep(10)
    })
    
    expect(result.current.currentStep).toBe(1)
  })

  it('deve identificar primeiro step corretamente', () => {
    const { result } = renderHook(() => useMultiStepForm(5))
    
    expect(result.current.isFirstStep).toBe(true)
    
    act(() => {
      result.current.nextStep()
    })
    
    expect(result.current.isFirstStep).toBe(false)
  })

  it('deve identificar último step corretamente', () => {
    const { result } = renderHook(() => useMultiStepForm(3))
    
    expect(result.current.isLastStep).toBe(false)
    
    act(() => {
      result.current.goToStep(3)
    })
    
    expect(result.current.isLastStep).toBe(true)
  })

  it('deve calcular progresso corretamente', () => {
    const { result } = renderHook(() => useMultiStepForm(4))
    
    expect(result.current.progress).toBe(25) // 1/4 = 25%
    
    act(() => {
      result.current.nextStep()
    })
    
    expect(result.current.progress).toBe(50) // 2/4 = 50%
    
    act(() => {
      result.current.goToStep(4)
    })
    
    expect(result.current.progress).toBe(100) // 4/4 = 100%
  })

  it('deve retornar totalSteps correto', () => {
    const { result } = renderHook(() => useMultiStepForm(7))
    expect(result.current.totalSteps).toBe(7)
  })
})

