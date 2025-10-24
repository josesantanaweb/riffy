import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/common/providers';

export const metadata: Metadata = {
  title: 'Riffy Admin',
  description: 'Riffy Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
