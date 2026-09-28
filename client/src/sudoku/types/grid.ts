import type { SudokuCell } from './cell.ts';

export interface SudokuGrid {
  size: number;
  boxSize: number;
  cells: readonly SudokuCell[];
}
