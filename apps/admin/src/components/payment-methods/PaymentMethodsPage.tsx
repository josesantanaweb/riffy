'use client';
import { useRouter } from 'next/navigation';
import { usePaymentMethods, useDeletePaymentMethod } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { useRole } from '@/hooks/useRole';
import { ROUTES } from '@/constants';
import { PaymentMethod } from '@riffy/types';
import PageHeader from '@/components/common/page-header';
import PaymentMethodsTable from './table';

const PaymentMethods = () => {
  const router = useRouter();
  const toast = useToast();
  const { data, loading } = usePaymentMethods();
  const { deletePaymentMethod } = useDeletePaymentMethod();
  const { isOwner } = useRole();

  const handleEdit = (payment: PaymentMethod) =>
    router.push(ROUTES.PAYMENT_METHODS.EDIT(payment.id));

  const handleDelete = async (payment: PaymentMethod) => {
    const confirm = window.confirm('¿Estás seguro de querer eliminar este metodo de pago?');
    if (confirm) {
      try {
        await deletePaymentMethod(payment.id);
        toast.success('Metodo de Pago eliminado exitosamente!!');
      } catch {
        toast.error('Error al eliminar el metodo de pago.');
      }
    }
  };

  const handleAdd = () => router.push(ROUTES.PAYMENT_METHODS.CREATE);

  return (
    <div className="py-6 px-3 lg:px-6 flex-col flex gap-6">
      <PageHeader title="Metodos de Pago" subtitle="Lista de Metodos de Pago" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6">
        <PaymentMethodsTable
          data={data || []}
          loading={loading}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAdd={isOwner ? handleAdd : undefined}
        />
      </div>
    </div>
  );
};

export default PaymentMethods;
