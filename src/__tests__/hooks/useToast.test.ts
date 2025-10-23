import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from '@/hooks/useToast'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should start with an empty toasts array', () => {
  const { result } = renderHook(() => useToast())
  expect(result.current.toasts).toEqual([])
})

it('should add a toast', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({
      title: 'Success',
      description: 'Operation completed successfully'
    })
  })
  
  expect(result.current.toasts).toHaveLength(1)
  expect(result.current.toasts[0]).toMatchObject({
    title: 'Success',
    description: 'Operation completed successfully',
    variant: 'default'
  })
})

it('should add toast with destructive variant', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({
      title: 'Error',
      variant: 'destructive'
    })
  })
  
  expect(result.current.toasts[0].variant).toBe('destructive')
})

it('should generate a unique id for each toast', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({ title: 'Toast 1' })
  })
  
  const firstId = result.current.toasts[0].id
  
  act(() => {
    result.current.toast({ title: 'Toast 2' })
  })
  
  expect(result.current.toasts[0].id).toBeDefined()
  expect(result.current.toasts[0].id).not.toBe(firstId)
})

it('should remove toast automatically after 4 seconds', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({ title: 'Test' })
  })
  
  expect(result.current.toasts).toHaveLength(1)
  
  act(() => {
    vi.advanceTimersByTime(4000)
  })
  
  expect(result.current.toasts).toHaveLength(0)
})

it('should allow manual dismiss of toast', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({ title: 'Test' })
  })
  
  const toastId = result.current.toasts[0].id
  expect(result.current.toasts).toHaveLength(1)
  
  act(() => {
    result.current.dismiss(toastId)
  })
  
  expect(result.current.toasts).toHaveLength(0)
})

it('should replace previous toast when adding a new one', () => {
  const { result } = renderHook(() => useToast())
  
  act(() => {
    result.current.toast({ title: 'First' })
  })
  
  expect(result.current.toasts).toHaveLength(1)
  expect(result.current.toasts[0].title).toBe('First')
  
  act(() => {
    result.current.toast({ title: 'Second' })
  })
  
  expect(result.current.toasts).toHaveLength(1)
  expect(result.current.toasts[0].title).toBe('Second')
})

