import { Link } from 'react-router-dom';
import { SUDOKU_VARIANTS } from '../sudoku/index.ts';

export function HomePage() {
  return (
    <main className="page page-narrow">
      <h1>Sudoku</h1>
      <p>Choose a puzzle type. The solver runs entirely in the browser.</p>
      <div className="variant-list">
        {SUDOKU_VARIANTS.map((variant) =>
          variant.available && variant.path ? (
            <Link
              key={variant.id}
              className="variant-card"
              to={variant.path}
            >
              <h2>{variant.name}</h2>
              <p>{variant.description}</p>
            </Link>
          ) : (
            <div key={variant.id} className="variant-card-disabled">
              <h2>{variant.name}</h2>
              <p>{variant.description}</p>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
