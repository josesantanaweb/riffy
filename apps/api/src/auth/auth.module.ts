import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { AuthResolver } from './auth.resolver';
import { AuthController } from './auth.controller';
@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    UsersService,
    PrismaService,
  ],
  exports: [JwtStrategy, PassportModule, JwtModule],
  controllers: [AuthController],
  imports: [
    ConfigModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
})
export class AuthModule {}
