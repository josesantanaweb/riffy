import { registerEnumType } from '@nestjs/graphql';
import { PlanType } from '@prisma/client';

registerEnumType(PlanType, {
  name: 'PlanType',
  description: 'The status of the plan',
});
