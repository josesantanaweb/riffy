'use client';
import PaymentsTable from './payments-table/PaymentsTable';
import { useRouter } from 'next/navigation';
import { usePayments } from '@riffy/hooks';
import { useToast } from '@/hooks';
import { ROUTES } from '@/constants';
import { useUpdatePayment } from '@riffy/hooks';
import { Payment, PaymentStatus, Ticket } from '@riffy/types';
import PageHeader from '@/components/common/page-header';

const PaymentsPage = () => {
  const router = useRouter();
  const toast = useToast();
  const { data } = usePayments();
  const { updatePayment } = useUpdatePayment();

  const handleView = (payment: Payment) =>
    router.push(ROUTES.TICKETS.LIST(payment.id));

  const handleMarkAsVerified = (payment: Payment) => {
    if (payment.status !== PaymentStatus.VERIFIED) {
      confirm('¿Estás seguro de querer marcar como verificado?');
      if (confirm) {
        try {
          const ticketIds = Array.isArray(payment.tickets)
            ? payment.tickets.map((ticket: Ticket) => ticket.id)
            : [];
          updatePayment(payment.id, {
            status: PaymentStatus.VERIFIED,
            ticketIds,
          });
          toast.success('Pago marcado como verificado exitosamente!!');
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          toast.error('Error al marcar como verificado el pago.');
        }
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
            onMarkAsVerified={handleMarkAsVerified}
            onView={handleView}
            onDownload={handleDownload}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentsPage;
