import {
  clearCellCandidates,
  removeCandidateFromPeers,
} from './candidates/candidates.ts';
import { getCell } from './grid.ts';
import type { CellCoord, Digit, SudokuGrid } from './types/index.ts';
import { isDigitLegal } from './validation/rules.ts';

export function setDigit(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): SudokuGrid | null {
  const cell = getCell(grid, coord);
  if (cell.isGiven) {
    return grid;
  }
  if (cell.value === digit) {
    return grid;
  }
  if (!isDigitLegal(grid, coord, digit)) {
    return null;
  }

  const withValue: SudokuGrid = {
    ...grid,
    cells: grid.cells.map((item) =>
      item.row === coord.row && item.col === coord.col
        ? { ...item, value: digit }
        : item,
    ),
  };
  return removeCandidateFromPeers(
    clearCellCandidates(withValue, coord),
    coord,
    digit,
  );
}

export function clearDigit(grid: SudokuGrid, coord: CellCoord): SudokuGrid {
  const cell = getCell(grid, coord);
  if (cell.isGiven || cell.value === null) {
    return grid;
  }

  return {
    ...grid,
    cells: grid.cells.map((item) =>
      item.row === coord.row && item.col === coord.col
        ? { ...item, value: null, candidates: item.candidates.map(() => false) }
        : item,
    ),
  };
}

export type DigitChange = CellCoord & { digit: Digit };

export function changedDigits(
  before: SudokuGrid,
  after: SudokuGrid,
): DigitChange[] {
  const changes: DigitChange[] = [];
  for (let i = 0; i < after.cells.length; i += 1) {
    const previous = before.cells[i]!;
    const next = after.cells[i]!;
    if (previous.value !== next.value && next.value !== null) {
      changes.push({ row: next.row, col: next.col, digit: next.value });
    }
  }
  return changes;
}
