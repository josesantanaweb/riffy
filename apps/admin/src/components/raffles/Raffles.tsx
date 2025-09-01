'use client';
import RafflesTable from './RafflesTable';
import { useRouter } from 'next/navigation';
import { Breadcrumb } from '@riffy/components';
import { useRaffles, useDeleteRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants/routes';
import { Raffle } from '@riffy/types';

const Raffles = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = useRaffles();
  const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (raffle: Raffle) =>
    router.push(ROUTES.RAFFLES.EDIT(raffle.id));

  const handleView = (raffle: Raffle) => router.push(ROUTES.TICKETS.LIST(raffle.id));

  const handleDelete = async (raffle: Raffle) => {
    try {
      await deleteRaffle(raffle.id);
      toast.success('Rifa eliminada exitosamente!!');
    } catch (error) {
      console.error(error);
      toast.error('Error al eliminar la rifa.');
    }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <div className="flex flex-col">
        <h3 className="text-white text-lg font-semibold">Rifas</h3>
        <Breadcrumb page="Lista de Rifas" />
      </div>
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
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

export default Raffles;
