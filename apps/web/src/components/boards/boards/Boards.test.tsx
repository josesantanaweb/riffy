import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Boards from './Boards';
import { BoardStatus, Board as IBoard, Bingo, Payment } from '@riffy/types';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
}));

jest.mock('../board', () => {
  return function MockBoard({ board, bingo }: { board: IBoard; bingo: Bingo }) {
    return (
      <div data-testid={`board-${board.id}`}>
        <div>Board #{board.number}</div>
        <div>Bingo: {bingo.title}</div>
      </div>
    );
  };
});

describe('<Boards />', () => {
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

  const createBoard = (id: string, number: string): IBoard => ({
    id,
    number,
    status: BoardStatus.AVAILABLE,
    payment: mockPayment,
    bingo: mockBingo,
  } as IBoard);

  it('renderiza múltiples boards correctamente', () => {
    const boards = [
      createBoard('board-1', '123456'),
      createBoard('board-2', '123457'),
      createBoard('board-3', '123458'),
    ];

    render(<Boards boards={boards} bingo={mockBingo} />);

    expect(screen.getByTestId('board-board-1')).toBeInTheDocument();
    expect(screen.getByTestId('board-board-2')).toBeInTheDocument();
    expect(screen.getByTestId('board-board-3')).toBeInTheDocument();
  });

  it('muestra el título de la rifa en cada board', () => {
    const boards = [
      createBoard('board-1', '123456'),
      createBoard('board-2', '123457'),
    ];

    render(<Boards boards={boards} bingo={mockBingo} />);

    const bingoTitles = screen.getAllByText('Bingo: Test Bingo');
    expect(bingoTitles).toHaveLength(2);
  });

  it('renderiza correctamente con lista vacía', () => {
    render(<Boards boards={[]} bingo={mockBingo} />);

    expect(screen.queryByTestId(/board-/)).not.toBeInTheDocument();
  });

  it('renderiza todos los números de board correctamente', () => {
    const boards = [
      createBoard('board-1', '123456'),
      createBoard('board-2', '123457'),
      createBoard('board-3', '123458'),
    ];

    render(<Boards boards={boards} bingo={mockBingo} />);

    expect(screen.getByText('Board #123456')).toBeInTheDocument();
    expect(screen.getByText('Board #123457')).toBeInTheDocument();
    expect(screen.getByText('Board #123458')).toBeInTheDocument();
  });

  it('maneja correctamente boards con diferentes estados', () => {
    const boards = [
      { ...createBoard('board-1', '123456'), status: BoardStatus.AVAILABLE },
      { ...createBoard('board-2', '123457'), status: BoardStatus.WINNER },
      { ...createBoard('board-3', '123458'), status: BoardStatus.SOLD },
    ] as IBoard[];

    render(<Boards boards={boards} bingo={mockBingo} />);

    expect(screen.getByTestId('board-board-1')).toBeInTheDocument();
    expect(screen.getByTestId('board-board-2')).toBeInTheDocument();
    expect(screen.getByTestId('board-board-3')).toBeInTheDocument();
  });
});
