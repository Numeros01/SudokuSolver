import { DIGITS, type Digit, type SudokuCell } from '../sudoku/index.ts';
import { useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';
import { coordKey } from '../sudoku/highlight.ts';

function cellClassName(selected: boolean, related: boolean): string {
  const classes = ['sudoku-cell'];
  if (selected) {
    classes.push('selected');
  } else if (related) {
    classes.push('related');
  }
  return classes.join(' ');
}

function SudokuCellView({ cell }: { cell: SudokuCell }) {
  const { selected, highlight, select } = useSudokuWorkspace();
  const key = coordKey(cell);
  const isSelected =
    selected?.row === cell.row && selected?.col === cell.col;
  const related = highlight.related.has(key);
  const sameDigit = highlight.sameDigit.has(key);

  return (
    <button
      type="button"
      tabIndex={-1}
      className={cellClassName(isSelected, related)}
      aria-label={`Row ${cell.row + 1}, column ${cell.col + 1}`}
      onClick={() => {
        select(cell);
      }}
    >
      {cell.value !== null ? (
        <span className={`digit${cell.isGiven ? ' given' : ''}${sameDigit ? ' same' : ''}`}>
          {cell.value}
        </span>
      ) : (
        <span className="candidates">
          {DIGITS.map((digit: Digit) => {
            const visible = cell.candidates[digit - 1] === true;
            const highlighted =
              visible && highlight.highlightDigit === digit;
            return (
              <span
                key={digit}
                className={`candidate${highlighted ? ' highlighted' : ''}`}
              >
                {visible ? digit : ''}
              </span>
            );
          })}
        </span>
      )}
    </button>
  );
}

export function SudokuBoard() {
  const { grid } = useSudokuWorkspace();

  return (
    <div className="grid-wrap">
      <div className="sudoku-grid" role="grid" aria-label="Classic Sudoku">
        {grid.cells.map((cell) => (
          <SudokuCellView key={coordKey(cell)} cell={cell} />
        ))}
      </div>
    </div>
  );
}
