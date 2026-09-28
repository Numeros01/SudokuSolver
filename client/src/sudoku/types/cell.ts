import type { Digit } from './digit.ts';

export interface CellCoord {
  row: number;
  col: number;
}

export interface SudokuCell {
  row: number;
  col: number;
  box: number;
  value: Digit | null;
  isGiven: boolean;
  candidates: readonly boolean[];
}

export function coordsEqual(a: CellCoord | null, b: CellCoord | null): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.row === b.row && a.col === b.col;
}
