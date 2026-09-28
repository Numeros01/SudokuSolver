import { SOLVER_REGISTRY } from '../sudoku/index.ts';
import { useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';

export function SolverToolbar() {
  const { runSolver, solverMessage, locked } = useSudokuWorkspace();

  return (
    <aside className="toolbar" aria-label="Solver toolbar">
      <h2>Solvers</h2>
      {SOLVER_REGISTRY.map((solver) => (
        <button
          key={solver.id}
          type="button"
          disabled={locked}
          onClick={() => {
            runSolver(solver.id);
          }}
        >
          {solver.name}
        </button>
      ))}
      <p className="toolbar-status" role="status">
        {solverMessage ?? 'Algorithms can be plugged in later.'}
      </p>
    </aside>
  );
}
