import { Module } from '@nestjs/common';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { createGraphQLContext } from './common/utils/domain.utils';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { PurchasesModule } from './purchases/purchases.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RafflesModule } from './raffles/raffles.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { S3Module } from './s3/s3.module';
import { SeedsModule } from './seeds/seeds.module';
import './enums/role.enum';
import './enums/user-status.enum';
import './enums/raffle-status.enum';
import './enums/ticket-status.enum';
import './enums/payment-status.enum';
import './enums/payment-method-type.enum';

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
      context: createGraphQLContext,
    }),
    UsersModule,
    AuthModule,
    RafflesModule,
    TicketsModule,
    // Mail and Purchases
    MailModule,
    PurchasesModule,
    PaymentsModule,
    PaymentMethodsModule,
    S3Module,
    SeedsModule,
  ],
})
export class AppModule {}
