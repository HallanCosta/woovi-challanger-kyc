export function validateFileSize(file: File | null, maxSizeMB: number = 5): boolean {
  if (!file) return true
  return file.size <= maxSizeMB * 1024 * 1024
}

export function validateFileType(file: File | null, allowedTypes: readonly string[]): boolean {
  if (!file) return true
  return allowedTypes.includes(file.type)
}

export function validateFileRequired(file: File | null): boolean {
  return file !== null
}

export const FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png'] as const,
  DOCUMENTS: ['application/pdf', 'image/jpeg', 'image/png'] as const,
}

