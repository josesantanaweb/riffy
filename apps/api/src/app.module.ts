import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Request } from 'express';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BingosModule } from './bingos/bingos.module';
import { BoardsModule } from './boards/boards.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlansModule } from './plans/plans.module';
import { PlanUsageModule } from './plan-usage/plan-usage.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { S3Module } from './s3/s3.module';
import { SeedsModule } from './seeds/seeds.module';
import './enums/role.enum';
import './enums/user-status.enum';
import './enums/bingo-status.enum';
import './enums/board-status.enum';
import './enums/payment-status.enum';
import './enums/payment-method-type.enum';
import './enums/notification-status.enum';
import './enums/plan-type.enum';
import './enums/plan-usage-status.enum';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      introspection: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
      context: ({ req }: { req: Request }) => ({ req }),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    UsersModule,
    AuthModule,
    BingosModule,
    BoardsModule,
    PaymentsModule,
    PaymentMethodsModule,
    S3Module,
    SeedsModule,
    NotificationsModule,
    PlansModule,
    PlanUsageModule,
    DashboardModule,
  ],
})
export class AppModule {}
