import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Board from './Board';
import { BoardStatus, Board as IBoard, Bingo, Payment } from '@riffy/types';

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

jest.mock('@riffy/utils', () => ({
  formatDate: (dateString?: string) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-ES');
  },
  ...jest.requireActual('@riffy/utils'),
}));

describe('<Board />', () => {
  const mockBingo: Bingo = {
    id: 'bingo-1',
    title: 'Test Bingo',
    banner: 'https://example.com/banner.jpg',
    totalBoards: 100,
    award: 1000,
    price: 10,
    owner: null,
  } as Bingo;

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

  const defaultBoard: IBoard = {
    id: 'board-1',
    number: '123456',
    status: BoardStatus.AVAILABLE,
    payment: mockPayment,
    bingo: mockBingo,
  } as IBoard;

  it('renderiza correctamente con props por defecto', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('Test Bingo')).toBeInTheDocument();
    expect(screen.getByText('#123456')).toBeInTheDocument();
  });

  it('muestra el número del board correctamente', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('#123456')).toBeInTheDocument();
  });

  it('muestra el título de la rifa correctamente', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('Test Bingo')).toBeInTheDocument();
  });

  it('muestra los datos del pago cuando están disponibles', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('muestra el estado "Disponible" cuando el board está disponible', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });

  it('muestra el estado "Pendiente" cuando el board está vendido', () => {
    const soldBoard = { ...defaultBoard, status: BoardStatus.SOLD };
    render(<Board board={soldBoard} bingo={mockBingo} />);

    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('muestra el estado "Ganador" cuando el board es ganador', () => {
    const winnerBoard = { ...defaultBoard, status: BoardStatus.WINNER };
    render(<Board board={winnerBoard} bingo={mockBingo} />);

    expect(screen.getByText('Ganador')).toBeInTheDocument();
  });

  it('muestra el estado "Perdedor" cuando el board es perdedor', () => {
    const loserBoard = { ...defaultBoard, status: BoardStatus.LOSER };
    render(<Board board={loserBoard} bingo={mockBingo} />);

    expect(screen.getByText('Perdedor')).toBeInTheDocument();
  });

  it('muestra el estado "Premium" cuando el board es premium', () => {
    const premiumBoard = { ...defaultBoard, status: BoardStatus.PREMIUM };
    render(<Board board={premiumBoard} bingo={mockBingo} />);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('muestra "Rifa no disponible" cuando no hay título de rifa', () => {
    const bingoWithoutTitle = { ...mockBingo, title: '' };
    render(<Board board={defaultBoard} bingo={bingoWithoutTitle} />);

    expect(screen.getByText('Rifa no disponible')).toBeInTheDocument();
  });

  it('muestra la fecha de compra formateada', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    expect(screen.getByText('Fecha de compra:')).toBeInTheDocument();
  });

  it('muestra la imagen del banner de la rifa', () => {
    render(<Board board={defaultBoard} bingo={mockBingo} />);

    const bannerImage = screen.getByAltText('Test Bingo');
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', 'https://example.com/banner.jpg');
  });

  it('maneja correctamente estados en minúsculas', () => {
    const lowercaseBoard = { ...defaultBoard, status: 'winner' };
    render(<Board board={lowercaseBoard} bingo={mockBingo} />);

    expect(screen.getByText('Ganador')).toBeInTheDocument();
  });
});
