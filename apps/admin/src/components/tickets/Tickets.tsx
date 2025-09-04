'use client';
import { useParams } from 'next/navigation';
import { useTicketsByRaffle } from '@riffy/hooks';
import TicketsTable from './TicketsTable';
import PageHeader from '../common/page-header';

const Tickets = () => {
  const raffleId = useParams().raffleId as string | undefined;

  const { data } = useTicketsByRaffle(raffleId);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Boletos" subtitle="Lista de Boletos" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && <TicketsTable data={data} />}
      </div>
    </div>
  );
};

export default Tickets;
