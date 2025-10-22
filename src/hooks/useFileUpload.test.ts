import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFileUpload } from './useFileUpload'

describe('useFileUpload', () => {
  it('deve iniciar com estado padrão', () => {
    const { result } = renderHook(() => useFileUpload())
    
    expect(result.current.isDragging).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.selectedFile).toBeNull()
  })

  it('deve validar arquivo que excede tamanho máximo', () => {
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

  it('deve aceitar arquivo válido', () => {
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

  it('deve validar tipo de arquivo por extensão', () => {
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

  it('deve validar tipo de arquivo por MIME type', () => {
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

  it('deve limpar arquivo selecionado', () => {
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

  it('deve tratar drag and drop', () => {
    const { result } = renderHook(() => useFileUpload())
    
    act(() => {
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      } as any
      result.current.handleDragEnter(event)
    })
    
    expect(result.current.isDragging).toBe(true)
    
    act(() => {
      const event = {
        preventDefault: vi.fn(),
        stopPropagation: vi.fn()
      } as any
      result.current.handleDragLeave(event)
    })
    
    expect(result.current.isDragging).toBe(false)
  })

  it('deve tratar arquivo em drop', () => {
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

  it('deve tratar caso sem arquivos no change', () => {
    const { result } = renderHook(() => useFileUpload())
    
    act(() => {
      const event = {
        target: { files: null }
      } as any
      result.current.handleFileInputChange(event)
    })
    
    expect(result.current.selectedFile).toBeNull()
  })

  it('deve usar maxSizeMB padrão de 5MB', () => {
    const { result } = renderHook(() => useFileUpload())
    
    // Arquivo com 6MB (maior que o padrão)
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
})

