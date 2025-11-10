import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import TicketGridFilter from './TicketGridFilter';
import { SortOrder } from '@/types';

describe('<TicketGridFilter />', () => {
  const mockOnSort = jest.fn();
  const mockSetIsRandomTickets = jest.fn();

  const defaultProps = {
    sortOrder: 'asc' as SortOrder,
    onSort: mockOnSort,
    isRandomTickets: false,
    setIsRandomTickets: mockSetIsRandomTickets,
  };

  beforeEach(() => {
    mockOnSort.mockClear();
    mockSetIsRandomTickets.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<TicketGridFilter {...defaultProps} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
    expect(screen.getByText('Ordenar:')).toBeInTheDocument();
  });

  it('muestra "Modo Manual" cuando isRandomTickets es false', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={false} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
  });

  it('muestra "Modo Aleatorio" cuando isRandomTickets es true', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={true} />);

    expect(screen.getByText('Modo Aleatorio')).toBeInTheDocument();
  });

  it('llama a setIsRandomTickets con el valor inverso al hacer clic en el botón de modo', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={false} />);

    const modeButton = screen.getByText('Modo Manual').closest('button');
    if (modeButton) {
      fireEvent.click(modeButton);
      expect(mockSetIsRandomTickets).toHaveBeenCalledWith(true);
    }
  });

  it('llama a setIsRandomTickets con false cuando está en modo aleatorio', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={true} />);

    const modeButton = screen.getByText('Modo Aleatorio').closest('button');
    if (modeButton) {
      fireEvent.click(modeButton);
      expect(mockSetIsRandomTickets).toHaveBeenCalledWith(false);
    }
  });

  it('muestra el botón de ordenar cuando isRandomTickets es false', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={false} />);

    expect(screen.getByText('Ordenar:')).toBeInTheDocument();
  });

  it('llama a onSort cuando se hace clic en el botón de ordenar', () => {
    render(<TicketGridFilter {...defaultProps} isRandomTickets={false} />);

    const sortButton = screen.getByText('Ordenar:').closest('button');
    if (sortButton) {
      fireEvent.click(sortButton);
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    }
  });

  it('aplica la clase rotate-180 al icono cuando sortOrder es desc', () => {
    render(<TicketGridFilter {...defaultProps} sortOrder="desc" isRandomTickets={false} />);

    const sortIcon = screen.getByText('Ordenar:').closest('button')?.querySelector('[class*="rotate-180"]');
    expect(sortIcon).toBeInTheDocument();
  });

  it('maneja correctamente el cambio entre modo aleatorio y manual', () => {
    const { rerender } = render(<TicketGridFilter {...defaultProps} isRandomTickets={false} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
    expect(screen.getByText('Ordenar:')).toBeInTheDocument();

    rerender(<TicketGridFilter {...defaultProps} isRandomTickets={true} />);

    expect(screen.getByText('Modo Aleatorio')).toBeInTheDocument();
    expect(screen.queryByText('Ordenar:')).not.toBeInTheDocument();
  });
});
