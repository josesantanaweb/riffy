import { Module } from '@nestjs/common';
import { PlanUsageService } from './plan-usage.service';
import { PlanUsageResolver } from './plan-usage.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PlanUsageService, PlanUsageResolver],
  exports: [PlanUsageService],
})
export class PlanUsageModule {}
