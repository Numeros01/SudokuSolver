import { getCell, sharesUnit } from '../grid.ts';
import type { CellCoord, Digit, SudokuGrid } from '../types/index.ts';
import { isDigitLegal } from '../validation/rules.ts';

export function hasCandidate(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): boolean {
  return getCell(grid, coord).candidates[digit - 1] === true;
}

export function canAddCandidate(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): boolean {
  const cell = getCell(grid, coord);
  if (cell.value !== null || cell.isGiven) {
    return false;
  }
  return isDigitLegal(grid, coord, digit);
}

export function toggleCandidate(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): SudokuGrid {
  const cell = getCell(grid, coord);
  if (cell.value !== null || cell.isGiven) {
    return grid;
  }

  const present = cell.candidates[digit - 1] === true;
  if (!present && !canAddCandidate(grid, coord, digit)) {
    return grid;
  }

  return {
    ...grid,
    cells: grid.cells.map((item) => {
      if (item.row !== coord.row || item.col !== coord.col) {
        return item;
      }
      const candidates = [...item.candidates];
      candidates[digit - 1] = !present;
      return { ...item, candidates };
    }),
  };
}

export function clearCellCandidates(
  grid: SudokuGrid,
  coord: CellCoord,
): SudokuGrid {
  return {
    ...grid,
    cells: grid.cells.map((item) =>
      item.row === coord.row && item.col === coord.col
        ? { ...item, candidates: item.candidates.map(() => false) }
        : item,
    ),
  };
}

export function removeCandidateFromPeers(
  grid: SudokuGrid,
  coord: CellCoord,
  digit: Digit,
): SudokuGrid {
  const cell = getCell(grid, coord);
  return {
    ...grid,
    cells: grid.cells.map((item) => {
      if (item.row === cell.row && item.col === cell.col) {
        return item;
      }
      if (!sharesUnit(cell, item) || item.candidates[digit - 1] !== true) {
        return item;
      }
      const candidates = [...item.candidates];
      candidates[digit - 1] = false;
      return { ...item, candidates };
    }),
  };
}
