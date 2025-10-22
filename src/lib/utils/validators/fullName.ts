export function validateFullName(name: string): boolean {
  const trimmedName = name.trim()
  if (trimmedName.length < 3) return false
  
  const nameParts = trimmedName.split(/\s+/).filter(part => part.length > 0)
  if (nameParts.length < 2) return false
  
  return nameParts.every(part => part.length >= 2)
}

