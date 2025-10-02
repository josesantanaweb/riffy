import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UsersResolver, UsersService, PrismaService, SubscriptionsService],
})
export class UsersModule {}
