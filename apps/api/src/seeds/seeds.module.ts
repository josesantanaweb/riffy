import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsResolver } from './seeds.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [SeedsResolver, SeedsService, PrismaService],
})
export class SeedsModule {}
