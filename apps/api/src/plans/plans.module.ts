import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansResolver } from './plans.resolver';
import { PrismaService } from '../prisma/prisma.service';
import '../enums/plan-type.enum';

@Module({
  providers: [PlansResolver, PlansService, PrismaService],
})
export class PlansModule {}
