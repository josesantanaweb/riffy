'use client';
import { useEffect } from 'react';
import Sidebar from '@/components/common/sidebar';
import MobileSidebar from '@/components/common/sidebar/MobileSidebar';
import Navbar from './navbar';
import { useStore } from '@/store';
import { useBreakpoint } from '@/hooks';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { collapseSidebar } = useStore();
  const { isDesktop } = useBreakpoint();

  const layoutClass = isDesktop ? (collapseSidebar ? 'ml-[80px]' : 'ml-[230px]') : '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <main className="flex-1 transition-all duration-300 relative w-full h-screen bg-admin-bg">
        <Sidebar />

        <div className={`min-h-screen h-full ${layoutClass}`}>
          <Navbar />
          <div className="min-h-full bg-admin-bg">{children}</div>
        </div>
      </main>

      <MobileSidebar />
    </>
  );
};

export default Layout;
