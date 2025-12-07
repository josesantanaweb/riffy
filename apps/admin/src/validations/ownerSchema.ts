import { z } from 'zod';
import { UserStatus } from '@riffy/types';

const emptyToUndefined = (value: unknown) => (value === '' ? undefined : value);

export const ownerSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('El email no es válido'),
  domain: z
    .string({ required_error: 'El dominio es requerido' })
    .min(2, 'El dominio debe tener al menos 2 caracteres'),
  password: z
    .preprocess(emptyToUndefined, z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .optional()
    ),
  brandColor: z
    .preprocess(emptyToUndefined, z
      .string()
      .regex(/^#?([0-9A-Fa-f]{3}){1,2}$/, 'Debe ser un color HEX válido')
      .optional(),
    ),
  whatsapp: z.preprocess(
    emptyToUndefined,
    z.string().min(1, 'Número inválido').optional(),
  ),
  instagram: z.preprocess(emptyToUndefined, z.string().optional()),
  tiktok: z.preprocess(emptyToUndefined, z.string().optional()),
  logo: z.preprocess(
    emptyToUndefined,
    z.string().optional(),
  ),
  isRoundedLogo: z.boolean().optional(),
  logoFile: z.instanceof(File).nullable().optional(),
  status: z
    .preprocess(emptyToUndefined, z.nativeEnum(UserStatus).optional()),
  planId: z.preprocess(emptyToUndefined, z.string().optional()),
});

export type FormData = z.infer<typeof ownerSchema>;
