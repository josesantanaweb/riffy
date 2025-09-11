import { registerEnumType } from '@nestjs/graphql';
import { PaymentMethodType } from '@prisma/client';

registerEnumType(PaymentMethodType, {
  name: 'PaymentMethodType',
  description: 'Tipos de métodos de pago disponibles',
});
