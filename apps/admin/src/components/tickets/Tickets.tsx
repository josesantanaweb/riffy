'use client';
import { useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Breadcrumb, Button, Icon } from '@riffy/components';
import { useTicketsByRaffleId } from '@riffy/hooks';
import TicketsTable from './TicketsTable';

const Tickets = () => {
  const router = useRouter();
  const raffleId = useParams().raffleId as string | undefined;

  const handleBack = useCallback(() => router.back(), [router]);

  const { data } = useTicketsByRaffleId(raffleId);

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex w-full justify-between items-center">
        <div className="flex flex-col">
          <h3 className="text-white text-lg font-semibold">Boletos</h3>
          <Breadcrumb page="Lista de Boletos" />
        </div>
        <Button size="md" onClick={handleBack} type="button">
          <Icon name="arrow-back" />
          Volver
        </Button>
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && <TicketsTable data={data} />}
      </div>
    </div>
  );
};

export default Tickets;
