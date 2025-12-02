import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import BoardPagination from './BoardPagination';

describe('<BoardPagination />', () => {
  const mockOnPrevPage = jest.fn();
  const mockOnNextPage = jest.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    totalBoards: 50,
    onPrevPage: mockOnPrevPage,
    onNextPage: mockOnNextPage,
  };

  beforeEach(() => {
    mockOnPrevPage.mockClear();
    mockOnNextPage.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<BoardPagination {...defaultProps} />);

    expect(screen.getByText('Página 1 de 5')).toBeInTheDocument();
    expect(screen.getByText('Total: 50')).toBeInTheDocument();
  });

  it('muestra la página actual y total de páginas correctamente', () => {
    render(<BoardPagination {...defaultProps} currentPage={3} totalPages={10} />);

    expect(screen.getByText('Página 3 de 10')).toBeInTheDocument();
  });

  it('muestra el total de boards correctamente', () => {
    render(<BoardPagination {...defaultProps} totalBoards={100} />);

    expect(screen.getByText('Total: 100')).toBeInTheDocument();
  });

  it('deshabilita el botón anterior cuando está en la primera página', () => {
    render(<BoardPagination {...defaultProps} currentPage={1} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];

    expect(prevButton).toBeDisabled();
  });

  it('deshabilita el botón siguiente cuando está en la última página', () => {
    render(<BoardPagination {...defaultProps} currentPage={5} totalPages={5} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];

    expect(nextButton).toBeDisabled();
  });

  it('habilita ambos botones cuando está en una página del medio', () => {
    render(<BoardPagination {...defaultProps} currentPage={3} totalPages={5} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });

  it('llama a onNextPage cuando se hace clic en el botón siguiente', () => {
    render(<BoardPagination {...defaultProps} currentPage={2} />);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];

    fireEvent.click(nextButton);

    expect(mockOnNextPage).toHaveBeenCalledTimes(1);
  });

  it('llama a onPrevPage cuando se hace clic en el botón anterior', () => {
    render(<BoardPagination {...defaultProps} currentPage={2} />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];

    fireEvent.click(prevButton);

    expect(mockOnPrevPage).toHaveBeenCalledTimes(1);
  });

  it('renderiza correctamente con una sola página', () => {
    render(<BoardPagination {...defaultProps} currentPage={1} totalPages={1} />);

    expect(screen.getByText('Página 1 de 1')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it('maneja correctamente diferentes valores de totalBoards', () => {
    const { rerender } = render(<BoardPagination {...defaultProps} totalBoards={0} />);
    expect(screen.getByText('Total: 0')).toBeInTheDocument();

    rerender(<BoardPagination {...defaultProps} totalBoards={1000} />);
    expect(screen.getByText('Total: 1000')).toBeInTheDocument();
  });
});
