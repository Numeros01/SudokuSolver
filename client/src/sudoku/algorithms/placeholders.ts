import type { SudokuSolver } from '../types/index.ts';

function placeholderSolver(id: string, name: string): SudokuSolver {
  return {
    id,
    name,
    solve() {
      return { status: 'not-implemented' };
    },
  };
}

export const PLACEHOLDER_SOLVERS: readonly SudokuSolver[] = [
  placeholderSolver('naked-single', 'Naked Single'),
  placeholderSolver('hidden-single', 'Hidden Single'),
  placeholderSolver('backtracking', 'Backtracking'),
];
