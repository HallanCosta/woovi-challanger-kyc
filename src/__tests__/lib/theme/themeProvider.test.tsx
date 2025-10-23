import { it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/lib/theme/themeProvider'
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
  document.documentElement.className = ''
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

it('should start with theme light by default', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })
  expect(result.current.theme).toBe('light')
})

it('should toggle between light and dark', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })
  
  act(() => {
    result.current.toggleTheme()
  })
  
  expect(result.current.theme).toBe('dark')
  expect(localStorage.getItem('kyc-theme')).toBe('dark')
})

it('should save theme in localStorage', () => {
  const { result } = renderHook(() => useTheme(), { wrapper })
  
  act(() => {
    result.current.toggleTheme()
  })
  
  expect(localStorage.getItem('kyc-theme')).toBe('dark')
  
  act(() => {
    result.current.toggleTheme()
  })
  
  expect(localStorage.getItem('kyc-theme')).toBe('light')
})

it('should throw error when used outside of provider', () => {
  expect(() => {
    renderHook(() => useTheme())
  }).toThrow('useTheme must be used within ThemeProvider')
})

