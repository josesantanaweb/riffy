import { Module } from '@nestjs/common';
import { RafflesService } from './raffles.service';
import { RafflesResolver } from './raffles.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [RafflesResolver, RafflesService, PrismaService],
})
export class RafflesModule {}
