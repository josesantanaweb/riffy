'use client';
import PaymentsTable from './PaymentsTable';
import { useRouter } from 'next/navigation';
import { usePayments } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { Payment } from '@riffy/types';
import PageHeader from '../common/page-header';

const Payments = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = usePayments();
  // const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (payment: Payment) =>
    router.push(ROUTES.RAFFLES.EDIT(payment.id));

  const handleView = (payment: Payment) =>
    router.push(ROUTES.TICKETS.LIST(payment.id));

  const handleDelete = async (payment: Payment) => {
    // try {
    //   await deleteRaffle(payment.id);
    //   toast.success('Pago eliminada exitosamente!!');
    // } catch (error) {
    //   console.error(error);
    //   toast.error('Error al eliminar el pago.');
    // }
  };

  const handleAdd = () => router.push(ROUTES.PAYMENTS.CREATE);

  const handleMarkAsVerified = () => {
    alert('Marcar como Verificado');
  };

  const handleDownload = () => {
    alert('Descargar datos');
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Pagos" subtitle="Lista de Pagos" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && (
          <PaymentsTable
            data={data}
            onMarkAsVerified={handleMarkAsVerified}
            onView={handleView}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default Payments;
