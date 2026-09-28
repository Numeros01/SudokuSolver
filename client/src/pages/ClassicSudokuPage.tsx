import { CompletionModal } from '../components/CompletionModal.tsx';
import { NumberToolbar } from '../components/NumberToolbar.tsx';
import { SolverToolbar } from '../components/SolverToolbar.tsx';
import { SudokuBoard } from '../components/SudokuBoard.tsx';
import { SudokuWorkspaceProvider, useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';
import { useSudokuKeyboard } from '../hooks/useSudokuKeyboard.ts';

function ClassicWorkspace() {
  const { locked } = useSudokuWorkspace();
  useSudokuKeyboard();

  return (
    <main className={`page workspace${locked ? ' workspace-locked' : ''}`}>
      <SolverToolbar />
      <SudokuBoard />
      <NumberToolbar />
      <CompletionModal />
    </main>
  );
}

export function ClassicSudokuPage() {
  return (
    <SudokuWorkspaceProvider>
      <ClassicWorkspace />
    </SudokuWorkspaceProvider>
  );
}
