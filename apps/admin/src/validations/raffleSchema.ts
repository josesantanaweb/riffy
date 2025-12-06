import { z } from 'zod';

export const createRaffleSchema = z.object({
  title: z
    .string()
    .min(1, 'El título es requerido')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),

  drawDate: z.date().min(new Date(), 'La fecha del sorteo debe ser futura').optional(),

  price: z
    .string()
    .min(1, 'El precio del boleto es requerido')
    .refine(
      val => !isNaN(Number(val)) && Number(val) > 0,
      'Debe ser un número mayor a 0',
    ),

  totalTickets: z
    .string()
    .min(1, 'La cantidad de boletos es requerida')
    .refine(
      val => !isNaN(Number(val)) && Number(val) > 0,
      'Debe ser un número mayor a 0',
    ),

  status: z.string().optional(),

  banner: z.string().optional(),
  bannerFile: z.instanceof(File).optional().nullable(),

  showDate: z.boolean().optional(),
  showProgress: z.boolean().optional(),
  minTickets: z
    .string()
    .optional()
    .refine(
      val => !val || (!isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 3),
      'El mínimo de boletos debe estar entre 1 y 3',
    ),
});

export type FormData = z.infer<typeof createRaffleSchema>;
