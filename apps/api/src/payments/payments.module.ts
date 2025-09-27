import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsResolver } from './payments.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Module({
  providers: [
    PaymentsResolver,
    PaymentsService,
    PrismaService,
    NotificationsService,
  ],
})
export class PaymentsModule {}
