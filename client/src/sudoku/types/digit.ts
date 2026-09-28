export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const DIGITS: readonly Digit[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function isDigit(value: number): value is Digit {
  return Number.isInteger(value) && value >= 1 && value <= 9;
}
