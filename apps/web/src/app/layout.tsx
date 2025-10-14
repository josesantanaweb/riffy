import type { Metadata } from 'next';
import '@riffy/components/styles/globals.css';
import Providers from '@/components/providers';
import Layout from '@/components/common/Layout';

export const metadata: Metadata = {
  title: 'Riffy Web',
  description: 'Riffy Web',
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
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
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
