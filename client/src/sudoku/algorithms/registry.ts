import type { SudokuSolver } from '../types/index.ts';
import { PLACEHOLDER_SOLVERS } from './placeholders.ts';

export const SOLVER_REGISTRY: readonly SudokuSolver[] = PLACEHOLDER_SOLVERS;

export function getSolver(id: string): SudokuSolver | undefined {
  return SOLVER_REGISTRY.find((solver) => solver.id === id);
}
