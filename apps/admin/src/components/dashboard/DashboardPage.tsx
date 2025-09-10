'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '../common/page-header';
import { Icon, Button, Avatar } from '@riffy/components';
import { ROUTES } from '@/constants/routes';
import { useProfile } from '@riffy/hooks';

const DashboardPage = () => {
  const router = useRouter();
  const { data: profile } = useProfile();

  const handleCreateRaffle = () => router.push(ROUTES.RAFFLES.CREATE);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Dashboard" subtitle="Dashboard" />
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar name={profile?.name} src={profile?.logo} size={45} className="rounded-md" />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-medium text-white">Hola {profile?.name}</h3>
              <p className="text-sm text-base-300">
                Anilisis y estadisticas de tus rifas
              </p>
            </div>
          </div>
          <Button size="md" variant="primary" onClick={handleCreateRaffle}>
            <Icon name="plus" className="text-sm" />
            Nueva Rifa
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center justify-between gap-4 bg-base-700 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-600">10</h2>
              <p className="text-sm text-white">Rifas Creadas</p>
            </div>
            <span className="flex items-center justify-center bg-primary-600/10 rounded-full w-12 h-12">
              <Icon name="ticket" className="text-primary-600 text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-base-700 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-600">1.500</h2>
              <p className="text-sm text-white">Boletos Vendidos</p>
            </div>
            <span className="flex items-center justify-center bg-primary-600/10 rounded-full w-12 h-12">
              <Icon name="credit-card" className="text-primary-600 text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-base-700 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-600">11.000</h2>
              <p className="text-sm text-white">Premios Repartidos</p>
            </div>
            <span className="flex items-center justify-center bg-primary-600/10 rounded-full w-12 h-12">
              <Icon name="gift" className="text-primary-600 text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-base-700 rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-600">5.200</h2>
              <p className="text-sm text-white">Ganadores</p>
            </div>
            <span className="flex items-center justify-center bg-primary-600/10 rounded-full w-12 h-12">
              <Icon name="user" className="text-primary-600 text-2xl" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="md:col-span-2 xl:col-span-2 bg-base-700 rounded-xl p-6 min-h-[300px]" />
          <div className="md:col-span-1 xl:col-span-1 bg-base-700 rounded-xl p-6 min-h-[300px]" />
          <div className="md:col-span-1 xl:col-span-1 bg-base-700 rounded-xl p-6 min-h-[300px]" />
        </div>
        <div className="flex w-full gap-6 items-center">
          <div className="flex flex-col w-full bg-base-700 rounded-xl p-6 min-h-[300px]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
