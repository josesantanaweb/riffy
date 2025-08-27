import { BadgeStatus } from './Badge';

export const getStatusStyles = (status: BadgeStatus) => {
  switch (status) {
    case BadgeStatus.SUCCESS:
      return {
        text: 'text-[#19EBB6]',
        bg: 'bg-[#19EBB6]/20',
      };
    case BadgeStatus.ERROR:
      return {
        text: 'text-[#FF416E]',
        bg: 'bg-[#FF416E]/20',
      };
    case BadgeStatus.WARNING:
      return {
        text: 'text-amber-500',
        bg: 'bg-amber-500/20',
      };
    case BadgeStatus.INFO:
      return {
        text: 'text-blue-500',
        bg: 'bg-blue-500/20',
      };
    default:
      return {
        text: 'text-base-200',
        bg: 'bg-base-600',
      };
  }
};
