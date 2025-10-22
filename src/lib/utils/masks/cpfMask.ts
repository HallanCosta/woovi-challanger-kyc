export function formatCPF(value: string): string {
  const numbers = value.replace(/\D/g, '')
  
  const limited = numbers.slice(0, 11)
  
  let formatted = limited
  
  if (limited.length > 3) {
    formatted = `${limited.slice(0, 3)}.${limited.slice(3)}`
  }
  if (limited.length > 6) {
    formatted = `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6)}`
  }
  if (limited.length > 9) {
    formatted = `${limited.slice(0, 3)}.${limited.slice(3, 6)}.${limited.slice(6, 9)}-${limited.slice(9)}`
  }
  
  return formatted
}

export function getCPFMask() {
  return {
    mask: '000.000.000-00',
    placeholder: '000.000.000-00',
    maxLength: 14,
  }
}

