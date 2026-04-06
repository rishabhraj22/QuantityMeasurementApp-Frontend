const conversionFactors = {
  Length: {
    m: 1,
    km: 1000,
    cm: 0.01,
    mm: 0.001,
  },
  Weight: {
    g: 1,
    kg: 1000,
    lb: 453.592,
  },
  Volume: {
    L: 1,
    mL: 0.001,
    gal: 3.78541,
  },
  Temperature: {
    '°C': 'C',
    '°F': 'F',
    K: 'K',
  },
}

function convertTemperature(value, fromUnit, toUnit) {
  let celsius

  if (fromUnit === '°C') celsius = value
  else if (fromUnit === '°F') celsius = (value - 32) * (5 / 9)
  else if (fromUnit === 'K') celsius = value - 273.15

  if (toUnit === '°C') return celsius
  if (toUnit === '°F') return (celsius * 9) / 5 + 32
  if (toUnit === 'K') return celsius + 273.15
}

export function performConversion(type, value, fromUnit, toUnit) {
  const num = parseFloat(value)

  if (type === 'Temperature') {
    return convertTemperature(num, fromUnit, toUnit)
  }

  const factors = conversionFactors[type]
  const baseValue = num * factors[fromUnit]
  return baseValue / factors[toUnit]
}

export function performComparison(type, value, fromUnit, toUnit) {
  const converted = performConversion(type, value, fromUnit, toUnit)
  return `${value} ${fromUnit} = ${converted.toFixed(2)} ${toUnit}`
}

export function performArithmetic(type, fromValue, toValue, fromUnit, toUnit, operator) {
  const first = parseFloat(fromValue)
  let second = parseFloat(toValue)

  if (type === 'Temperature') {
    second = performConversion(type, toValue, toUnit, fromUnit)
  } else {
    second = performConversion(type, toValue, toUnit, fromUnit)
  }

  let result

  switch (operator) {
    case '+':
      result = first + second
      break
    case '-':
      result = first - second
      break
    case '*':
      result = first * second
      break
    case '/':
      if (second === 0) {
        throw new Error('Cannot divide by zero')
      }
      result = first / second
      break
    default:
      throw new Error('Invalid operator')
  }

  return result
}

export function formatResult(result, unit) {
  return `${parseFloat(result).toFixed(2)} ${unit}`
}