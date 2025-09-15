'use client';
import PaymentsTable from './payments-table/PaymentsTable';
import { useRouter } from 'next/navigation';
import { usePayments } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { useUpdatePaymentStatus } from '@riffy/hooks';
import { Payment, PaymentStatus } from '@riffy/types';
import PageHeader from '@/components/common/page-header';

const PaymentsPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = usePayments();
  const { updatePaymentStatus } = useUpdatePaymentStatus();

  const handleView = (payment: Payment) =>
    router.push(ROUTES.TICKETS.LIST(payment.id));

  const handleUpdatePaymentStatus = (payment: Payment, newStatus: PaymentStatus) => {
    if (payment.status === newStatus) return;

    const statusMessages = {
      [PaymentStatus.VERIFIED]: {
        confirm: '¿Estás seguro de querer marcar como verificado?',
        success: 'Pago marcado como verificado exitosamente!!',
        error: 'Error al marcar como verificado el pago.'
      },
      [PaymentStatus.DENIED]: {
        confirm: '¿Estás seguro de querer marcar como denegado?',
        success: 'Pago marcado como denegado exitosamente!!',
        error: 'Error al marcar como denegado el pago.'
      }
    };

    const messages = statusMessages[newStatus];

    if (confirm(messages.confirm)) {
      try {
        updatePaymentStatus(payment.id, newStatus);
        toast.success(messages.success);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        toast.error(messages.error);
      }
    }
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
            onView={handleView}
            onDownload={handleDownload}
            onMarkAsVerified={(payment) => handleUpdatePaymentStatus(payment, PaymentStatus.VERIFIED)}
            onMarkAsDenied={(payment) => handleUpdatePaymentStatus(payment, PaymentStatus.DENIED)}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
