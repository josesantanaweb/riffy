'use client';
import { useRouter } from 'next/navigation';
import { usePaymentMethods, useDeletePaymentMethod } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { PaymentMethod } from '@riffy/types';
import PageHeader from '@/components/common/page-header';
import PaymentMethodsTable from './table';

const PaymentMethods = () => {
  const router = useRouter();
  const toast = useToast();
  const { data, loading } = usePaymentMethods();
  const { deletePaymentMethod } = useDeletePaymentMethod();

  const handleEdit = (payment: PaymentMethod) =>
    router.push(ROUTES.PAYMENT_METHODS.EDIT(payment.id));

  const handleDelete = async (payment: PaymentMethod) => {
    try {
      await deletePaymentMethod(payment.id);
      toast.success('Metodo de Pago eliminado exitosamente!!');
    } catch {
      toast.error('Error al eliminar el metodo de pago.');
    }
  };

  const handleAdd = () => router.push(ROUTES.PAYMENT_METHODS.CREATE);

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Metodos de Pago" subtitle="Lista de Metodos de Pago" />
      <div className="flex flex-col w-full bg-base-700 rounded-xl p-6">
        <PaymentMethodsTable
          data={data || []}
          loading={loading}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAdd={handleAdd}
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
