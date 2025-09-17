'use client';
import Navbar from './navbar';
import { useBrandColor } from '@/hooks';

const Layout = ({ children }: { children: React.ReactNode }) => {
  useBrandColor();
  return (
    <main className="relative w-full flex items-center justify-center bg-black">
      <div className="w-full md:max-w-md flex flex-col min-h-screen bg-base-800">
        <Navbar />
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
