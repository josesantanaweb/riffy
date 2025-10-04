import { registerEnumType } from '@nestjs/graphql';
import { PlanUsageStatus } from '@prisma/client';

registerEnumType(PlanUsageStatus, {
  name: 'PlanUsageStatus',
  description: 'The status of the plan usage',
});
