const countryPhoneLengths: Record<string, number[]> = {
  Brazil: [10, 11],
  "United States": [10],
  Canada: [10], 
  "United Kingdom": [10, 11],
  Spain: [9],
  Portugal: [9],
  Germany: [10, 11],
  France: [10],
  Italy: [10],
  Australia: [10]
}

export function validatePhoneByCountry(phone: string, country: string): boolean {
  const cleanPhone = phone.replace(/[\s\-+()]/g, '')

  if (!/^\d+$/.test(cleanPhone)) {
    return false
  }

  if (country in countryPhoneLengths) {
    const validLengths = countryPhoneLengths[country]
    return validLengths.includes(cleanPhone.length)
  }

  return cleanPhone.length >= 8
}

