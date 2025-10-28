'use client';
import Navbar from './navbar';
import { useBrandColor } from '@/hooks';
import { useIOSScrollFix } from '@/hooks';

const Layout = ({ children }: { children: React.ReactNode }) => {
  useBrandColor();
  useIOSScrollFix();

  return (
    <main className="relative w-full flex items-center justify-center overflow-hidden">
      <div className="w-full md:max-w-md flex flex-col h-full bg-box-primary">
        <Navbar />
        <div className="flex-1 safe-scroll">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
