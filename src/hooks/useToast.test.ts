import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast } from './useToast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('deve iniciar com array vazio de toasts', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toEqual([])
  })

  it('deve adicionar um toast', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Sucesso',
        description: 'Operação realizada com sucesso'
      })
    })
    
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]).toMatchObject({
      title: 'Sucesso',
      description: 'Operação realizada com sucesso',
      variant: 'default'
    })
  })

  it('deve adicionar toast com variante destructive', () => {
    const { result } = renderHook(() => useToast())
    
    act(() => {
      result.current.toast({
        title: 'Erro',
        variant: 'destructive'
      })
    })
    
    expect(result.current.toasts[0].variant).toBe('destructive')
  })

  it('deve gerar ID único para cada toast', () => {
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

  it('deve remover toast automaticamente após 4 segundos', () => {
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

  it('deve permitir dismiss manual de toast', () => {
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

  it('deve substituir toast anterior ao adicionar novo', () => {
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
})

