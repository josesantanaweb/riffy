'use client';

import { getVersion } from '@riffy/utils';

const Footer = () => {
  const version = getVersion();

  return (
    <footer className="w-full flex items-center md:justify-between flex-col md:flex-row md:gap-5 p-2 md:p-5 bg-box-primary">
      <p className="text-body-100 text-xs md:text-sm">© 2025 Riffy v{version}</p>
      <p className="text-body-100 text-xs md:text-sm">
        Diseñado y Desarrollado por{' '}
        <span className="font-bold">Raven Labs</span>
      </p>
    </footer>
  );
};

export default Footer;
