import { it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMultiStepForm } from '@/hooks/useMultiStepForm'

it('should start at step 1', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  expect(result.current.currentStep).toBe(1)
})

it('should advance to the next step', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  act(() => {
    result.current.nextStep()
  })
  
  expect(result.current.currentStep).toBe(2)
})

it('should go back to the previous step', () => {
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

it('should not go beyond the last step', () => {
  const { result } = renderHook(() => useMultiStepForm(3))
  
  act(() => {
    result.current.goToStep(3)
    result.current.nextStep()
  })
  
  expect(result.current.currentStep).toBe(3)
})

it('should not go back before the first step', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  act(() => {
    result.current.prevStep()
  })
  
  expect(result.current.currentStep).toBe(1)
})

it('should go to a specific step', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  act(() => {
    result.current.goToStep(4)
  })
  
  expect(result.current.currentStep).toBe(4)
})

it('should not go to invalid step (less than 1)', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  act(() => {
    result.current.goToStep(0)
  })
  
  expect(result.current.currentStep).toBe(1)
})

it('should not go to invalid step (greater than total)', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  act(() => {
    result.current.goToStep(10)
  })
  
  expect(result.current.currentStep).toBe(1)
})

it('should identify first step correctly', () => {
  const { result } = renderHook(() => useMultiStepForm(5))
  
  expect(result.current.isFirstStep).toBe(true)
  
  act(() => {
    result.current.nextStep()
  })
  
  expect(result.current.isFirstStep).toBe(false)
})

it('should identify last step correctly', () => {
  const { result } = renderHook(() => useMultiStepForm(3))
  
  expect(result.current.isLastStep).toBe(false)
  
  act(() => {
    result.current.goToStep(3)
  })
  
  expect(result.current.isLastStep).toBe(true)
})

it('should calculate progress correctly', () => {
  const { result } = renderHook(() => useMultiStepForm(4))
  
  expect(result.current.progress).toBe(25)
  
  act(() => {
    result.current.nextStep()
  })
  
  expect(result.current.progress).toBe(50)
  
  act(() => {
    result.current.goToStep(4)
  })
  
  expect(result.current.progress).toBe(100)
})

it('should return correct totalSteps', () => {
  const { result } = renderHook(() => useMultiStepForm(7))
  expect(result.current.totalSteps).toBe(7)
})

