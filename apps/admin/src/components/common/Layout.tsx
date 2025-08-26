'use client';

import { MENU } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/users/useProfile';
import Sidebar from '@/components/common/sidebar';
import Navbar from './navbar';
import { useAuth } from '@/hooks/auth/useAuth';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const {
    logout,
    isAuthenticated,
    getCurrentUser,
    isLoading: isAuthLoading,
  } = useAuth();
  const { data: profileData, loading: profileLoading } = useProfile();

  const user = getCurrentUser();
  const isLoadingProfile = isAuthenticated && profileLoading;
  const isLoading = isAuthLoading || isLoadingProfile;

  const handleLogin = () => router.push('/login');

  const handleRegister = () => router.push('/register');

  const handleLogout = async () => {
    try {
      if (user?.id) {
        await logout(user.id);
      }
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  const profile = {
    balance: profileData?.balance || 0,
    image: profileData?.image || user?.image || '',
    hasSession: isAuthenticated,
    isLoading,
  };

  const actions = {
    onLogin: handleLogin,
    onRegister: handleRegister,
    onLogout: handleLogout,
  };

  return (
    <main className="relative w-full flex items-center justify-center bg-black">
      <div className="bg-base-900 w-full flex flex-col">
        <main className="relative w-full h-screen grid grid-rows-[52px_1fr]">
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
