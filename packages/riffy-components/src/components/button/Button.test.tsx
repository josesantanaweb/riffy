import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Button from './Button';

jest.mock('@riffy/utils', () => ({
  cn: jest.fn((...inputs: unknown[]) => {
    return inputs.filter(Boolean).join(' ');
  }),
}));

describe('<Button />', () => {
  it('renders the children correctly', () => {
    render(<Button>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('applies the default type if no type is provided', () => {
    render(<Button>Default Type</Button>);

    const buttonElement = screen.getByRole('button', { name: /default type/i });
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  it('applies the correct type when provided', () => {
    render(<Button type="submit">Submit</Button>);

    const buttonElement = screen.getByRole('button', { name: /submit/i });
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('calls the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
