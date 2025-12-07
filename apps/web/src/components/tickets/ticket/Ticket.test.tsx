import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Ticket from './Ticket';
import { TicketStatus, Ticket as ITicket, Raffle, Payment } from '@riffy/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className: string;
  }) => (
    <img src={src} alt={alt} width={width} height={height} className={className} />
  ),
}));

jest.mock('../../../store', () => ({
  useStore: () => ({
    user: {
      id: 'user-1',
      name: 'Test User',
      email: 'test@example.com',
      logo: 'https://example.com/logo.png',
    },
  }),
}));


describe('<Ticket />', () => {
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

  const defaultTicket: ITicket = {
    id: 'ticket-1',
    number: '123456',
    status: TicketStatus.AVAILABLE,
    payment: mockPayment,
    raffle: mockRaffle,
  } as ITicket;

  it('renderiza correctamente con props por defecto', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Test Raffle')).toBeInTheDocument();
    expect(screen.getByText('#123456')).toBeInTheDocument();
  });

  it('muestra el número del ticket correctamente', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('#123456')).toBeInTheDocument();
  });

  it('muestra el título de la rifa correctamente', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Test Raffle')).toBeInTheDocument();
  });

  it('muestra los datos del pago cuando están disponibles', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText(/15 (ene|Ene)/i)).toBeInTheDocument();
  });

  it('muestra el estado "Disponible" cuando el ticket está disponible', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });

  it('muestra el estado "Pendiente" cuando el ticket está vendido', () => {
    const soldTicket = { ...defaultTicket, status: TicketStatus.SOLD };
    render(<Ticket ticket={soldTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('muestra el estado "Ganador" cuando el ticket es ganador', () => {
    const winnerTicket = { ...defaultTicket, status: TicketStatus.WINNER };
    render(<Ticket ticket={winnerTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Ganador')).toBeInTheDocument();
  });

  it('muestra el estado "Perdedor" cuando el ticket es perdedor', () => {
    const loserTicket = { ...defaultTicket, status: TicketStatus.LOSER };
    render(<Ticket ticket={loserTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Perdedor')).toBeInTheDocument();
  });

  it('muestra el estado "Premium" cuando el ticket es premium', () => {
    const premiumTicket = { ...defaultTicket, status: TicketStatus.PREMIUM };
    render(<Ticket ticket={premiumTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('muestra "Rifa no disponible" cuando no hay título de rifa', () => {
    const raffleWithoutTitle = { ...mockRaffle, title: '' };
    render(<Ticket ticket={defaultTicket} raffle={raffleWithoutTitle} />);

    expect(screen.getByText('Rifa no disponible')).toBeInTheDocument();
  });

  it('muestra la fecha de compra formateada', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Fecha de compra:')).toBeInTheDocument();
  });

  it('muestra la imagen del banner de la rifa', () => {
    render(<Ticket ticket={defaultTicket} raffle={mockRaffle} />);

    const bannerImage = screen.getByAltText('Test Raffle');
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', 'https://example.com/banner.jpg');
  });

  it('maneja correctamente estados en minúsculas', () => {
    const lowercaseTicket = { ...defaultTicket, status: 'winner' };
    render(<Ticket ticket={lowercaseTicket} raffle={mockRaffle} />);

    expect(screen.getByText('Ganador')).toBeInTheDocument();
  });
});
