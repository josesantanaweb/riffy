import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import BoardGridFilter from './BoardGridFilter';
import { SortOrder } from '@/types';

describe('<BoardGridFilter />', () => {
  const mockOnSort = jest.fn();
  const mockSetIsRandomBoards = jest.fn();

  const defaultProps = {
    sortOrder: 'asc' as SortOrder,
    onSort: mockOnSort,
    isRandomBoards: false,
    setIsRandomBoards: mockSetIsRandomBoards,
  };

  beforeEach(() => {
    mockOnSort.mockClear();
    mockSetIsRandomBoards.mockClear();
  });

  it('renderiza correctamente con props por defecto', () => {
    render(<BoardGridFilter {...defaultProps} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
    expect(screen.getByText('Ordenar:')).toBeInTheDocument();
  });

  it('muestra "Modo Manual" cuando isRandomBoards es false', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={false} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
  });

  it('muestra "Modo Aleatorio" cuando isRandomBoards es true', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={true} />);

    expect(screen.getByText('Modo Aleatorio')).toBeInTheDocument();
  });

  it('llama a setIsRandomBoards con el valor inverso al hacer clic en el botón de modo', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={false} />);

    const modeButton = screen.getByText('Modo Manual').closest('button');
    if (modeButton) {
      fireEvent.click(modeButton);
      expect(mockSetIsRandomBoards).toHaveBeenCalledWith(true);
    }
  });

  it('llama a setIsRandomBoards con false cuando está en modo aleatorio', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={true} />);

    const modeButton = screen.getByText('Modo Aleatorio').closest('button');
    if (modeButton) {
      fireEvent.click(modeButton);
      expect(mockSetIsRandomBoards).toHaveBeenCalledWith(false);
    }
  });

  it('muestra el botón de ordenar cuando isRandomBoards es false', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={false} />);

    expect(screen.getByText('Ordenar:')).toBeInTheDocument();
  });

  it('llama a onSort cuando se hace clic en el botón de ordenar', () => {
    render(<BoardGridFilter {...defaultProps} isRandomBoards={false} />);

    const sortButton = screen.getByText('Ordenar:').closest('button');
    if (sortButton) {
      fireEvent.click(sortButton);
      expect(mockOnSort).toHaveBeenCalledTimes(1);
    }
  });

  it('aplica la clase rotate-180 al icono cuando sortOrder es desc', () => {
    render(<BoardGridFilter {...defaultProps} sortOrder="desc" isRandomBoards={false} />);

    const sortIcon = screen.getByText('Ordenar:').closest('button')?.querySelector('[class*="rotate-180"]');
    expect(sortIcon).toBeInTheDocument();
  });

  it('maneja correctamente el cambio entre modo aleatorio y manual', () => {
    const { rerender } = render(<BoardGridFilter {...defaultProps} isRandomBoards={false} />);

    expect(screen.getByText('Modo Manual')).toBeInTheDocument();
    expect(screen.getByText('Ordenar:')).toBeInTheDocument();

    rerender(<BoardGridFilter {...defaultProps} isRandomBoards={true} />);

    expect(screen.getByText('Modo Aleatorio')).toBeInTheDocument();
    expect(screen.queryByText('Ordenar:')).not.toBeInTheDocument();
  });
});
