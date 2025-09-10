import type { Metadata } from 'next';
import '@riffy/components/styles/globals.css';
import Providers from '@/components/providers';

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
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
