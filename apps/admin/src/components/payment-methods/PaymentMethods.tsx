'use client';
import PaymentMethodsTable from './PaymentMethodsTable';
import { useRouter } from 'next/navigation';
import { usePaymentMethods } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { PaymentMethod } from '@riffy/types';
import PageHeader from '../common/page-header';

const PaymentMethods = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = usePaymentMethods();
  // const { deleteRaffle } = useDeleteRaffle();

  const handleEdit = (payment: PaymentMethod) =>
    router.push(ROUTES.RAFFLES.EDIT(payment.id));


  const handleDelete = async (payment: PaymentMethod) => {
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
      <PageHeader title="Metodos de Pago" subtitle="Lista de Metodos de Pago" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        {data && (
          <PaymentMethodsTable
            data={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAdd={handleAdd}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
