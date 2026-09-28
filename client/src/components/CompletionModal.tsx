import { Link } from 'react-router-dom';
import { useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';

export function CompletionModal() {
  const { isComplete, resetPuzzle } = useSudokuWorkspace();

  if (!isComplete) {
    return null;
  }

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="complete-title">
      <div className="modal">
        <h2 id="complete-title">Puzzle complete</h2>
        <p>Every cell has a digit. Choose what to do next.</p>
        <div className="modal-actions">
          <Link to="/">Back to Home</Link>
          <button type="button" onClick={resetPuzzle}>
            New Sudoku
          </button>
        </div>
      </div>
    </div>
  );
}
