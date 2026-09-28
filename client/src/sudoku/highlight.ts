import { getCell, sharesUnit } from './grid.ts';
import type { CellCoord, Digit, SudokuGrid } from './types/index.ts';

export interface GridHighlight {
  selected: CellCoord | null;
  related: ReadonlySet<string>;
  sameDigit: ReadonlySet<string>;
  highlightDigit: Digit | null;
}

export function coordKey(coord: CellCoord): string {
  return `${coord.row}:${coord.col}`;
}

export function getGridHighlight(
  grid: SudokuGrid,
  selected: CellCoord | null,
): GridHighlight {
  if (!selected) {
    return {
      selected: null,
      related: new Set(),
      sameDigit: new Set(),
      highlightDigit: null,
    };
  }

  const cell = getCell(grid, selected);
  const related = new Set<string>();
  const sameDigit = new Set<string>();

  for (const other of grid.cells) {
    if (sharesUnit(cell, other)) {
      related.add(coordKey(other));
    }
    if (cell.value !== null && other.value === cell.value) {
      sameDigit.add(coordKey(other));
    }
  }

  return {
    selected,
    related,
    sameDigit,
    highlightDigit: cell.value,
  };
}
