import type { SudokuCell, SudokuGrid } from './types/index.ts';

export function cloneCell(cell: SudokuCell): SudokuCell {
  return {
    ...cell,
    candidates: [...cell.candidates],
  };
}

export function cloneGrid(grid: SudokuGrid): SudokuGrid {
  return {
    size: grid.size,
    boxSize: grid.boxSize,
    cells: grid.cells.map(cloneCell),
  };
}
