import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BoardTitle from './BoardTitle';

describe('<BoardTitle />', () => {
  const defaultProps = {
    isRandomBoards: false,
  };

  it('renderiza correctamente cuando no son boards aleatorios', () => {
    render(<BoardTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /lista de boards/i });
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByText(/seleccione los números de la rifa/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renderiza correctamente cuando son boards aleatorios', () => {
    render(<BoardTitle {...defaultProps} isRandomBoards={true} />);

    const titleElement = screen.getByRole('heading', { name: /número de boards/i });
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByText(/seleccione la cantidad de boards/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
