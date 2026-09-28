import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.tsx';

export function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <Link to="/">Sudoku</Link>
      <div className="app-header-actions">
        <button type="button" onClick={toggleTheme}>
          {theme === 'dark' ? 'Dark' : 'Light'} theme
        </button>
      </div>
    </header>
  );
}
