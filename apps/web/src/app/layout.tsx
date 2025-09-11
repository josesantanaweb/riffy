import type { Metadata } from 'next';
import '@riffy/components/styles/globals.css';
import Providers from '@/components/providers';
import Layout from '@/components/common/Layout';

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
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
