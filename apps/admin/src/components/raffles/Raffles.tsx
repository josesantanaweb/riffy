'use client';
import Table from './table';
import { Breadcrumb } from '@riffy/components';
// import { useRaffles } from '@/hooks';
import { Raffle } from '@/types';

const Raffles = () => {
  // const { data } = useRaffles();

  const data: Raffle[] = [
    {
      id: '2BA12213',
      title: 'Dia del padre',
      description: 'Rifa para el dia del padre',
      banner: '/images/banner.png',
      primaryColor: '00D4FF',
      secondaryColor: 'FF00C8',
      price: 10,
      drawDate: '2025-08-22',
      totalTickets: 100,
      sold: 50,
      available: 50,
      progress: 50,
      award: 100.5,
      tickets: null,
      status: 'COMPLETED',
      owner: {
        id: '1',
        name: 'Ganaconriffy',
        email: 'ganaconriffy@example.com',
        image: '/images/customer.png',
        phone: '123-456-7890',
        state: 'CA',
        role: 'USER',
      },
    },
    {
      id: '2BA12214',
      title: 'Dia de la madre',
      description: 'Rifa para el dia de la madre',
      banner: '/images/banner.png',
      primaryColor: '00D4FF',
      secondaryColor: 'FF00C8',
      price: 15.5,
      drawDate: '2025-05-14',
      totalTickets: 100,
      sold: 50,
      available: 50,
      progress: 50,
      award: 250.75,
      tickets: null,
      status: 'COMPLETED',
      owner: {
        id: '1',
        name: 'Ganaconriffy',
        email: 'ganaconriffy@example.com',
        image: '/images/customer.png',
        phone: '123-456-7890',
        state: 'CA',
        role: 'USER',
      },
    },
    {
      id: '2BA12215',
      title: 'Dia del niño',
      description: 'Rifa para el dia del niño',
      banner: '/images/banner.png',
      primaryColor: '00D4FF',
      secondaryColor: 'FF00C8',
      price: 5.25,
      drawDate: '2025-04-30',
      totalTickets: 100,
      sold: 50,
      available: 50,
      progress: 50,
      award: 75.25,
      tickets: null,
      status: 'ACTIVE',
      owner: {
        id: '1',
        name: 'Ganaconriffy',
        email: 'ganaconriffy@example.com',
        image: '/images/customer.png',
        phone: '123-456-7890',
        state: 'CA',
        role: 'USER',
      },
    },
  ];

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-semibold">Rifas</h3>
        <Breadcrumb page="Lista de Rifas" />
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        <Table data={data} />
      </div>
    </div>
  );
};

export default Raffles;
