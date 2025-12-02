import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import BoardButton from './BoardButton';
import { Board, BoardStatus } from '@riffy/types';

describe('<BoardButton />', () => {
  const board: Board = {
    id: '1',
    number: '123456',
    status: BoardStatus.AVAILABLE,
  } as Board;

  const defaultProps = {
    board,
    isSelected: false,
    isNotAvailable: false,
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    (defaultProps.onSelect as jest.Mock).mockClear();
  });

  it('renderiza correctamente el botón de board', () => {
    render(<BoardButton {...defaultProps} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('llama a onSelect con el board al hacer clic cuando está habilitado', () => {
    render(<BoardButton {...defaultProps} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    fireEvent.click(buttonElement);

    expect(defaultProps.onSelect).toHaveBeenCalledTimes(1);
    expect(defaultProps.onSelect).toHaveBeenCalledWith(board);
  });

  it('no llama a onSelect cuando el botón está deshabilitado (isNotAvailable)', () => {
    render(<BoardButton {...defaultProps} isNotAvailable={true} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);
    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  it('aplica las clases de seleccionado cuando isSelected es true', () => {
    render(<BoardButton {...defaultProps} isSelected={true} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    expect(buttonElement).toHaveClass('bg-primary-500');
    expect(buttonElement).toHaveClass('text-white');
  });

  it('aplica las clases por defecto cuando no está seleccionado ni vendido', () => {
    render(<BoardButton {...defaultProps} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    expect(buttonElement).toHaveClass('bg-box-secondary');
    expect(buttonElement).toHaveClass('text-body-100');
  });

  it('aplica las clases de vendido y deshabilita cuando isNotAvailable es true', () => {
    render(<BoardButton {...defaultProps} isNotAvailable={true} />);

    const buttonElement = screen.getByRole('button', { name: /123456/i });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveClass('bg-primary');
    expect(buttonElement).toHaveClass('text-body-100');
    expect(buttonElement).toHaveClass('line-through');
    expect(buttonElement).toHaveClass('cursor-not-allowed');
  });
});
