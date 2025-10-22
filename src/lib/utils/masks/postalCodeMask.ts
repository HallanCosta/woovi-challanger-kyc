export type PostalCodeFormat = {
  mask: string
  placeholder: string
  maxLength: number
}

const postalCodeFormats: Record<string, PostalCodeFormat> = {
  Brazil: {
    mask: "#####-###",
    placeholder: "01234-567",
    maxLength: 9,
  },
  "United States": {
    mask: "#####",
    placeholder: "10001",
    maxLength: 5,
  },
  "United Kingdom": {
    mask: "#### ###",
    placeholder: "SW1A 1AA",
    maxLength: 8,
  },
  Canada: {
    mask: "### ###",
    placeholder: "M5H 2N2",
    maxLength: 7,
  },
  Spain: {
    mask: "#####",
    placeholder: "28001",
    maxLength: 5,
  },
  Portugal: {
    mask: "####-###",
    placeholder: "1050-001",
    maxLength: 8,
  },
  Germany: {
    mask: "#####",
    placeholder: "10115",
    maxLength: 5,
  },
  France: {
    mask: "#####",
    placeholder: "75001",
    maxLength: 5,
  },
  Italy: {
    mask: "#####",
    placeholder: "00100",
    maxLength: 5,
  },
  Australia: {
    mask: "####",
    placeholder: "2000",
    maxLength: 4,
  },
}

export function getPostalCodeFormat(country: string): PostalCodeFormat {
  return (
    postalCodeFormats[country] || {
      mask: "##########",
      placeholder: "Enter postal code",
      maxLength: 10,
    }
  )
}

export function formatPostalCode(value: string, country: string): string {
  if (!country) return value

  const format = getPostalCodeFormat(country)
  
  const isAlphanumeric = country === "United Kingdom" || country === "Canada"
  const cleaned = isAlphanumeric 
    ? value.replace(/[^A-Za-z0-9]/g, "").toUpperCase()
    : value.replace(/\D/g, "")
  
  let formatted = ""
  let cleanedIndex = 0

  for (let i = 0; i < format.mask.length && cleanedIndex < cleaned.length; i++) {
    if (format.mask[i] === "#") {
      formatted += cleaned[cleanedIndex]
      cleanedIndex++
    } else {
      formatted += format.mask[i]
    }
  }

  return formatted
}

