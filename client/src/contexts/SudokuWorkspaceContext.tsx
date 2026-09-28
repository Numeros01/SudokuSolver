import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useSolverPlayback } from '../hooks/useSolverPlayback.ts';
import {
  allowedDigits,
  canAddCandidate,
  changedDigits,
  clearDigit,
  cloneGrid,
  createEmptyGrid,
  getGridHighlight,
  getSolver,
  hasCandidate,
  isGridComplete,
  moveSelection,
  nextEnterCell,
  nextTabCell,
  setDigit,
  toggleCandidate,
  type CellCoord,
  type Digit,
  type GridHighlight,
  type MoveDirection,
  type SudokuGrid,
} from '../sudoku/index.ts';

interface WorkspaceContextValue {
  grid: SudokuGrid;
  selected: CellCoord | null;
  noteMode: boolean;
  locked: boolean;
  canUndo: boolean;
  solverMessage: string | null;
  highlight: GridHighlight;
  isComplete: boolean;
  select: (coord: CellCoord) => void;
  setNoteMode: (value: boolean) => void;
  inputDigit: (digit: Digit) => void;
  erase: () => void;
  undo: () => void;
  move: (direction: MoveDirection) => void;
  tabNext: () => void;
  enterNext: () => void;
  runSolver: (id: string) => void;
  resetPuzzle: () => void;
  isDigitEnabled: (digit: Digit) => boolean;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function SudokuWorkspaceProvider({ children }: { children: ReactNode }) {
  const [grid, setGrid] = useState<SudokuGrid>(() => createEmptyGrid());
  const [selected, setSelected] = useState<CellCoord | null>(null);
  const [noteMode, setNoteMode] = useState(false);
  const [locked, setLocked] = useState(false);
  const [undoStack, setUndoStack] = useState<SudokuGrid[]>([]);
  const [solverMessage, setSolverMessage] = useState<string | null>(null);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  const { playChanges, cancelPlayback } = useSolverPlayback({
    setGrid,
    setLocked,
    setUndoStack,
    setSolverMessage,
  });

  const commit = useCallback((next: SudokuGrid, recordUndo: boolean) => {
    if (next === gridRef.current) {
      return;
    }
    if (recordUndo) {
      setUndoStack((stack) => [...stack, cloneGrid(gridRef.current)]);
    }
    setGrid(next);
  }, []);

  const select = useCallback(
    (coord: CellCoord) => {
      if (locked) {
        return;
      }
      setSelected(coord);
    },
    [locked],
  );

  const inputDigit = useCallback(
    (digit: Digit) => {
      if (locked || !selected) {
        return;
      }
      if (noteMode) {
        commit(toggleCandidate(gridRef.current, selected, digit), true);
        return;
      }
      const next = setDigit(gridRef.current, selected, digit);
      if (next === null) {
        return;
      }
      commit(next, true);
    },
    [commit, locked, noteMode, selected],
  );

  const erase = useCallback(() => {
    if (locked || !selected) {
      return;
    }
    commit(clearDigit(gridRef.current, selected), true);
  }, [commit, locked, selected]);

  const undo = useCallback(() => {
    if (locked) {
      return;
    }
    setUndoStack((stack) => {
      if (stack.length === 0) {
        return stack;
      }
      const previous = stack[stack.length - 1]!;
      setGrid(previous);
      return stack.slice(0, -1);
    });
  }, [locked]);

  const move = useCallback(
    (direction: MoveDirection) => {
      if (locked) {
        return;
      }
      setSelected((current) => moveSelection(gridRef.current, current, direction));
    },
    [locked],
  );

  const tabNext = useCallback(() => {
    if (locked) {
      return;
    }
    setSelected((current) => nextTabCell(gridRef.current, current));
  }, [locked]);

  const enterNext = useCallback(() => {
    if (locked) {
      return;
    }
    setSelected((current) => nextEnterCell(gridRef.current, current));
  }, [locked]);

  const resetPuzzle = useCallback(() => {
    cancelPlayback();
    setNoteMode(false);
    setSelected(null);
    setUndoStack([]);
    setSolverMessage(null);
    setGrid(createEmptyGrid());
  }, [cancelPlayback]);

  const runSolver = useCallback(
    (id: string) => {
      if (locked) {
        return;
      }
      const solver = getSolver(id);
      if (!solver) {
        setSolverMessage('Unknown solver.');
        return;
      }

      const result = solver.solve(gridRef.current);
      if (result.status === 'not-implemented') {
        setSolverMessage(`${solver.name} is not implemented yet.`);
        return;
      }
      if (result.status === 'unsolved') {
        setSolverMessage(`${solver.name} found no solution.`);
        return;
      }

      const before = gridRef.current;
      const changes = changedDigits(before, result.grid);
      if (changes.length === 0) {
        setSolverMessage('The solver returned no new digits.');
        return;
      }

      void playChanges(before, changes);
    },
    [locked, playChanges],
  );

  const isDigitEnabled = useCallback(
    (digit: Digit) => {
      if (!selected || locked) {
        return false;
      }
      if (noteMode) {
        return (
          hasCandidate(grid, selected, digit) ||
          canAddCandidate(grid, selected, digit)
        );
      }
      return allowedDigits(grid, selected).includes(digit);
    },
    [grid, locked, noteMode, selected],
  );

  const highlight = useMemo(
    () => getGridHighlight(grid, selected),
    [grid, selected],
  );

  const value = useMemo<WorkspaceContextValue>(
    () => ({
      grid,
      selected,
      noteMode,
      locked,
      canUndo: undoStack.length > 0,
      solverMessage,
      highlight,
      isComplete: isGridComplete(grid) && !locked,
      select,
      setNoteMode,
      inputDigit,
      erase,
      undo,
      move,
      tabNext,
      enterNext,
      runSolver,
      resetPuzzle,
      isDigitEnabled,
    }),
    [
      enterNext,
      erase,
      grid,
      highlight,
      inputDigit,
      isDigitEnabled,
      locked,
      move,
      noteMode,
      resetPuzzle,
      runSolver,
      select,
      selected,
      solverMessage,
      tabNext,
      undo,
      undoStack.length,
    ],
  );

  return (
    <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
  );
}

export function useSudokuWorkspace(): WorkspaceContextValue {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error(
      'useSudokuWorkspace must be used within SudokuWorkspaceProvider',
    );
  }
  return context;
}
