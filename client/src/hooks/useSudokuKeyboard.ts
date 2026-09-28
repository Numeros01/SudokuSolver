import { useEffect } from 'react';
import { isDigit } from '../sudoku/index.ts';
import { useSudokuWorkspace } from '../contexts/SudokuWorkspaceContext.tsx';

export function useSudokuKeyboard(): void {
  const { locked, isComplete, inputDigit, erase, move, tabNext, enterNext } =
    useSudokuWorkspace();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (locked || isComplete) {
        if (
          event.key === 'Tab' ||
          event.key === 'Enter' ||
          event.key.startsWith('Arrow')
        ) {
          event.preventDefault();
        }
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        tabNext();
        return;
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        enterNext();
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        move('up');
        return;
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        move('down');
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move('left');
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        move('right');
        return;
      }
      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        erase();
        return;
      }

      const asNumber = Number(event.key);
      if (event.key.length === 1 && isDigit(asNumber)) {
        event.preventDefault();
        inputDigit(asNumber);
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [enterNext, erase, inputDigit, isComplete, locked, move, tabNext]);
}
