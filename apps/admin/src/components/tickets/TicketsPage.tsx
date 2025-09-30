'use client';
import { useParams } from 'next/navigation';
import { useTicketsByRaffle } from '@riffy/hooks';
import TicketsTable from './table';
import PageHeader from '@/components/common/page-header';
import { Ticket, TicketStatus } from '@riffy/types';
import { useToast } from '@/hooks';
import { useUpdateTicketStatus } from '@riffy/hooks';

const Tickets = () => {
  const toast = useToast();
  const raffleId = useParams().raffleId as string | undefined;
  const { updateTicketStatus } = useUpdateTicketStatus();

  const { data } = useTicketsByRaffle(raffleId);

  const onMarkAsWinner = async (ticket: Ticket) => {
    const confirm = window.confirm('¿Estás seguro de querer marcar como ganador este boleto?');
    if (confirm) {
      try {
        await updateTicketStatus(ticket.id, TicketStatus.WINNER);
        toast.success('Boletos marcados como ganador exitosamente!!');
      } catch {
        toast.error('Error al marcar como ganador el boleto.');
      }
    }
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Boletos" subtitle="Lista de Boletos" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        <TicketsTable data={data || []} onMarkAsWinner={onMarkAsWinner} />
      </div>
    </div>
  );
};

export default Tickets;
