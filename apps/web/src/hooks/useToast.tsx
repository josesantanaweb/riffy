import toast from 'react-hot-toast';
import { Toast, ToastType } from '@riffy/components';

export const useToast = () => {
  const showToast = (type: ToastType, message: string) => {
    toast.custom(t => <Toast t={t} type={type} message={message} />);
  };

  return {
    success: (message: string) => showToast('success', message),
    error: (message: string) => showToast('error', message),
    info: (message: string) => showToast('info', message),
  };
};
