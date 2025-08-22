import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import MultiplierHistory, { IMultiplierHistory } from './MultiplierHistory';
import { ResultEnum } from '@/types/common';

describe('<MultiplierHistory />', () => {
  it('shows the last 5 multipliers in natural order', () => {
    const history: IMultiplierHistory[] = [
      { value: 2, result: ResultEnum.WIN },
      { value: 0, result: ResultEnum.LOSE },
      { value: 1.5, result: ResultEnum.WIN },
      { value: 1, result: ResultEnum.LOSE },
      { value: 3, result: ResultEnum.WIN },
      { value: 0.5, result: ResultEnum.LOSE },
    ];
    render(<MultiplierHistory multiplierHistory={history} />);
    const items = screen.getAllByText(/x[\d.]+/);
    expect(items).toHaveLength(5);
    expect(items[0]).toHaveTextContent('x0.00');
    expect(items[1]).toHaveTextContent('x1.50');
    expect(items[2]).toHaveTextContent('x1.00');
    expect(items[3]).toHaveTextContent('x3.00');
    expect(items[4]).toHaveTextContent('x0.50');
  });

  it('applies the correct color based on result', () => {
    const history: IMultiplierHistory[] = [
      { value: 2, result: ResultEnum.WIN },
      { value: 0, result: ResultEnum.LOSE },
    ];
    render(<MultiplierHistory multiplierHistory={history} />);
    const winItem = screen.getByText('x2.00');
    const loseItem = screen.getByText('x0.00');
    expect(winItem).toHaveClass('bg-green-500');
    expect(loseItem).toHaveClass('bg-base-600');
  });

  it('formats the value to two decimals', () => {
    const history: IMultiplierHistory[] = [
      { value: 1.23456, result: ResultEnum.WIN },
    ];
    render(<MultiplierHistory multiplierHistory={history} />);
    expect(screen.getByText('x1.23')).toBeInTheDocument();
  });

  it('renders nothing if there is no history', () => {
    render(<MultiplierHistory multiplierHistory={[]} />);
    expect(screen.queryByText(/x/)).not.toBeInTheDocument();
  });
});
