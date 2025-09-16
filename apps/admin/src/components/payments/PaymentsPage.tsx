'use client';
import PaymentsTable from './payments-table/PaymentsTable';
import { usePayments } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { useUpdatePaymentStatus } from '@riffy/hooks';
import { PaymentStatus } from '@riffy/types';
import { Payment } from '@riffy/types';
import PageHeader from '@/components/common/page-header';

const PaymentsPage = () => {
  const toast = useToast();
  const { data } = usePayments();
  const { updatePaymentStatus } = useUpdatePaymentStatus();

  const handleUpdatePaymentStatus = async (payment: Payment, newStatus: PaymentStatus) => {
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
        await updatePaymentStatus(payment.id, newStatus);
        toast.success(messages.success);
      } catch (error) {
        console.error('Error updating payment status:', error);
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
