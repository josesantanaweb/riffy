'use client';
import { useRouter } from 'next/navigation';
import PageHeader from '../common/page-header';
import { Icon, Button, Avatar } from '@riffy/components';
import { ROUTES } from '@/constants/routes';
import { useProfile } from '@riffy/hooks';
import EarningsChart from './earnings-chart';
import ProgressChart from './progress-chart';
import StateChart from './state-chart';
import TopBuyers from './top-buyers';
import LastPayments from './last-payments';
import { useDashboardStats } from '@riffy/hooks';
import { formatCurrency } from '@riffy/utils';

const DashboardPage = () => {
  const router = useRouter();
  const { data: profile } = useProfile();
  const { data: dashboardStats } = useDashboardStats();

  const totalRaffles = dashboardStats?.totalRaffles || 0;
  const soldTickets = dashboardStats?.soldTickets || 0;
  const unsoldTickets = dashboardStats?.unsoldTickets || 0;
  const totalWinners = dashboardStats?.totalWinners || 0;
  const totalEarnings = dashboardStats?.totalEarnings || 0;
  const topBuyers = dashboardStats?.topBuyers || [];
  const paymentsByState = dashboardStats?.paymentsByState || [];
  const lastPayments = dashboardStats?.lastPayments || [];

  const handleCreateRaffle = () => router.push(ROUTES.RAFFLES.CREATE);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Dashboard" subtitle="Dashboard" />
      <div className="flex flex-col gap-6 mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar
              name={profile?.name}
              src={profile?.logo}
              size={45}
              className="rounded-md"
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-base font-medium text-title">
                Hola {profile?.name}
              </h3>
              <p className="text-sm text-body-100">
                Anilisis y estadisticas de tus rifas
              </p>
            </div>
          </div>
          <Button size="md" variant="primary" onClick={handleCreateRaffle}>
            <Icon
              name="plus"
              className="text-lg text-center w-[14px] flex justify-center"
            />
            Nueva Rifa
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center justify-between gap-4 bg-box-primary rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-500">
                {totalEarnings}
              </h2>
              <p className="text-sm text-title">Total de ventas</p>
            </div>
            <span className="flex items-center justify-center bg-primary-500 rounded-full w-12 h-12">
              <Icon name="credit-card" className="text-white text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-box-primary rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-500">
                {formatCurrency(soldTickets, 'VES')}
              </h2>
              <p className="text-sm text-title">Boletos Vendidos</p>
            </div>
            <span className="flex items-center justify-center bg-primary-500 rounded-full w-12 h-12">
              <Icon name="ticket" className="text-white text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-box-primary rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-500">
                {totalRaffles}
              </h2>
              <p className="text-sm text-title">Rifas Creadas</p>
            </div>
            <span className="flex items-center justify-center bg-primary-500 rounded-full w-12 h-12">
              <Icon name="gift" className="text-white text-2xl" />
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 bg-box-primary rounded-xl p-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium text-primary-500">
                {totalWinners}
              </h2>
              <p className="text-sm text-title">Total de ganadores</p>
            </div>
            <span className="flex items-center justify-center bg-primary-500 rounded-full w-12 h-12">
              <Icon name="user" className="text-white text-2xl" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <EarningsChart />
          <ProgressChart sold={soldTickets} unsold={unsoldTickets} />
          <StateChart paymentsByState={paymentsByState} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <TopBuyers topBuyers={topBuyers} />
          <LastPayments payments={lastPayments} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
