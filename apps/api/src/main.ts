/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response, NextFunction } from 'express';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  try {
    const server = express();

    const isProduction = process.env.NODE_ENV === 'production';
    logger.log(`isProduction: ${isProduction}`);

    const productionOrigins = [
      'https://riffy.website',
      'https://admin.riffy.website',
      'https://rifasluxor.online',
      'https://admin.rifasluxor.online',
    ];

    server.use((req: Request, res: Response, next: NextFunction) => {
      const origin = req.headers.origin;
      logger.log(
        `[CORS] ${req.method} ${req.path} - Origin: ${origin || 'none'}`,
      );

      // Configurar CORS headers
      if (isProduction) {
        if (origin && productionOrigins.includes(origin)) {
          res.setHeader('Access-Control-Allow-Origin', origin);
          logger.log(`[CORS] Set origin for production: ${origin}`);
        }
      } else {
        // En desarrollo, permitir todos los orígenes
        // IMPORTANTE: Con credentials: true, debemos usar el origen específico, no '*'
        if (origin) {
          res.setHeader('Access-Control-Allow-Origin', origin);
          logger.log(`[CORS] Set origin for development: ${origin}`);
        } else {
          logger.log('[CORS] No origin header found');
        }
      }

      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization,On-behalf-of,x-sg-elas-acl,X-Requested-With',
      );

      // Manejar peticiones OPTIONS (preflight)
      if (req.method === 'OPTIONS') {
        logger.log(`[CORS] Preflight request handled for ${origin || 'none'}`);
        res.status(204).end();
        return;
      }

      next();
    });

    server.use(express.json({ limit: '100mb' }));
    server.use(express.urlencoded({ limit: '100mb', extended: true }));

    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.method === 'POST' && !req.body) {
        req.body = {};
      }
      next();
    });

    app.setGlobalPrefix('api');

    // También habilitar CORS en NestJS como respaldo
    app.enableCors({
      origin: isProduction ? productionOrigins : true,
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

    logger.log(
      `CORS configured: ${isProduction ? 'Production' : 'Development'} mode - ${
        isProduction
          ? `Allowed origins: ${productionOrigins.join(', ')}`
          : 'All origins allowed'
      }`,
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
      }),
    );

    await app.listen(4000);
    logger.log('🚀 Server is running on http://localhost:4000');
    logger.log('📡 GraphQL endpoint: http://localhost:4000/graphql');
  } catch (error) {
    logger.error('❌ Error starting server:', error);
    process.exit(1);
  }
}
bootstrap();
