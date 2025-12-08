import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RaffleMain from './RaffleMain';

describe('<RaffleMain />', () => {
  const defaultProps = {
    title: 'Test Raffle',
    loading: false,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<RaffleMain {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test raffle/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga sin mostrar el título', () => {
    render(<RaffleMain {...defaultProps} loading={true} />);

    const titleElement = screen.queryByRole('heading', { name: /test raffle/i });
    expect(titleElement).not.toBeInTheDocument();
  });

  it('muestra el título correctamente', () => {
    render(<RaffleMain {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /test raffle/i });
    expect(titleElement).toBeInTheDocument();
  });
});
