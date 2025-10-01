import { PlanType } from '@riffy/types';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value);
export const createPlanSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),

  description: z
    .array(z.string().min(1, 'Cada descripción debe tener al menos 1 carácter'))
    .min(1, 'Debe agregar al menos una descripción')
    .max(10, 'Máximo 10 descripciones permitidas'),

  price: z
    .string()
    .min(1, 'El precio del plan es requerido')
    .refine(
      val => !isNaN(Number(val)) && Number(val) > 0,
      'Debe ser un número mayor a 0',
    ),

  maxRaffles: z
    .string()
    .optional()
    .refine(
      val => !val || (!isNaN(Number(val)) && Number(val) > 0),
      'Debe ser un número mayor a 0',
    ),

  maxTickets: z
    .string()
    .optional()
    .refine(
      val => !val || (!isNaN(Number(val)) && Number(val) > 0),
      'Debe ser un número mayor a 0',
    ),

  type: z
  .preprocess(emptyToUndefined, z.nativeEnum(PlanType).optional()),

});

export type FormData = z.infer<typeof createPlanSchema>;
