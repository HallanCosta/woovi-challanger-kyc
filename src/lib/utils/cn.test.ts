import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('deve combinar classes simples', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('deve mesclar classes conflitantes do Tailwind', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('deve aceitar valores condicionais', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })

  it('deve aceitar objetos', () => {
    expect(cn({ 'text-red-500': true, 'text-blue-500': false })).toBe('text-red-500')
  })

  it('deve aceitar arrays', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('deve lidar com undefined e null', () => {
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
  })

  it('deve retornar string vazia para entrada vazia', () => {
    expect(cn()).toBe('')
  })
})

