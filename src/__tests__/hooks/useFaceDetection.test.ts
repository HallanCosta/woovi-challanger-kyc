import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFaceDetection } from '@/hooks/useFaceDetection'


vi.mock('@vladmandic/human', () => {
  return {
    default: class HumanMock {
      constructor(_: any) {}
      async load() {}
      async warmup() {}
      video(_: HTMLVideoElement | false) {}
      draw = { canvas: vi.fn() }
      next() { return {} }
      webcam = { stop: vi.fn() }
    }
  }
})

const createMockStream = () => ({ getTracks: () => [{ stop: vi.fn() }] }) as any

beforeEach(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    value: { getUserMedia: vi.fn().mockResolvedValue(createMockStream()) },
    configurable: true,
  })

  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    value: vi.fn().mockResolvedValue(void 0),
    configurable: true,
  })

  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    value: vi.fn().mockReturnValue({
      drawImage: vi.fn(),
      getImageData: vi.fn().mockReturnValue({ data: new Uint8ClampedArray(64 * 48 * 4) }),
      clearRect: vi.fn(),
    }),
    configurable: true,
  })

  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((_cb: FrameRequestCallback) => {

    return 1 as any
  })
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

it('should start with default state', () => {
  const { result } = renderHook(() => useFaceDetection())
  expect(result.current.isRunning).toBe(false)
  expect(result.current.hasStream).toBe(false)
  expect(result.current.faceStatus.hasFace).toBe(false)
})

it('should return null on capturePhoto when not started', async () => {
  const { result } = renderHook(() => useFaceDetection())
  const res = await result.current.capturePhoto()
  expect(res).toBeNull()
})

it('should start detection and acquire stream', async () => {
  const { result } = renderHook(() => useFaceDetection())

  act(() => {
    result.current.videoRef.current = document.createElement('video') as HTMLVideoElement
    result.current.canvasRef.current = document.createElement('canvas') as HTMLCanvasElement
  })

  await act(async () => {
    await result.current.startDetection()
  })

  expect(result.current.hasStream).toBe(true)
  expect(result.current.isRunning).toBe(true)

  act(() => {
    result.current.stopDetection()
  })

  expect(result.current.hasStream).toBe(false)
  expect(result.current.isRunning).toBe(false)
})
