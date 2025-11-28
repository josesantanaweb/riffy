import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import TotalBox from './PaymentTotal';

describe('<TotalBox />', () => {
  const defaultProps = {
    totalBoards: 10,
    price: 100,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<TotalBox {...defaultProps} />);

    expect(screen.getByText('Cantidad')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Precio por board')).toBeInTheDocument();
    expect(screen.getByText('Bs 100.00')).toBeInTheDocument();
    expect(screen.getByText('Total a pagar')).toBeInTheDocument();
    expect(screen.getByText('Bs 1000.00')).toBeInTheDocument();
  });

  it('muestra el total correcto cuando hay múltiples boards', () => {
    render(<TotalBox totalBoards={5} price={50} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Bs 50.00')).toBeInTheDocument();
    expect(screen.getByText('Bs 250.00')).toBeInTheDocument();
  });

  it('maneja correctamente cuando totalBoards es 0', () => {
    render(<TotalBox totalBoards={0} price={100} />);

    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Bs 100.00')).toBeInTheDocument();
    expect(screen.getByText('Bs 0.00')).toBeInTheDocument();
  });

  it('muestra valores con decimales correctamente', () => {
    render(<TotalBox totalBoards={3} price={33.33} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Bs 33.33')).toBeInTheDocument();
    expect(screen.getByText('Bs 99.99')).toBeInTheDocument();
  });
});
