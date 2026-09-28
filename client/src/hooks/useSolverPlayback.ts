import { useCallback, useRef, type Dispatch, type SetStateAction } from 'react';
import {
  cloneGrid,
  setDigit,
  type DigitChange,
  type SudokuGrid,
} from '../sudoku/index.ts';

const PLAYBACK_DELAY_MS = 220;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

interface PlaybackArgs {
  setGrid: Dispatch<SetStateAction<SudokuGrid>>;
  setLocked: Dispatch<SetStateAction<boolean>>;
  setUndoStack: Dispatch<SetStateAction<SudokuGrid[]>>;
  setSolverMessage: Dispatch<SetStateAction<string | null>>;
}

export function useSolverPlayback({
  setGrid,
  setLocked,
  setUndoStack,
  setSolverMessage,
}: PlaybackArgs) {
  const playbackId = useRef(0);

  const cancelPlayback = useCallback(() => {
    playbackId.current += 1;
    setLocked(false);
  }, [setLocked]);

  const playChanges = useCallback(
    async (before: SudokuGrid, changes: DigitChange[]) => {
      const token = playbackId.current + 1;
      playbackId.current = token;
      setUndoStack((stack) => [...stack, cloneGrid(before)]);
      setLocked(true);
      setSolverMessage(null);

      let current = before;
      for (const change of changes) {
        if (playbackId.current !== token) {
          return;
        }
        await delay(PLAYBACK_DELAY_MS);
        if (playbackId.current !== token) {
          return;
        }
        const next = setDigit(current, change, change.digit);
        if (next === null) {
          setSolverMessage('The solver returned an illegal digit.');
          setLocked(false);
          return;
        }
        current = next;
        setGrid(next);
      }
      setLocked(false);
    },
    [setGrid, setLocked, setSolverMessage, setUndoStack],
  );

  return { playChanges, cancelPlayback };
}
