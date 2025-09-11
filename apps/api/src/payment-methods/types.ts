import { Prisma } from '@prisma/client';

export type PaymentMethodCreateData = Omit<
  Prisma.PaymentMethodCreateInput,
  'owner'
> & {
  ownerId: string;
};

export type PaymentMethodUpdateData = Omit<
  Prisma.PaymentMethodUpdateInput,
  'owner'
> & {
  ownerId?: string;
};
