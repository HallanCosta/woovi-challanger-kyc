export type PhoneFormat = {
  mask: string
  placeholder: string
  maxLength: number
}

const phoneFormats: Record<string, PhoneFormat> = {
  Brazil: {
    mask: "(##) #####-####",
    placeholder: "(11) 98765-4321",
    maxLength: 15,
  },
  "United States": {
    mask: "(###) ###-####",
    placeholder: "(555) 123-4567",
    maxLength: 14,
  },
  "United Kingdom": {
    mask: "#### ### ####",
    placeholder: "7911 123456",
    maxLength: 13,
  },
  Canada: {
    mask: "(###) ###-####",
    placeholder: "(416) 123-4567",
    maxLength: 14,
  },
  Spain: {
    mask: "### ## ## ##",
    placeholder: "612 34 56 78",
    maxLength: 12,
  },
  Portugal: {
    mask: "### ### ###",
    placeholder: "912 345 678",
    maxLength: 11,
  },
  Germany: {
    mask: "#### ########",
    placeholder: "1512 3456789",
    maxLength: 13,
  },
  France: {
    mask: "## ## ## ## ##",
    placeholder: "06 12 34 56 78",
    maxLength: 14,
  },
  Italy: {
    mask: "### ### ####",
    placeholder: "312 345 6789",
    maxLength: 12,
  },
  Australia: {
    mask: "#### ### ###",
    placeholder: "0412 345 678",
    maxLength: 12,
  },
}

export function getPhoneFormat(country: string): PhoneFormat {
  return (
    phoneFormats[country] || {
      mask: "###############",
      placeholder: "Enter phone number",
      maxLength: 15,
    }
  )
}

export function formatPhoneNumber(value: string, country: string): string {
  if (!country) return value

  const numbers = value.replace(/\D/g, "")
  const format = getPhoneFormat(country)
  let formatted = ""
  let numberIndex = 0

  for (let i = 0; i < format.mask.length && numberIndex < numbers.length; i++) {
    if (format.mask[i] === "#") {
      formatted += numbers[numberIndex]
      numberIndex++
    } else {
      formatted += format.mask[i]
    }
  }

  return formatted
}
