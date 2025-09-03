'use client';
// import PaymentsTable from './PaymentsTable';
import { useRouter } from 'next/navigation';
// import { usePayments, useDeleteRaffle } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { Raffle } from '@riffy/types';
import PageHeader from '../common/page-header';

const Payments = () => {
  const router = useRouter();
  const toast = useToast();
  // const { data } = usePayments();
  // const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (raffle: Raffle) =>
    router.push(ROUTES.RAFFLES.EDIT(raffle.id));

  const handleView = (raffle: Raffle) => router.push(ROUTES.TICKETS.LIST(raffle.id));

  const handleDelete = async (raffle: Raffle) => {
    // try {
    //   await deleteRaffle(raffle.id);
    //   toast.success('Rifa eliminada exitosamente!!');
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Error al eliminar la rifa.');
    // }
  };

  const handleAdd = () => router.push(ROUTES.RAFFLES.CREATE);

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Pagos" subtitle="Lista de Pagos" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {/* {data && (
          <PaymentsTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )} */}
        pruchase
      </div>
    </div>
  );
};

export default Payments;
