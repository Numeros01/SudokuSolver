import { getCell, sharesUnit } from '../grid.ts';
import type { CellCoord, Digit, SudokuGrid } from '../types/index.ts';
import { DIGITS } from '../types/index.ts';

export function isDigitLegal(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): boolean {
  const cell = getCell(grid, coord);
  return !grid.cells.some(
    (other) =>
      (other.row !== cell.row || other.col !== cell.col) &&
      sharesUnit(cell, other) &&
      other.value === digit,
  );
}

export function allowedDigits(grid: SudokuGrid, coord: CellCoord): Digit[] {
  const cell = getCell(grid, coord);
  if (cell.isGiven) {
    return [];
  }
  return DIGITS.filter((digit) => isDigitLegal(grid, coord, digit));
}

export function isGridComplete(grid: SudokuGrid): boolean {
  return grid.cells.every((cell) => cell.value !== null);
}
