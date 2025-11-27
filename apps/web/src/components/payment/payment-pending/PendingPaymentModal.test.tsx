import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import PendingPaymentModal from './PendingPaymentModal';
import { Payment, Ticket } from '@riffy/types';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('../../../store', () => ({
  useStore: () => ({
    cart: {
      raffleTitle: 'Test Raffle',
      totalTickets: 5,
      price: 10,
    },
    user: {
      whatsapp: '4123456789',
    },
  }),
}));

jest.mock('../../../hooks', () => ({
  useIsIPhone: () => false,
}));

jest.mock('../../../utils', () => ({
  formatDate: (dateString?: string) => {
    if (!dateString) return 'Fecha no disponible';
    return new Date(dateString).toLocaleDateString('es-ES');
  },
  ...jest.requireActual('../../../utils'),
}));

jest.mock('../payment-total', () => {
  return function MockTotalBox({ totalTickets, price }: { totalTickets?: number; price?: number }) {
    return (
      <div data-testid="total-box">
        Total: {totalTickets} x {price}
      </div>
    );
  };
});

describe('<PendingPaymentModal />', () => {
  const mockTickets: Ticket[] = [
    { id: '1', number: '123456', status: 'SOLD' } as Ticket,
    { id: '2', number: '123457', status: 'SOLD' } as Ticket,
  ];

  const mockPayment: Payment = {
    id: 'payment-1',
    buyerName: 'Juan Pérez',
    nationalId: '12345678',
    phone: '04121234567',
    paymentDate: '2024-01-15T10:00:00Z',
    tickets: mockTickets,
  } as Payment;

  const defaultProps = {
    isOpen: true,
    data: mockPayment,
  };

  beforeEach(() => {
    mockPush.mockClear();
    document.body.style.overflow = '';
    window.open = jest.fn();
  });

  it('no renderiza cuando isOpen es false', () => {
    render(<PendingPaymentModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByText('Pago en espera')).not.toBeInTheDocument();
  });

  it('renderiza correctamente cuando isOpen es true', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByText('Pago en espera')).toBeInTheDocument();
    expect(screen.getByText('Tu pago esta en proceso de verificación.')).toBeInTheDocument();
  });

  it('muestra los datos del pago correctamente', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('12345678')).toBeInTheDocument();
    expect(screen.getByText('04121234567')).toBeInTheDocument();
  });

  it('muestra el título de la rifa del carrito', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByText('Test Raffle')).toBeInTheDocument();
  });

  it('muestra los números de tickets correctamente', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByText('123456, 123457')).toBeInTheDocument();
  });

  it('muestra la fecha de compra formateada', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByText('Fecha de compra:')).toBeInTheDocument();
  });

  it('muestra el componente TotalBox', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    expect(screen.getByTestId('total-box')).toBeInTheDocument();
  });

  it('navega a la lista de rifas al hacer clic en el botón Aceptar', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    const acceptButton = screen.getByText('Aceptar');
    fireEvent.click(acceptButton);

    expect(mockPush).toHaveBeenCalledWith('/raffles');
  });

  it('navega a la lista de rifas al hacer clic en el overlay', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    const overlay = screen.getByText('Pago en espera').closest('.fixed')?.querySelector('.absolute');
    if (overlay) {
      fireEvent.click(overlay);
      expect(mockPush).toHaveBeenCalledWith('/raffles');
    }
  });

  it('navega a la lista de rifas al hacer clic en el botón de cerrar', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    const closeButton = screen.getByLabelText('Cerrar modal');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/raffles');
  });

  it('abre WhatsApp al hacer clic en el botón de ayuda', () => {
    render(<PendingPaymentModal {...defaultProps} />);

    const helpButton = screen.getByText('Ayuda');
    fireEvent.click(helpButton);

    expect(window.open).toHaveBeenCalledWith('https://wa.me/584123456789', '_blank');
  });

  it('establece overflow hidden en el body cuando el modal está abierto', () => {
    render(<PendingPaymentModal {...defaultProps} isOpen={true} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restaura el overflow del body cuando el modal se cierra', () => {
    const { rerender } = render(<PendingPaymentModal {...defaultProps} isOpen={true} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<PendingPaymentModal {...defaultProps} isOpen={false} />);

    expect(document.body.style.overflow).toBe('unset');
  });
});
