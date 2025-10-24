import { it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from '@/hooks/useFileUpload'

it('should start with default state', () => {
  const { result } = renderHook(() => useFileUpload())
  
  expect(result.current.isDragging).toBe(false)
  expect(result.current.error).toBeNull()
  expect(result.current.selectedFile).toBeNull()
})

it('should validate file that exceeds max size', () => {
  const { result } = renderHook(() => useFileUpload({ maxSizeMB: 1 }))
  
  const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.pdf', {
    type: 'application/pdf'
  })
  
  act(() => {
    const event = {
      target: { files: [largeFile] }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.error).toBe('File must be at most 1MB')
  expect(result.current.selectedFile).toBeNull()
})

it('should accept valid file', () => {
  const onFileSelect = vi.fn()
  const { result } = renderHook(() => 
    useFileUpload({ maxSizeMB: 5, onFileSelect })
  )
  
  const validFile = new File(['content'], 'document.pdf', {
    type: 'application/pdf'
  })
  
  act(() => {
    const event = {
      target: { files: [validFile] }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.selectedFile).toBe(validFile)
  expect(result.current.error).toBeNull()
  expect(onFileSelect).toHaveBeenCalledWith(validFile)
})

it('should validate file type by extension', () => {
  const { result } = renderHook(() => 
    useFileUpload({ accept: '.pdf,.doc' })
  )
  
  const invalidFile = new File(['content'], 'image.jpg', {
    type: 'image/jpeg'
  })
  
  act(() => {
    const event = {
      target: { files: [invalidFile] }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.error).toBe('File type not accepted')
  expect(result.current.selectedFile).toBeNull()
})

it('should validate file type by MIME type', () => {
  const { result } = renderHook(() => 
    useFileUpload({ accept: 'image/*' })
  )
  
  const validFile = new File(['content'], 'photo.jpg', {
    type: 'image/jpeg'
  })
  
  act(() => {
    const event = {
      target: { files: [validFile] }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.selectedFile).toBe(validFile)
  expect(result.current.error).toBeNull()
})

it('should clear selected file', () => {
  const onFileSelect = vi.fn()
  const { result } = renderHook(() => useFileUpload({ onFileSelect }))
  
  const file = new File(['content'], 'test.pdf', { type: 'application/pdf' })
  
  act(() => {
    const event = { target: { files: [file] } } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.selectedFile).toBe(file)
  
  act(() => {
    result.current.clearFile()
  })
  
  expect(result.current.selectedFile).toBeNull()
  expect(result.current.error).toBeNull()
  expect(onFileSelect).toHaveBeenCalledWith(null)
})

it('should handle drag and drop', () => {
  const { result } = renderHook(() => useFileUpload())
  
  act(() => {
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      currentTarget: { getBoundingClientRect: () => ({}) } // 👈 adiciona isso
    } as any
    result.current.handleDragEnter(event)
  })
  
  expect(result.current.isDragging).toBe(true)
  
  act(() => {
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      currentTarget: { getBoundingClientRect: () => ({}) } // 👈 adiciona isso também
    } as any
    result.current.handleDragLeave(event)
  })
  
  expect(result.current.isDragging).toBe(false)
})

it('should handle file in drop', () => {
  const { result } = renderHook(() => useFileUpload())
  
  const file = new File(['content'], 'dropped.pdf', {
    type: 'application/pdf'
  })
  
  act(() => {
    const event = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      dataTransfer: { files: [file] }
    } as any
    result.current.handleDrop(event)
  })
  
  expect(result.current.selectedFile).toBe(file)
  expect(result.current.isDragging).toBe(false)
})

it('should handle case without files in change', () => {
  const { result } = renderHook(() => useFileUpload())
  
  act(() => {
    const event = {
      target: { files: null }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.selectedFile).toBeNull()
})

it('should use default maxSizeMB of 5MB', () => {
  const { result } = renderHook(() => useFileUpload())
  
  const largeFile = new File(['x'.repeat(6 * 1024 * 1024)], 'large.pdf', {
    type: 'application/pdf'
  })
  
  act(() => {
    const event = {
      target: { files: [largeFile] }
    } as any
    result.current.handleFileInputChange(event)
  })
  
  expect(result.current.error).toBe('File must be at most 5MB')
})

