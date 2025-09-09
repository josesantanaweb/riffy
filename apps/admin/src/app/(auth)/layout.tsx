import type { Metadata } from 'next';

import '@riffy/components/styles/globals.css';
import Providers from '@/components/providers';
import { PublicGuard } from '@/components/common/guards';

export const metadata: Metadata = {
  title: 'Riffy Admin - Login',
  description: 'Riffy Admin - Login',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <PublicGuard>
            <main className="relative w-full h-screen flex flex-col justify-center items-center">
              <div className="bg-base-800 h-full w-full">{children}</div>
            </main>
          </PublicGuard>
        </Providers>
      </body>
    </html>
  );
}
