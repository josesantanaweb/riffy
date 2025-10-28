'use client';
import RafflesTable from './table/RafflesTable';
import { useRouter } from 'next/navigation';
import { useRaffles, useDeleteRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { Raffle } from '@riffy/types';
import PageHeader from '../common/page-header';

const RafflesPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useRaffles();
  const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (raffle: Raffle) =>
    router.push(ROUTES.RAFFLES.EDIT(raffle.id));

  const handleView = () => router.push(ROUTES.TICKETS.LIST);

  const handleDelete = async (raffle: Raffle) => {
    const confirm = window.confirm('¿Estás seguro de querer eliminar esta rifa?');
    if (confirm) {
      try {
        await deleteRaffle(raffle.id);
        toast.success('Rifa eliminada exitosamente!!');
      } catch {
        toast.error('Error al eliminar la rifa.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Rifas" subtitle="Lista de Rifas" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6">
        {data && (
          <RafflesTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default RafflesPage;
