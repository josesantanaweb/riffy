import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SubscriptionsResolver, SubscriptionsService, PrismaService],
})
export class SubscriptionsModule {}
