import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RafflesEmpty from './RafflesEmpty';

describe('<RafflesEmpty />', () => {

  it('renderiza correctamente', () => {
    render(<RafflesEmpty />);

    const titleElement = screen.getByText(/no tienes ninguna rifa creada/i);
    expect(titleElement).toBeInTheDocument();
    const descriptionElement = screen.getByText(/ve al panel de administración y crea tu priemera rifa/i);
    expect(descriptionElement).toBeInTheDocument();
  });
});
