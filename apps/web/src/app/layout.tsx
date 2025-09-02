import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import ClientApolloProvider from '@/components/ClientApolloProvider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Riffy',
  description: 'Riffas online',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="w-screen h-screen">
      <body
        className={`${outfit.variable} antialiased grid grid-rows-[auto,1fr,auto] min-h-screen w-screen`}
      >
        <ClientApolloProvider>
          <Header />
          {children}
          <Footer />
        </ClientApolloProvider>
      </body>
    </html>
  );
}
