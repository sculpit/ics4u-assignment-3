export type Coefficients = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export type Coordinate = {
  x: number | string;
  y?: number | string;
};

export type Results = {
  p?: number | string;
  q?: number | string;
  discriminant?: number | string;
  r1?: Coordinate;
  r2?: Coordinate;
  r3?: Coordinate;
  minimum?: Coordinate;
  maximum?: Coordinate;
  equation?: string;
  firstDerivative?: string;
  secondDerivative?: string;
  roots?: string;
  factored?: string;
  x1?: string;
  x2?: string;
  x3?: string;
  y1?: string;
  y2?: string;
  y3?: string;
};

export type History = Coefficients[];
