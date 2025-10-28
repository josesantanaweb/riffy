import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RaffleTitle from './RaffleTitle';

describe('<RaffleTitle />', () => {
  const defaultProps = {
    title: 'Test Raffle',
    loading: false,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<RaffleTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test raffle/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga sin mostrar el título', () => {
    render(<RaffleTitle {...defaultProps} loading={true} />);

    const titleElement = screen.queryByRole('heading', { name: /test raffle/i });
    expect(titleElement).not.toBeInTheDocument();
  });

  it('muestra el título correctamente', () => {
    render(<RaffleTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test raffle/i });
    expect(titleElement).toBeInTheDocument();
  });
});
