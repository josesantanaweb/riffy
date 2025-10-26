'use client';

import Link from 'next/link';
import { Icon, type IconName } from '@riffy/components';

interface SocialLinkProps {
  href: string;
  icon: IconName;
  type?: 'link' | 'whatsapp';
}

const SocialLink = ({ href, icon, type = 'link' }: SocialLinkProps) => {
  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const iconLabels: Record<string, string> = {
    instagram: 'Instagram',
    tiktok: 'TikTok',
    whatsapp: 'WhatsApp',
  };

  const ariaLabel = iconLabels[icon] || 'Red social';

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={type === 'whatsapp' ? handleWhatsAppClick : undefined}
      className="cursor-pointer"
      aria-label={ariaLabel}
    >
      <Icon name={icon} className="text-body-100 text-2xl" />
    </Link>
  );
};

export default SocialLink;
