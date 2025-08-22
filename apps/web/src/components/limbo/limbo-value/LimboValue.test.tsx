import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import LimboValue from './LimboValue';
import { ResultEnum } from '@/types';

describe('<LimboValue />', () => {
  it('renders the value with "x" suffix correctly', () => {
    render(<LimboValue value="2.0" result={null} />);

    const valueElement = screen.getByRole('heading', { level: 1 });
    expect(valueElement).toBeInTheDocument();
    expect(valueElement).toHaveTextContent('2.0x');
  });

  it('applies default white text color when result is null', () => {
    render(<LimboValue value="2.0" result={null} />);

    const valueElement = screen.getByRole('heading', { level: 1 });
    expect(valueElement).toHaveClass('text-white');
  });

  it('applies green text color when result is WIN', () => {
    render(<LimboValue value="2.0" result={ResultEnum.WIN} />);
    // screen.debug();

    const valueElement = screen.getByRole('heading', { level: 1 });
    expect(valueElement).toHaveClass('text-green-500');
  });

  it('applies red text color when result is LOSE', () => {
    render(<LimboValue value="1.2" result={ResultEnum.LOSE} />);

    const valueElement = screen.getByRole('heading', { level: 1 });
    expect(valueElement).toHaveClass('text-red-500');
  });
});
