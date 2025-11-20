import { Module } from '@nestjs/common';
import { BingosService } from './bingos.service';
import { BingosResolver } from './bingos.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanUsageModule } from '../plan-usage/plan-usage.module';

@Module({
  imports: [PrismaModule, PlanUsageModule],
  providers: [BingosResolver, BingosService],
})
export class BingosModule {}
