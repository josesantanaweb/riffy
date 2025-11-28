import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

import BingoCard from './BingoCard';
import { Bingo, BingoStatus } from '@riffy/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../bingo-alert', () => {
  return function MockBingoAlert() {
    return <div data-testid="bingo-alert">Mock Alert</div>;
  };
});

jest.mock('../bingo-progress', () => {
  return function MockBingoProgress() {
    return <div data-testid="bingo-progress">Mock Progress</div>;
  };
});

jest.mock('../bingo-banner', () => {
  return function MockBingoBanner() {
    return <div data-testid="bingo-banner">Mock Banner</div>;
  };
});

jest.mock('../bingo-title', () => {
  return function MockBingoTitle() {
    return <h2 data-testid="bingo-title">Mock Title</h2>;
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

describe('<BingoCard />', () => {
  const mockPush = jest.fn();
  const mockBingo: Bingo = {
    id: 'test-bingo-id',
    title: 'Test Bingo',
    description: 'Test Description',
    banner: 'test-banner.jpg',
    totalBoards: 100,
    award: 1000,
    price: 10,
    showDate: true,
    showProgress: true,
    minBoards: 1,
    drawnNumbers: [],
    drawDate: '2024-12-31T00:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    sold: 50,
    available: 50,
    progress: 50,
    boards: [],
    owner: null,
    status: BingoStatus.ACTIVE,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<BingoCard bingo={mockBingo} loading={false} />);

    expect(screen.getByTestId('bingo-title')).toBeInTheDocument();
    expect(screen.getByTestId('bingo-banner')).toBeInTheDocument();
    expect(screen.getByText('Comprar boleto')).toBeInTheDocument();
    expect(screen.getByText('Verificar boleto')).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga', () => {
    render(<BingoCard bingo={mockBingo} loading={true} />);

    expect(screen.getByTestId('bingo-title')).toBeInTheDocument();
    expect(screen.getByTestId('bingo-banner')).toBeInTheDocument();
  });

  it('muestra el alert cuando showDate es true', () => {
    render(<BingoCard bingo={mockBingo} loading={false} />);

    expect(screen.getByTestId('bingo-alert')).toBeInTheDocument();
  });

  it('muestra el progreso cuando showProgress es true', () => {
    render(<BingoCard bingo={mockBingo} loading={false} />);

    expect(screen.getByTestId('bingo-progress')).toBeInTheDocument();
  });

  it('no muestra el botón de comprar boleto cuando la rifa está completada', () => {
    const completedBingo = { ...mockBingo, status: BingoStatus.COMPLETED };
    render(<BingoCard bingo={completedBingo} loading={false} />);

    expect(screen.queryByText('Comprar boleto')).not.toBeInTheDocument();
    expect(screen.getByText('Verificar boleto')).toBeInTheDocument();
  });


  it('navega correctamente al hacer clic en "Comprar boleto"', () => {
    render(<BingoCard bingo={mockBingo} loading={false} />);

    const buyButton = screen.getByText('Comprar boleto');
    fireEvent.click(buyButton);

    expect(mockPush).toHaveBeenCalledWith('/bingos/test-bingo-id');
  });

  it('navega correctamente al hacer clic en "Verificar boleto"', () => {
    render(<BingoCard bingo={mockBingo} loading={false} />);

    const verifyButton = screen.getByText('Verificar boleto');
    fireEvent.click(verifyButton);

    expect(mockPush).toHaveBeenCalledWith('/bingos/test-bingo-id/verify-board');
  });

  it('no muestra el alert de fecha cuando showDate es false', () => {
    const bingoWithoutDate = { ...mockBingo, showDate: false };
    render(<BingoCard bingo={bingoWithoutDate} loading={false} />);

    expect(screen.queryByTestId('bingo-alert')).not.toBeInTheDocument();
  });

  it('no muestra el progreso cuando showProgress es false', () => {
    const bingoWithoutProgress = { ...mockBingo, showProgress: false };
    render(<BingoCard bingo={bingoWithoutProgress} loading={false} />);

    expect(screen.queryByTestId('bingo-progress')).not.toBeInTheDocument();
  });
});
