export interface SudokuVariant {
  id: string;
  name: string;
  description: string;
  path: string | null;
  available: boolean;
}

export const SUDOKU_VARIANTS: readonly SudokuVariant[] = [
  {
    id: 'classic',
    name: 'Classic Sudoku',
    description: '9×9 grid. Fill digits 1–9 in every row, column, and box.',
    path: '/sudoku/classic',
    available: true,
  },
  {
    id: 'killer',
    name: 'Killer Sudoku',
    description: 'Coming later. Cage sums are not implemented yet.',
    path: null,
    available: false,
  },
];
