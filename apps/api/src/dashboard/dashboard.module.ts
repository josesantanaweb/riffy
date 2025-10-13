import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [DashboardResolver, DashboardService, PrismaService],
})
export class DashboardModule {}
