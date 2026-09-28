import { DIGITS } from '../sudoku/index.ts';
import { useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';

export function NumberToolbar() {
  const {
    noteMode,
    setNoteMode,
    inputDigit,
    erase,
    undo,
    canUndo,
    locked,
    isDigitEnabled,
    selected,
  } = useSudokuWorkspace();

  return (
    <aside className="toolbar" aria-label="Number toolbar">
      <h2>Actions</h2>
      <button type="button" onClick={undo} disabled={locked || !canUndo}>
        Undo
      </button>
      <button type="button" onClick={erase} disabled={locked || !selected}>
        Eraser
      </button>
      <button
        type="button"
        className={noteMode ? 'active' : ''}
        onClick={() => {
          setNoteMode(!noteMode);
        }}
        disabled={locked}
      >
        Notes {noteMode ? 'On' : 'Off'}
      </button>
      <h2>Digits</h2>
      <div className="number-pad">
        {DIGITS.map((digit) => (
          <button
            key={digit}
            type="button"
            disabled={!isDigitEnabled(digit)}
            onClick={() => {
              inputDigit(digit);
            }}
          >
            {digit}
          </button>
        ))}
      </div>
    </aside>
  );
}
