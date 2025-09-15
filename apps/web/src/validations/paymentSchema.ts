import { z } from 'zod';

export const paymentSchema = z.object({
  buyerName: z.string().min(1, 'El nombre del comprador es requerido'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  nationalId: z.string().min(1, 'La cédula de identidad es requerida'),
  state: z.string().min(1, 'El estado es requerido'),
  email: z.string().email('El correo electrónico es inválido'),
  paymentMethod: z.string().min(1, 'El método de pago es requerido'),
  proofUrl: z.string().optional(),
  proofFile: z.instanceof(File, { message: 'Debe subir una imagen del comprobante de pago' }),
});

export type FormData = z.infer<typeof paymentSchema>;
