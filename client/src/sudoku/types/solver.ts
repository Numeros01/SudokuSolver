import type { SudokuGrid } from './grid.ts';

export type SolverResult =
  | { status: 'solved'; grid: SudokuGrid }
  | { status: 'unsolved' }
  | { status: 'not-implemented' };

export interface SudokuSolver {
  id: string;
  name: string;
  solve(grid: SudokuGrid): SolverResult;
}
