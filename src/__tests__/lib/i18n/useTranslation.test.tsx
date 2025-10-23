import { it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { TranslationProvider, useTranslation } from '@/lib/i18n/useTranslation'
import { ReactNode } from 'react'

const localStorageMock = (() => {
let store: Record<string, string> = {}

return {
  getItem: (key: string) => store[key] || null,
  setItem: (key: string, value: string) => {
    store[key] = value
  },
  clear: () => {
    store = {}
  }
}
})()

Object.defineProperty(window, 'localStorage', {
value: localStorageMock
})

beforeEach(() => {
localStorageMock.clear()
})

const wrapper = ({ children }: { children: ReactNode }) => (
<TranslationProvider>{children}</TranslationProvider>
)

it('should start with English language by default', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })
  expect(result.current.language).toBe('en')
})

it('should translate simple key', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })
  const translation = result.current.t('dashboard')
  expect(typeof translation).toBe('string')
})

it('should change language', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })

  act(() => {
  result.current.setLanguage('pt')
})

  expect(result.current.language).toBe('pt')
})

it('should save language', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })

  act(() => {
  result.current.setLanguage('es')
})

  expect(result.current.language).toBe('es')
})

it('should return key when translation does not exist', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })
  const translation = result.current.t('nonexistent.key.path')
  expect(translation).toBe('nonexistent.key.path')
})

it('should translate nested keys', () => {
  const { result } = renderHook(() => useTranslation(), { wrapper })
  const translation = result.current.t('validation.required')
  expect(typeof translation).toBe('string')
})

it('should throw error when used outside of provider', () => {
  expect(() => {
  renderHook(() => useTranslation())
}).toThrow('useTranslation must be used within TranslationProvider')
})

