import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BingoTitle from './BingoTitle';

describe('<BingoTitle />', () => {
  const defaultProps = {
    title: 'Test Bingo',
    loading: false,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<BingoTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test bingo/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga sin mostrar el título', () => {
    render(<BingoTitle {...defaultProps} loading={true} />);

    const titleElement = screen.queryByRole('heading', { name: /test bingo/i });
    expect(titleElement).not.toBeInTheDocument();
  });

  it('muestra el título correctamente', () => {
    render(<BingoTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test bingo/i });
    expect(titleElement).toBeInTheDocument();
  });
});
