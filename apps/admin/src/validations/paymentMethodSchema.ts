import { z } from 'zod';
import { PaymentMethodType } from '@riffy/types';

export const paymentMethodSchema = z.object({
  type: z.nativeEnum(PaymentMethodType),

  bankName: z.string().optional(),
  phoneNumber: z.string().optional(),
  nationalId: z.string().optional(),

  binanceId: z.string().optional(),

  paypalEmail: z.string().email().optional().or(z.literal('')),
}).superRefine((data, ctx) => {

  if (!data.type) return;

  if (data.type === PaymentMethodType.PAGO_MOVIL) {
    if (!data.bankName || data.bankName.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nombre del banco es requerido para Pago Móvil",
        path: ['bankName'],
      });
    }
    if (!data.phoneNumber || data.phoneNumber.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Número de teléfono es requerido para Pago Móvil",
        path: ['phoneNumber'],
      });
    }
    if (!data.nationalId || data.nationalId.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cédula es requerida para Pago Móvil",
        path: ['nationalId'],
      });
    }
  }

  if (data.type === PaymentMethodType.BINANCE_PAY) {
    if (!data.binanceId || data.binanceId.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Binance ID es requerido para Binance Pay",
        path: ['binanceId'],
      });
    }
  }

  if (data.type === PaymentMethodType.PAYPAL) {
    if (!data.paypalEmail || data.paypalEmail.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email de PayPal es requerido",
        path: ['paypalEmail'],
      });
    }
  }
});

export type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;
