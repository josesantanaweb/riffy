import type { Metadata } from 'next';

import '@riffy/components/styles/globals.css';
import Layout from '@/components/common/Layout';
import Providers from '@/components/providers';

export const metadata: Metadata = {
  title: 'riffy',
  description: 'riffy is a platform for betting on the outcome of AI models.',
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
