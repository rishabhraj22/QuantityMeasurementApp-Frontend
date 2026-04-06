export const mockUnits = {
  Length: [
    { id: 1, name: 'Meter', symbol: 'm' },
    { id: 2, name: 'Kilometer', symbol: 'km' },
    { id: 3, name: 'Centimeter', symbol: 'cm' },
    { id: 4, name: 'Millimeter', symbol: 'mm' },
  ],
  Weight: [
    { id: 1, name: 'Gram', symbol: 'g' },
    { id: 2, name: 'Kilogram', symbol: 'kg' },
    { id: 3, name: 'Pound', symbol: 'lb' },
  ],
  Temperature: [
    { id: 1, name: 'Celsius', symbol: '°C' },
    { id: 2, name: 'Fahrenheit', symbol: '°F' },
    { id: 3, name: 'Kelvin', symbol: 'K' },
  ],
  Volume: [
    { id: 1, name: 'Liter', symbol: 'L' },
    { id: 2, name: 'Milliliter', symbol: 'mL' },
    { id: 3, name: 'Gallon', symbol: 'gal' },
  ],
}

export function fetchUnitsByType(type) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUnits[type]) {
        resolve(mockUnits[type])
      } else {
        reject(new Error('Failed to load units'))
      }
    }, 500)
  })
}