import type { CellCoord, SudokuCell, SudokuGrid } from './types/index.ts';

export function boxIndex(row: number, col: number, boxSize: number): number {
  return Math.floor(row / boxSize) * boxSize + Math.floor(col / boxSize);
}

export function cellIndex(row: number, col: number, size: number): number {
  return row * size + col;
}

export function emptyCandidates(size: number): boolean[] {
  return Array.from({ length: size }, () => false);
}

export function createEmptyGrid(size = 9): SudokuGrid {
  const boxSize = Math.sqrt(size);
  if (!Number.isInteger(boxSize)) {
    throw new Error('Grid size must be a perfect square.');
  }

  const cells: SudokuCell[] = [];
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      cells.push({
        row,
        col,
        box: boxIndex(row, col, boxSize),
        value: null,
        isGiven: false,
        candidates: emptyCandidates(size),
      });
    }
  }

  return { size, boxSize, cells };
}

export function getCell(grid: SudokuGrid, coord: CellCoord): SudokuCell {
  return grid.cells[cellIndex(coord.row, coord.col, grid.size)]!;
}

export function sharesUnit(a: SudokuCell, b: SudokuCell): boolean {
  return a.row === b.row || a.col === b.col || a.box === b.box;
}

export function isInBounds(grid: SudokuGrid, coord: CellCoord): boolean {
  return (
    coord.row >= 0 &&
    coord.col >= 0 &&
    coord.row < grid.size &&
    coord.col < grid.size
  );
}

export function wrapCoord(value: number, size: number): number {
  return ((value % size) + size) % size;
}
