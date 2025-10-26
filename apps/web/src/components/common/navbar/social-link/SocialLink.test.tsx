import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import SocialLink from './SocialLink';

describe('<SocialLink />', () => {
  it('renderiza correctamente el link de Instagram', () => {
    render(
      <SocialLink
        href="https://www.instagram.com/test"
        icon="instagram"
        type="link"
      />
    );

    const linkElement = screen.getByRole('link', { name: /instagram/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://www.instagram.com/test');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveAttribute('aria-label', 'Instagram');
    expect(linkElement).toHaveClass('cursor-pointer');
  });

  it('renderiza correctamente el link de WhatsApp', () => {
    render(
      <SocialLink
        href="https://wa.me/+581234567890"
        icon="whatsapp"
        type="whatsapp"
      />
    );

    const linkElement = screen.getByRole('link', { name: /whatsapp/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://wa.me/+581234567890');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkElement).toHaveAttribute('aria-label', 'WhatsApp');
    expect(linkElement).toHaveClass('cursor-pointer');
  });
});
