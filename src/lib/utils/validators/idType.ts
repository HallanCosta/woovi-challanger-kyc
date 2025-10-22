export function validateIdTypeSelected(idType: string): boolean {
  return idType !== ''
}

export function validateIdBackRequired(idType: string, idBack: File | null): boolean {
  if (idType === 'passport') return true
  return idBack instanceof File
}

