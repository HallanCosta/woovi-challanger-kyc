import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePwaInstall } from '@/hooks/usePwaInstall'

const setupMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
    configurable: true,
  })
}

beforeEach(() => {
  setupMatchMedia(false)
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should set iOS manual install flags when on iOS and not standalone', () => {
  Object.defineProperty(window.navigator, 'userAgent', { value: 'iPhone', configurable: true })
  const { result } = renderHook(() => usePwaInstall())
  expect(result.current.isInstallable).toBe(true)
  expect(result.current.isIosManualInstall).toBe(true)
})

it('should set installed when display-mode standalone', () => {
  setupMatchMedia(true)
  const { result } = renderHook(() => usePwaInstall())
  expect(result.current.isInstalled).toBe(true)
})

it('should capture beforeinstallprompt and accept promptInstall', async () => {
  Object.defineProperty(window.navigator, 'userAgent', { value: 'Chrome', configurable: true })
  const { result } = renderHook(() => usePwaInstall())

  const prompt = vi.fn().mockResolvedValue(void 0)
  const event: any = new Event('beforeinstallprompt')
  ;(event as any).preventDefault = vi.fn()
  ;(event as any).prompt = prompt
  ;(event as any).userChoice = Promise.resolve({ outcome: 'accepted' })

  act(() => {
    window.dispatchEvent(event)
  })

  expect(result.current.isInstallable).toBe(true)

  const accepted = await act(async () => await result.current.promptInstall())
  expect(accepted).toBe(true)
})

it('should set installed on appinstalled event', () => {
  const { result } = renderHook(() => usePwaInstall())
  act(() => {
    window.dispatchEvent(new Event('appinstalled'))
  })
  expect(result.current.isInstalled).toBe(true)
  expect(result.current.isInstallable).toBe(false)
})
