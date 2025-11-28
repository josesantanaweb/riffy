import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import BingosEmpty from './BingosEmpty';

describe('<BingosEmpty />', () => {

  it('renderiza correctamente', () => {
    render(<BingosEmpty />);

    const titleElement = screen.getByText(/no tienes ninguna rifa creada/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByText(/ve al panel de administración y crea tu priemera rifa/i);
    expect(descriptionElement).toBeInTheDocument();
  });
});
