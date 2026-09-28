import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/AppHeader.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { ClassicSudokuPage } from './pages/ClassicSudokuPage.tsx';
import { HomePage } from './pages/HomePage.tsx';
import './styles/theme.css';
import './styles/app.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app-shell">
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/sudoku/classic" element={<ClassicSudokuPage/>} />
            <Route path="*" element={<Navigate to="/" replace/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
