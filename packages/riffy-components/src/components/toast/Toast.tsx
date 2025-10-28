import { Icon } from '@riffy/components';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  t: any;
  message: string;
  type: ToastType;
}

const Toast = ({ t, message, type }: ToastProps) => {
  const colors =
    type === 'success'
      ? 'bg-success-500'
      : type === 'error'
        ? 'bg-danger-500'
        : 'bg-primary-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-lg shadow-lg pl-6 pr-3 py-4 dark:bg-base-600 bg-box-primary"
    >
      <span className={`${colors} w-1 h-full absolute left-0 top-0`} />
      <div className="flex items-center justify-between min-w-[250px] max-w-[300px]">
        <p className="text-base dark:text-white text-body-100">{message}</p>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="dark:text-white text-body-100 cursor-pointer"
        >
          <Icon name="close" className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
