import { PaymentMethod, PaymentMethodType } from '@riffy/types';

/**
 * Obtiene el label descriptivo para un método de pago
 * @param paymentMethod Método de pago del cual obtener el label
 * @returns Label descriptivo: nombre del banco para Pago Móvil, "Binance" para Binance Pay, "PayPal" para PayPal
 */
export const getPaymentMethodLabel = (paymentMethod: PaymentMethod): string => {
  if (paymentMethod.type === PaymentMethodType.PAGO_MOVIL && paymentMethod.bankName) {
    return paymentMethod.bankName;
  }

  if (paymentMethod.type === PaymentMethodType.BINANCE_PAY) {
    return 'Binance';
  }

  if (paymentMethod.type === PaymentMethodType.PAYPAL) {
    return 'PayPal';
  }

  return paymentMethod.name;
};

/**
 * Genera las opciones del select de métodos de pago
 * @param paymentMethods Array de métodos de pago disponibles
 * @returns Array de opciones con value (id) y label descriptivo para el select
 */
export const getPaymentMethodOptions = (
  paymentMethods: PaymentMethod[] | undefined,
): Array<{ value: string; label: string }> => {
  if (!paymentMethods) return [];

  return paymentMethods.map(paymentMethod => ({
    value: paymentMethod.id,
    label: getPaymentMethodLabel(paymentMethod),
  }));
};

