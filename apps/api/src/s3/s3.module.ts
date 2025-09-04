import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { S3Resolver } from './s3.resolver';
import { S3Controller } from './s3.controller';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024,
        files: 1,
      },
    }),
  ],
  providers: [S3Service, S3Resolver],
  controllers: [S3Controller],
  exports: [S3Service],
})
export class S3Module {}
