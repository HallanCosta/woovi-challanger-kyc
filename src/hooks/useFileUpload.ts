import { useState, useCallback, useRef } from 'react'

export type FileUploadOptions = {
  accept?: string
  maxSizeMB?: number
  onFileSelect?: (file: File | null) => void
}

export function useFileUpload(options: FileUploadOptions = {}) {
  const { accept, maxSizeMB = 5, onFileSelect } = options
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): boolean => {
    setError(null)

    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File must be at most ${maxSizeMB}MB`)
      return false
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase())
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
      const mimeType = file.type

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase()
        }
        if (type.includes('*')) {
          const baseType = type.split('/')[0]
          return mimeType.startsWith(baseType)
        }
        return mimeType === type
      })

      if (!isAccepted) {
        setError('File type not accepted')
        return false
      }
    }

    return true
  }, [accept, maxSizeMB])

  const handleFile = useCallback((file: File | null) => {
    if (!file) {
      setSelectedFile(null)
      onFileSelect?.(null)
      return
    }

    if (validateFile(file)) {
      setSelectedFile(file)
      onFileSelect?.(file)
    }
  }, [validateFile, onFileSelect])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isDragging) {
      setIsDragging(true)
    }
  }, [isDragging])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const { clientX, clientY } = e
    
    if (clientX < rect.left || clientX > rect.right || 
        clientY < rect.top || clientY > rect.bottom) {
      return
    }
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }, [handleFile])

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const clearFile = useCallback(() => {
    setSelectedFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onFileSelect?.(null)
  }, [onFileSelect])

  return {
    isDragging,
    error,
    selectedFile,
    fileInputRef,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    openFilePicker,
    clearFile,
  }
}

