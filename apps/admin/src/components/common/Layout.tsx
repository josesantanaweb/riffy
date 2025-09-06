'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/sidebar';
import Navbar from './navbar';
import { useStore } from '@/store';
import { useBreakpoint } from '@/hooks';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { collapseSidebar } = useStore();
  const { isDesktop } = useBreakpoint();

  const isLoading = false;

  const handleLogin = () => router.push('/login');

  const handleRegister = () => router.push('/register');

  const handleLogout = async () => {
    try {
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  const profile = {
    balance: 0,
    image: '',
    hasSession: true,
    isLoading,
  };

  const actions = {
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  const gridTemplateColumns = isDesktop
    ? (collapseSidebar ? '80px 1fr' : '230px 1fr')
    : '1fr';

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

        <div className="bg-base-800 h-full overflow-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
