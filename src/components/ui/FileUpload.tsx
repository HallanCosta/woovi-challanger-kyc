import { Upload, X, FileIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useFileUpload } from '@/hooks/useFileUpload'
import { useTranslation } from '@/lib/i18n/useTranslation'

interface FileUploadProps {
  accept?: string
  maxSizeMB?: number
  onFileSelect: (file: File | null) => void
  helperText?: string
  disabled?: boolean
  value?: File | null | undefined
}

export function FileUpload({ 
  accept, 
  maxSizeMB = 5, 
  onFileSelect, 
  helperText,
  disabled = false,
  value
}: FileUploadProps) {
  const { t } = useTranslation()
  const {
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
  } = useFileUpload({ accept, maxSizeMB, onFileSelect })

  const displayFile = value || selectedFile
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const typeErrorText = error === 'File type not accepted'
    ? (accept?.includes('.pdf')
        ? t('validation.address.addressProof.type')
        : t('validation.identity.idFront.type'))
    : error

  useEffect(() => {
    if (!displayFile) {
      setImagePreview(null)
      return
    }

    if (displayFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(displayFile)
    } else {
      setImagePreview(null)
    }

    return () => {
      setImagePreview(null)
    }
  }, [displayFile])

  const handleOpenFilePicker = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openFilePicker()
  } 

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
      />

      {!displayFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={!disabled ? handleOpenFilePicker : undefined}
          className={cn(
            'relative flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-8 transition-colors',
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-input hover:border-primary/50 hover:bg-accent/50',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <Upload className={cn(
            'mb-3 h-10 w-10',
            isDragging ? 'text-primary' : 'text-muted-foreground'
          )} />
          <p className="mb-1 text-sm font-medium">
            {isDragging ? t('dropFileHere') : t('clickOrDragFile')}
          </p>
          {helperText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
          {typeErrorText && (
            <p className="mt-2 text-xs text-error" role="alert">{typeErrorText}</p>
          )}
        </div>
      ) : imagePreview ? (
        <div className="relative">
          <div className="overflow-hidden rounded-md border border-input">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="h-auto w-full object-contain max-h-[400px]"
            />
          </div>
          <div className="mt-2 flex items-center justify-between rounded-md border border-input bg-accent/30 px-4 py-2">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{displayFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(displayFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  clearFile()
                  onFileSelect(null)
                }}
                aria-label={t('delete')}
                className="ml-3 flex-shrink-0 rounded p-1 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-md border border-input bg-accent/30 px-4 py-3">
          <FileIcon className="h-8 w-8 flex-shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{displayFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(displayFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                clearFile()
                onFileSelect(null)
              }}
              aria-label={t('delete')}
              className="flex-shrink-0 rounded p-1 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

