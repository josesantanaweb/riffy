import { redirect } from 'next/navigation';
import { ROUTES } from '@/constants';

export default function RootRedirect() {
  redirect(ROUTES.BINGOS.LIST);
}
