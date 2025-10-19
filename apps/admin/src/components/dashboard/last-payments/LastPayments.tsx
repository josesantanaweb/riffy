'use client';
import {
  mapPaymentStatusToStatusType,
  mapPaymentStatusToLabel,
  formatCurrency,
} from '@/utils';
import { Badge } from '@riffy/components';
import { PaymentStatus } from '@riffy/types';
import { Payment } from '@riffy/types';

interface LastPaymentsProps {
  payments: Payment[];
}

const LastPayments = ({ payments }: LastPaymentsProps) => {
  return (
    <div className="flex flex-col dark:bg-base-700 bg-base-800 rounded-xl p-6 min-h-[300px]">
      <h3 className="text-base font-medium dark:text-white text-primary mb-6">
        Ultimos pagos
      </h3>
      {payments.length === 0 && (
        <div className="flex flex-col h-[200px] justify-center items-center">
          <p className="text-base-300 text-sm flex items-center justify-center font-medium">
            No hay pagos recientes
          </p>
        </div>
      )}
      {payments.length > 0 && (
        <div className="flex flex-col">
          <div className="items-center bg-base-600 rounded-md h-9 grid grid-cols-4 md:grid-cols-5">
            <p className="text-base-300 text-sm flex items-center justify-center font-medium">
              Boleto N°
            </p>
            <p className="text-base-300 text-sm flex items-center justify-center font-medium">
              Comprador
            </p>
            <p className="text-base-300 text-sm flex items-center justify-center font-medium">
              Monto
            </p>
            <p className="text-base-300 hidden text-sm md:flex items-center justify-center font-medium">
              Metodo de pago
            </p>
            <p className="text-base-300 text-sm flex items-center justify-center font-medium">
              Estado
            </p>
          </div>
          {payments.map(payment => (
            <div className="items-center py-2 grid grid-cols-4 md:grid-cols-5">
              <p className="dark:text-white text-base-300 text-sm flex items-center justify-center font-medium">
                {payment.tickets?.map(ticket => ticket.number).join(', ')}
              </p>
              <p className="dark:text-white text-base-300 text-sm flex items-center justify-center font-medium max-w-[85px] truncate">
                {payment.buyerName}
              </p>
              <p className="dark:text-white text-base-300 text-sm flex items-center justify-center font-medium">
                {formatCurrency(payment.amount, 'VES')}
              </p>
              <p className="dark:text-white hidden text-base-300 text-sm md:flex items-center justify-center font-medium">
                {payment.paymentMethod}
              </p>
              <div className="flex justify-center">
                <Badge
                  status={mapPaymentStatusToStatusType(PaymentStatus.PENDING)}
                  label={mapPaymentStatusToLabel(PaymentStatus.PENDING)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LastPayments;
