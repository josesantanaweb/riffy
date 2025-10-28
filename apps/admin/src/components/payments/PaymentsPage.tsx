'use client';
import { useState } from 'react';
import PaymentsTable from './table/PaymentsTable';
import { usePayments, useRaffles } from '@riffy/hooks';
import { useUpdatePaymentStatus } from '@riffy/hooks';
import PaymentDetail from './payment-detail/PaymentDetail';
import { Payment, PaymentStatus } from '@riffy/types';
import PageHeader from '@/components/common/page-header';
import { Select } from '@riffy/components';
import { useToast } from '@/hooks';

const PaymentsPage = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [selectedRaffleId, setSelectedRaffleId] = useState<string>('');

  const { data: raffles } = useRaffles();
  const { data, loading } = usePayments(selectedRaffleId || undefined);
  const { updatePaymentStatus } = useUpdatePaymentStatus();

  const rafflesOptions = [
    { value: '', label: 'Todas las rifas' },
    ...(raffles?.map(raffle => ({
      value: raffle.id,
      label: raffle.title,
    })) || []),
  ];


  const handleOpenModal = async (payment: Payment) => {
    setIsOpen(true);
    setPayment(payment);
  };

  const handleDownload = () => {
    alert('Descargar datos');
  };

  const handleUpdatePaymentStatus = async (
    paymentId: string,
    status: PaymentStatus,
  ) => {
    try {
      await updatePaymentStatus(paymentId, status);
      const statusMessages = {
        [PaymentStatus.VERIFIED]: 'Pago aprobado exitosamente',
        [PaymentStatus.DENIED]: 'Pago rechazado',
      };
      toast.success(statusMessages[status]);
      setIsOpen(false);
    } catch {
      toast.error('Error al actualizar el estado del pago');
    }
  };

  return (
    <div className="p-6 flex-col flex gap-6">
      <PageHeader title="Pagos" subtitle="Lista de Pagos" />
      <div className="flex flex-col w-full bg-box-primary rounded-xl p-6 gap-5">
        <div className="flex justify-between items-end w-full md:w-[380px]">
          <Select
            options={rafflesOptions}
            label="Selecciona una rifa"
            value={selectedRaffleId}
            onChange={setSelectedRaffleId}
            size="md"
            placeholder="Elige una rifa..."
          />
        </div>
        <PaymentsTable
          data={data || []}
          loading={loading}
          onDownload={handleDownload}
          onView={payment => handleOpenModal(payment)}
        />

        <PaymentDetail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          payment={payment}
          onUpdateStatus={handleUpdatePaymentStatus}
        />
      </div>
    </div>
  );
};

export default PaymentsPage;
