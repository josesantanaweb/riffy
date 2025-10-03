import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanUsageModule } from '../plan-usage/plan-usage.module';

@Module({
  imports: [PrismaModule, PlanUsageModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
