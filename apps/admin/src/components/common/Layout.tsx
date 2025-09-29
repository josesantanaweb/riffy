'use client';
import { useEffect } from 'react';
import Sidebar from '@/components/common/sidebar';
import Navbar from './navbar';
import { useStore } from '@/store';
import { useBreakpoint } from '@/hooks';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { collapseSidebar } = useStore();
  const { isDesktop } = useBreakpoint();

  const gridTemplateColumns = isDesktop
    ? collapseSidebar
      ? '80px 1fr'
      : '230px 1fr'
    : '1fr';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full h-screen flex flex-col">
      <Navbar />

      <div
        className="flex-1 transition-all duration-300"
        style={{
          display: isDesktop ? 'grid' : 'block',
          gridTemplateColumns,
        }}
      >
        <Sidebar />

        <div className="bg-base-800 h-ful">
          <div className="min-h-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
