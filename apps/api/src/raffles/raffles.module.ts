import { Module } from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { RafflesResolver } from './raffles.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanUsageModule } from '../plan-usage/plan-usage.module';

@Module({
  imports: [PrismaModule, PlanUsageModule],
  providers: [RafflesResolver, RafflesService],
})
export class RafflesModule {}
