/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ limit: '100mb', extended: true }));

  app.setGlobalPrefix('api');

  const isProduction = process.env.NODE_ENV === 'production';

  // Habilitar CORS tanto en desarrollo como en producción
  app.enableCors({
    origin: isProduction
      ? [
          'http://64.23.183.4:3000',
          'http://64.23.183.4:3001',
          'http://64.23.183.4',
        ]
      : (
          _origin: string | undefined,
          callback: (err: Error | null, allow?: boolean) => void,
        ) => {
          callback(null, true);
        },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'On-behalf-of',
      'x-sg-elas-acl',
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
