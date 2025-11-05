import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Tickets from './Tickets';
import { TicketStatus, Ticket as ITicket, Raffle, Payment } from '@riffy/types';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

jest.mock('../ticket', () => {
  return function MockTicket({ ticket, raffle }: { ticket: ITicket; raffle: Raffle }) {
    return (
      <div data-testid={`ticket-${ticket.id}`}>
        <div>Ticket #{ticket.number}</div>
        <div>Raffle: {raffle.title}</div>
      </div>
    );
  };
});

describe('<Tickets />', () => {
  const mockRaffle: Raffle = {
    id: 'raffle-1',
    title: 'Test Raffle',
    banner: 'https://example.com/banner.jpg',
    totalTickets: 100,
    award: 1000,
    price: 10,
    owner: null,
  } as Raffle;

  const mockPayment: Payment = {
    id: 'payment-1',
    buyerName: 'Juan Pérez',
    nationalId: '12345678',
    amount: 10,
    phone: '04121234567',
    state: 'Caracas',
    paymentDate: '2024-01-15T10:00:00Z',
    paymentMethod: 'PAGO_MOVIL',
    status: null,
  } as Payment;

  const createTicket = (id: string, number: string): ITicket => ({
    id,
    number,
    status: TicketStatus.AVAILABLE,
    payment: mockPayment,
    raffle: mockRaffle,
  } as ITicket);

  it('renderiza múltiples tickets correctamente', () => {
    const tickets = [
      createTicket('ticket-1', '123456'),
      createTicket('ticket-2', '123457'),
      createTicket('ticket-3', '123458'),
    ];

    render(<Tickets tickets={tickets} raffle={mockRaffle} />);

    expect(screen.getByTestId('ticket-ticket-1')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-ticket-2')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-ticket-3')).toBeInTheDocument();
  });

  it('muestra el título de la rifa en cada ticket', () => {
    const tickets = [
      createTicket('ticket-1', '123456'),
      createTicket('ticket-2', '123457'),
    ];

    render(<Tickets tickets={tickets} raffle={mockRaffle} />);

    const raffleTitles = screen.getAllByText('Raffle: Test Raffle');
    expect(raffleTitles).toHaveLength(2);
  });

  it('renderiza correctamente con lista vacía', () => {
    render(<Tickets tickets={[]} raffle={mockRaffle} />);

    expect(screen.queryByTestId(/ticket-/)).not.toBeInTheDocument();
  });

  it('renderiza todos los números de ticket correctamente', () => {
    const tickets = [
      createTicket('ticket-1', '123456'),
      createTicket('ticket-2', '123457'),
      createTicket('ticket-3', '123458'),
    ];

    render(<Tickets tickets={tickets} raffle={mockRaffle} />);

    expect(screen.getByText('Ticket #123456')).toBeInTheDocument();
    expect(screen.getByText('Ticket #123457')).toBeInTheDocument();
    expect(screen.getByText('Ticket #123458')).toBeInTheDocument();
  });

  it('maneja correctamente tickets con diferentes estados', () => {
    const tickets = [
      { ...createTicket('ticket-1', '123456'), status: TicketStatus.AVAILABLE },
      { ...createTicket('ticket-2', '123457'), status: TicketStatus.WINNER },
      { ...createTicket('ticket-3', '123458'), status: TicketStatus.SOLD },
    ] as ITicket[];

    render(<Tickets tickets={tickets} raffle={mockRaffle} />);

    expect(screen.getByTestId('ticket-ticket-1')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-ticket-2')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-ticket-3')).toBeInTheDocument();
  });
});
