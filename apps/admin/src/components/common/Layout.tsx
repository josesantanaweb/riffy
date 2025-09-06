'use client';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/common/sidebar';
import Navbar from './navbar';
const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

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

  return (
    <main className="relative w-full flex items-center justify-center">
      <div className="w-full flex flex-col">
        <main className="relative w-full h-screen xl:grid xl:grid-rows-[52px_1fr]">
          <Navbar />
          <div className="w-full flex h-full">
            <Sidebar />
            <div className="bg-base-800 w-full">{children}</div>
          </div>
        </main>
        {/* <Footer menu={MENU} /> */}
      </div>
    </main>
  );
};

export default Layout;
