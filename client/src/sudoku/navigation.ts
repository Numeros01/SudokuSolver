import { wrapCoord } from './grid.ts';
import type { CellCoord, SudokuGrid } from './types/index.ts';

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export function moveSelection(
  grid: SudokuGrid,
  current: CellCoord | null,
  direction: MoveDirection,
): CellCoord {
  if (!current) {
    return { row: 0, col: 0 };
  }
  const origin = current;
  switch (direction) {
    case 'up':
      return { row: wrapCoord(origin.row - 1, grid.size), col: origin.col };
    case 'down':
      return { row: wrapCoord(origin.row + 1, grid.size), col: origin.col };
    case 'left':
      return { row: origin.row, col: wrapCoord(origin.col - 1, grid.size) };
    case 'right':
      return { row: origin.row, col: wrapCoord(origin.col + 1, grid.size) };
  }
}

export function nextTabCell(
  grid: SudokuGrid,
  current: CellCoord | null,
): CellCoord {
  if (!current) {
    return { row: 0, col: 0 };
  }
  const origin = current;
  const index = origin.row * grid.size + origin.col + 1;
  const wrapped = index % (grid.size * grid.size);
  return {
    row: Math.floor(wrapped / grid.size),
    col: wrapped % grid.size,
  };
}

export function nextEnterCell(
  grid: SudokuGrid,
  current: CellCoord | null,
): CellCoord {
  if (!current) {
    return { row: 0, col: 0 };
  }
  const origin = current;
  const nextRow = origin.row + 1;
  if (nextRow < grid.size) {
    return { row: nextRow, col: origin.col };
  }
  return { row: 0, col: wrapCoord(origin.col + 1, grid.size) };
}
