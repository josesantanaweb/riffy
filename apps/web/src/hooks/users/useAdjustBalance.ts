import { useAuth, useProfile, useUpdateUser } from '@/hooks';

export const useAdjustBalance = () => {
  const { getCurrentUser } = useAuth();
  const { data: profile } = useProfile();
  const { updateUser } = useUpdateUser();
  const user = getCurrentUser();
  const balance = profile?.balance ?? 0;

  const adjustBalance = async (amount: number) => {
    if (!user?.id || !profile) return;
    const newBalance = balance + amount;
    try {
      await updateUser(user.id, { balance: newBalance });
    } catch {
      console.error('Error adjusting balance');
    }
  };

  return { adjustBalance, balance };
};
