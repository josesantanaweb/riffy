import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import Navbar from './Navbar';

const mockSetUser = jest.fn();
const mockSetLoading = jest.fn();

jest.mock('../../../store', () => ({
  useStore: () => ({
    setUser: mockSetUser,
    setLoading: mockSetLoading,
  }),
}));

const mockUseUserByDomain = jest.fn(() => ({
  data: {
    logo: 'https://example.com/logo.png',
    instagram: 'testuser',
    tiktok: 'testuser',
    whatsapp: '1234567890',
  },
  loading: false,
}));

jest.mock('@riffy/hooks', () => ({
  useUserByDomain: () => mockUseUserByDomain(),
}));

jest.mock('@riffy/components', () => ({
  Logo: ({ src, loading, className }: { src?: string; loading?: boolean; className?: string }) => (
    <img
      src={src}
      alt="logo"
      className={className}
      data-loading={loading ? 'true' : 'false'}
      data-testid="logo"
    />
  ),
  Icon: ({ name, className }: { name: string; className?: string }) => (
    <span className={className} data-testid={`icon-${name}`} aria-label={name} />
  ),
}));

jest.mock('./social-link', () => ({
  __esModule: true,
  default: ({ href, icon }: { href: string; icon: string }) => (
    <a href={href} data-testid={`social-link-${icon}`} aria-label={icon}>
      <span data-testid={`icon-${icon}`} />
    </a>
  ),
}));

describe('<Navbar />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserByDomain.mockReturnValue({
      data: {
        logo: 'https://example.com/logo.png',
        instagram: 'testuser',
        tiktok: 'testuser',
        whatsapp: '1234567890',
      },
      loading: false,
    });
  });

  it('renderiza correctamente con datos del usuario', async () => {
    render(<Navbar />);

    await waitFor(() => {
      const logoElement = screen.getByTestId('logo');
      expect(logoElement).toBeInTheDocument();
      expect(logoElement).toHaveAttribute('src', 'https://example.com/logo.png');
    });
  });

  it('muestra los links sociales cuando están disponibles', async () => {
    render(<Navbar />);

    await waitFor(() => {
      const instagramLink = screen.getByTestId('social-link-instagram');
      const tiktokLink = screen.getByTestId('social-link-tiktok');
      const whatsappLink = screen.getByTestId('social-link-whatsapp');

      expect(instagramLink).toBeInTheDocument();
      expect(tiktokLink).toBeInTheDocument();
      expect(whatsappLink).toBeInTheDocument();
    });
  });

  it('muestra estado de carga cuando loading es true', async () => {
    mockUseUserByDomain.mockReturnValue({
      data: null,
      loading: true,
    });

    render(<Navbar />);

    await waitFor(() => {
      const logoElement = screen.getByTestId('logo');
      expect(logoElement).toHaveAttribute('data-loading', 'true');
    });
  });
});
