import { EPS } from "../constants";
import type { Results } from "../types";

export const SolveCubic = (a: number, b: number, c: number, d: number): Results => {
  if (a === 0) {
    return {
      discriminant: "0.0000",
      p: "0.0000",
      q: "0.0000",
      roots: "0.0000",
      x1: "0.0000",
      x2: "0.0000",
      x3: "0.0000",
      y1: "0.0000",
      y2: "0.0000",
      y3: "0.0000",
    };
  }

  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
  const discriminant = (q / 2) ** 2 + (p / 3) ** 3;
  const h = b / (3 * a);

  const results = { discriminant, p, q };

  if (discriminant < -EPS) {
    const { x1, x2, x3, roots } = caseA(h, p, q);
    return {
      ...results,
      roots: roots,
      x1: x1.toFixed(4),
      x2: x2.toFixed(4),
      x3: x3.toFixed(4),
      y1: "0.0000",
      y2: "0.0000",
      y3: "0.0000",
    };
  } else if (discriminant > EPS) {
    const { x1, roots } = caseB(h, discriminant, q);
    return {
      ...results,
      roots: roots,
      x1: x1.toFixed(4),
      x2: "Imaginary",
      x3: "Imaginary",
      y1: "0.0000",
      y2: "Imaginary",
      y3: "Imaginary",
    };
  } else {
    const { x1, x2, x3, roots } = caseC(h, p, q);
    return {
      ...results,
      roots: roots,
      x1: x1.toFixed(4),
      x2: x2.toFixed(4),
      x3: x3.toFixed(4),
      y1: "0.0000",
      y2: "0.0000",
      y3: "0.0000",
    };
  }
};

const caseA = (h: number, p: number, q: number) => {
  const coeff = 2 * Math.sqrt(-p / 3);
  const term = -q / (2 * Math.sqrt((-(p / 3)) ** 3));
  const theta = (1 / 3) * Math.acos(Math.max(-1, Math.min(1, term)));

  const y1 = coeff * Math.cos(theta);
  const y2 = coeff * Math.cos(theta + (2 * Math.PI) / 3);
  const y3 = coeff * Math.cos(theta + (4 * Math.PI) / 3);

  const x1 = y1 - h;
  const x2 = y2 - h;
  const x3 = y3 - h;

  return { roots: "3 Distinct Real Roots", x1, x2, x3 };
};

const caseB = (h: number, discriminant: number, q: number) => {
  const y = Math.cbrt(-(q / 2) + Math.sqrt(discriminant)) + Math.cbrt(-(q / 2) - Math.sqrt(discriminant));
  const x1 = y - h;
  return { roots: "1 Real Root, 2 Complex Roots", x1 };
};

const caseC = (h: number, p: number, q: number) => {
  if (Math.abs(p) < EPS && Math.abs(q) < EPS) {
    const x1 = -h;
    const x2 = -h;
    const x3 = -h;
    return { roots: "Triple Real Roots", x1, x2, x3 };
  } else {
    const r2 = -Math.cbrt(4 * q);
    const r1 = -r2 / 2;
    const x1 = r2 - h;
    const x2 = r1 - h;
    const x3 = r1 - h;
    return { roots: "Double Real Roots, Single Real Root", x1, x2, x3 };
  }
};
