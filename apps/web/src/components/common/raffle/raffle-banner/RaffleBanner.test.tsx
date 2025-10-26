import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import RaffleBanner from './RaffleBanner';

jest.mock('next/image', () => {
  return function MockedImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('<RaffleBanner />', () => {
  const defaultProps = {
    banner: 'https://example.com/banner.jpg',
    isCompleted: false,
    loading: false,
  };

  it('renderiza correctamente con props por defecto', () => {
    render(<RaffleBanner {...defaultProps} />);

    const bannerContainer = screen.getByRole('img', { name: /banner/i });
    expect(bannerContainer).toBeInTheDocument();
    expect(bannerContainer).toHaveAttribute('src', 'https://example.com/banner.jpg');
  });

  it('aplica la clase saturate-0 cuando isCompleted es true', () => {
    render(<RaffleBanner {...defaultProps} isCompleted={true} />);

    const bannerContainer = document.querySelector('.saturate-0');
    expect(bannerContainer).toBeInTheDocument();
  });

  it('maneja correctamente el estado de carga sin mostrar la imagen', () => {
    render(<RaffleBanner {...defaultProps} loading={true} />);

    const image = screen.queryByRole('img', { name: /banner/i });
    expect(image).not.toBeInTheDocument();

    const loadingDiv = document.querySelector('.animate-pulse');
    expect(loadingDiv).toBeInTheDocument();
  });
});
