export const minMax = (a: number, b: number, c: number, d: number) => {
  const discriminant = (2 * b) ** 2 - 4 * (3 * a) * c;

  if (a !== 0 && discriminant > 0) {
    const x1 = (-2 * b + Math.sqrt(discriminant)) / (2 * 3 * a);
    const x2 = (-2 * b - Math.sqrt(discriminant)) / (2 * 3 * a);

    const y1 = a * Math.pow(x1, 3) + b * Math.pow(x1, 2) + c * x1 + d;
    const y2 = a * Math.pow(x2, 3) + b * Math.pow(x2, 2) + c * x2 + d;

    if (y1 > y2) {
      return { minX: x2.toFixed(4), minY: y2.toFixed(4), maxX: x1.toFixed(4), maxY: y1.toFixed(4) };
    } else {
      return { minX: x1.toFixed(4), minY: y1.toFixed(4), maxX: x2.toFixed(4), maxY: y2.toFixed(4) };
    }
  }

  return {
    minX: "N/A",
    minY: "N/A",
    maxX: "N/A",
    maxY: "N/A",
  };
};