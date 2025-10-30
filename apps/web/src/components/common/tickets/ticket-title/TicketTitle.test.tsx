import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TicketTitle from './TicketTitle';

describe('<TicketTitle />', () => {
  const defaultProps = {
    isRandomTickets: false,
  };

  it('renderiza correctamente cuando no son tickets aleatorios', () => {
    render(<TicketTitle {...defaultProps} />);

    const titleElement = screen.getByRole('heading', { name: /lista de tickets/i });
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByText(/seleccione los números de la rifa/i);
    expect(subtitleElement).toBeInTheDocument();
  });

  it('renderiza correctamente cuando son tickets aleatorios', () => {
    render(<TicketTitle {...defaultProps} isRandomTickets={true} />);

    const titleElement = screen.getByRole('heading', { name: /número de tickets/i });
    expect(titleElement).toBeInTheDocument();
    const subtitleElement = screen.getByText(/seleccione la cantidad de tickets/i);
    expect(subtitleElement).toBeInTheDocument();
  });
});
