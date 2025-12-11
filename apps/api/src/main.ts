/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response, NextFunction } from 'express';

async function bootstrap(): Promise<void> {
  const server = express();

  server.use(express.json({ limit: '100mb' }));
  server.use(express.urlencoded({ limit: '100mb', extended: true }));

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      req.body = {};
    }
    next();
  });

  app.setGlobalPrefix('api');

  const isProduction = process.env.NODE_ENV === 'production';

  const origins = [
    'https://riffy.website',
    'https://admin.riffy.website',
    'https://rifasluxor.online',
    'https://admin.rifasluxor.online',
  ];

  app.enableCors({
    origin: isProduction
      ? origins
      : (
          _origin: string | undefined,
          callback: (err: Error | null, allow?: boolean) => void,
        ): void => {
          callback(null, true);
        },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'On-behalf-of',
      'x-sg-elas-acl',
      'X-Requested-With',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  await app.listen(4000);
}
bootstrap();
