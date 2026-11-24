export const minMax = (a: number, b: number, c: number, d: number) => {
  const discriminant = (2 * b) ** 2 - 4 * (3 * a) * c;

  if (a !== 0 && discriminant > 0) {
    const x1 = (-2 * b + Math.sqrt(discriminant)) / (2 * 3 * a);
    const x2 = (-2 * b - Math.sqrt(discriminant)) / (2 * 3 * a);

    const y1 = a * x1 ** 3 + b * x1 ** 2 + c * x1 + d;
    const y2 = a * x2 ** 3 + b * x2 ** 2 + c * x2 + d;

    if (y1 > y2) {
      return { maxX: x1.toFixed(4), maxY: y1.toFixed(4), minX: x2.toFixed(4), minY: y2.toFixed(4) };
    } else {
      return { maxX: x2.toFixed(4), maxY: y2.toFixed(4), minX: x1.toFixed(4), minY: y1.toFixed(4) };
    }
  }

  return {
    maxX: "N/A",
    maxY: "N/A",
    minX: "N/A",
    minY: "N/A",
  };
};
