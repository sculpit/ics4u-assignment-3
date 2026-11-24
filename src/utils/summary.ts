export const expandedPolynomial = (a: number, b: number, c: number, d: number) => {
  const terms = [];

  if (a !== 0) {
    const sign = a < 0 ? "- " : "";
    terms.push(`${sign}${Math.abs(a)}x³`);
  }

  if (b !== 0) {
    const sign = b < 0 ? " - " : " + ";
    terms.push(`${sign}${Math.abs(b)}x²`);
  }

  if (c !== 0) {
    const sign = c < 0 ? " - " : " + ";
    terms.push(`${sign}${Math.abs(c)}x`);
  }

  if (d !== 0) {
    const sign = d < 0 ? " - " : terms.length > 0 ? " + " : "";
    terms.push(`${sign}${Math.abs(d)}`);
  }

  return terms.join("");
};

export const firstDerivative = (a: number, b: number, c: number) => {
  const terms = [];

  if (3 * a !== 0) {
    const sign = 3 * a < 0 ? "- " : "";
    terms.push(`${sign}${Math.abs(3 * a)}x²`);
  }

  if (2 * b !== 0) {
    const sign = 2 * b < 0 ? " - " : terms.length > 0 ? " + " : "";
    terms.push(`${sign}${Math.abs(2 * b)}x`);
  }

  if (c !== 0) {
    const sign = c < 0 ? " - " : terms.length > 0 ? " + " : "";
    terms.push(`${sign}${Math.abs(c)}`);
  }

  return terms.join("");
};

export const secondDerivative = (a: number, b: number) => {
  const terms = [];

  if (6 * a !== 0) {
    const sign = 6 * a < 0 ? "- " : "";
    terms.push(`${sign}${Math.abs(6 * a)}x`);
  }

  if (2 * b !== 0) {
    const sign = 2 * b < 0 ? " - " : terms.length > 0 ? " + " : "";
    terms.push(`${sign}${Math.abs(2 * b)}`);
  }

  return terms.join("");
};

// export const factoredForm = (a: number, b: number, c: number, d: number) => {
// //   const terms = [];

// //   if (6 * a !== 0) {
// //     const sign = 6 * a < 0 ? "- " : "";
// //     terms.push(`${sign}${Math.abs(6 * a)}x`);
// //   }

// //   if (2 * b !== 0) {
// //     const sign = 2 * b < 0 ? " - " : terms.length > 0 ? " + " : "";
// //     terms.push(`${sign}${Math.abs(2 * b)}`);
// //   }

// //   return terms.join("");

//     if ()
// };
