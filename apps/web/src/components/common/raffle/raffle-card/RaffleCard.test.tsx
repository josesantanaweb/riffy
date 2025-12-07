import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import RaffleCard from './RaffleCard';
import { Raffle, RaffleStatus } from '@riffy/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../raffle-progress', () => {
  return function MockRaffleProgress() {
    return <div data-testid="raffle-progress">Mock Progress</div>;
  };
});

jest.mock('../raffle-banner', () => {
  return function MockRaffleBanner() {
    return <div data-testid="raffle-banner">Mock Banner</div>;
  };
});

jest.mock('../raffle-title', () => {
  return function MockRaffleTitle() {
    return <h2 data-testid="raffle-title">Mock Title</h2>;
  };
});

jest.mock('@riffy/components', () => ({
  Button: ({ children, onClick, variant }: { children: React.ReactNode; onClick: () => void; variant: string }) => (
    <button onClick={onClick} data-variant={variant} data-testid="button">
      {children}
    </button>
  ),
  Icon: ({ name }: { name: string }) => <span data-testid="icon">{name}</span>,
}));

describe('<RaffleCard />', () => {
  const mockPush = jest.fn();
  const mockRaffle: Raffle = {
    id: 'test-raffle-id',
    title: 'Test Raffle',
    banner: 'test-banner.jpg',
    totalTickets: 100,
    award: 1000,
    price: 10,
    showDate: true,
    showProgress: true,
    minTickets: 1,
    drawDate: '2024-12-31T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    sold: 50,
    available: 50,
    progress: 50,
    tickets: [],
    owner: null,
    status: RaffleStatus.ACTIVE,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<RaffleCard raffle={mockRaffle} loading={false} />);

    expect(screen.getByTestId('raffle-title')).toBeInTheDocument();
    expect(screen.getByTestId('raffle-banner')).toBeInTheDocument();
    expect(screen.getByText('Comprar boleto')).toBeInTheDocument();
    expect(screen.getByText('Verificar boleto')).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga', () => {
    render(<RaffleCard raffle={mockRaffle} loading={true} />);

    expect(screen.getByTestId('raffle-title')).toBeInTheDocument();
    expect(screen.getByTestId('raffle-banner')).toBeInTheDocument();
  });

  it('muestra el progreso cuando showProgress es true', () => {
    render(<RaffleCard raffle={mockRaffle} loading={false} />);

    expect(screen.getByTestId('raffle-progress')).toBeInTheDocument();
  });

  it('no muestra el botón de comprar boleto cuando la rifa está completada', () => {
    const completedRaffle = { ...mockRaffle, status: RaffleStatus.COMPLETED };
    render(<RaffleCard raffle={completedRaffle} loading={false} />);

    expect(screen.queryByText('Comprar boleto')).not.toBeInTheDocument();
    expect(screen.getByText('Verificar boleto')).toBeInTheDocument();
  });


  it('navega correctamente al hacer clic en "Comprar boleto"', () => {
    render(<RaffleCard raffle={mockRaffle} loading={false} />);

    const buyButton = screen.getByText('Comprar boleto');
    fireEvent.click(buyButton);

    expect(mockPush).toHaveBeenCalledWith('/raffles/test-raffle-id');
  });

  it('navega correctamente al hacer clic en "Verificar boleto"', () => {
    render(<RaffleCard raffle={mockRaffle} loading={false} />);

    const verifyButton = screen.getByText('Verificar boleto');
    fireEvent.click(verifyButton);

    expect(mockPush).toHaveBeenCalledWith('/raffles/test-raffle-id/verify-ticket');
  });

  it('no muestra el progreso cuando showProgress es false', () => {
    const raffleWithoutProgress = { ...mockRaffle, showProgress: false };
    render(<RaffleCard raffle={raffleWithoutProgress} loading={false} />);

    expect(screen.queryByTestId('raffle-progress')).not.toBeInTheDocument();
  });
});
