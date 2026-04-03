export function convertUnits(value, fromUnit, toUnit, type) {
  if (type === "Length") {
    const map = {
      km: 1000,
      m: 1,
      cm: 0.01,
      mm: 0.001
    };

    return (value * map[fromUnit]) / map[toUnit];
  }

  if (type === "Weight") {
    const map = {
      kg: 1000,
      g: 1,
      mg: 0.001
    };

    return (value * map[fromUnit]) / map[toUnit];
  }

  if (type === "Volume") {
    const map = {
      l: 1,
      ml: 0.001
    };

    return (value * map[fromUnit]) / map[toUnit];
  }

  if (type === "Temperature") {
    if (fromUnit === toUnit) return value;

    if (fromUnit === "C" && toUnit === "F") return (value * 9) / 5 + 32;
    if (fromUnit === "F" && toUnit === "C") return ((value - 32) * 5) / 9;
  }

  return value;
}