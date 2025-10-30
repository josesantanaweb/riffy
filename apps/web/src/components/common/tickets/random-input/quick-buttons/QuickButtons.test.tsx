import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import QuickButtons from './QuickButtons';

describe('<QuickButtons />', () => {
  const mockSetTicketsQuantity = jest.fn();

  const defaultProps = {
    ticketsQuantity: 1,
    setTicketsQuantity: mockSetTicketsQuantity,
    maxTickets: 100,
  };

  beforeEach(() => {
    mockSetTicketsQuantity.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<QuickButtons {...defaultProps} />);

    expect(screen.getByText('2 Tickets')).toBeInTheDocument();
    expect(screen.getByText('5 Tickets')).toBeInTheDocument();
    expect(screen.getByText('10 Tickets')).toBeInTheDocument();
  });

  it('renderiza todos los botones rápidos', () => {
    render(<QuickButtons {...defaultProps} />);

    expect(screen.getByText('2 Tickets')).toBeInTheDocument();
    expect(screen.getByText('5 Tickets')).toBeInTheDocument();
    expect(screen.getByText('10 Tickets')).toBeInTheDocument();
  });

  it('aplica la variante primary al botón seleccionado', () => {
    render(<QuickButtons {...defaultProps} ticketsQuantity={5} />);

    const selectedButton = screen.getByText('5 Tickets');
    expect(selectedButton).toBeInTheDocument();

    expect(selectedButton).not.toBeDisabled();
  });

  it('aplica la variante default a los botones no seleccionados', () => {
    render(<QuickButtons {...defaultProps} ticketsQuantity={5} />);

    const button2 = screen.getByText('2 Tickets');
    const button10 = screen.getByText('10 Tickets');

    expect(button2).toBeInTheDocument();
    expect(button10).toBeInTheDocument();
  });

  it('llama a setTicketsQuantity con el valor correcto al hacer clic en cada botón', () => {
    render(<QuickButtons {...defaultProps} />);

    const button2 = screen.getByText('2 Tickets');
    fireEvent.click(button2);
    expect(mockSetTicketsQuantity).toHaveBeenCalledWith(2);

    const button5 = screen.getByText('5 Tickets');
    fireEvent.click(button5);
    expect(mockSetTicketsQuantity).toHaveBeenCalledWith(5);

    const button10 = screen.getByText('10 Tickets');
    fireEvent.click(button10);
    expect(mockSetTicketsQuantity).toHaveBeenCalledWith(10);
  });

  it('deshabilita botones que exceden el maxTickets', () => {
    render(<QuickButtons {...defaultProps} maxTickets={3} />);

    const button2 = screen.getByText('2 Tickets');
    const button5 = screen.getByText('5 Tickets');
    const button10 = screen.getByText('10 Tickets');

    expect(button2).not.toBeDisabled();
    expect(button5).toBeDisabled();
    expect(button10).toBeDisabled();
  });

  it('no deshabilita ningún botón cuando maxTickets es mayor que todos los valores', () => {
    render(<QuickButtons {...defaultProps} maxTickets={50} />);

    const button2 = screen.getByText('2 Tickets');
    const button5 = screen.getByText('5 Tickets');
    const button10 = screen.getByText('10 Tickets');

    expect(button2).not.toBeDisabled();
    expect(button5).not.toBeDisabled();
    expect(button10).not.toBeDisabled();
  });

  it('no llama a setTicketsQuantity cuando se hace clic en botones deshabilitados', () => {
    render(<QuickButtons {...defaultProps} maxTickets={3} />);

    const button5 = screen.getByText('5 Tickets');
    const button10 = screen.getByText('10 Tickets');

    mockSetTicketsQuantity.mockClear();

    fireEvent.click(button5);
    fireEvent.click(button10);

    expect(mockSetTicketsQuantity).not.toHaveBeenCalled();
  });

  it('usa maxTickets por defecto de 100 cuando no se proporciona', () => {
    render(<QuickButtons {...defaultProps} maxTickets={undefined} />);

    const button2 = screen.getByText('2 Tickets');
    const button5 = screen.getByText('5 Tickets');
    const button10 = screen.getByText('10 Tickets');

    expect(button2).not.toBeDisabled();
    expect(button5).not.toBeDisabled();
    expect(button10).not.toBeDisabled();
  });
});
