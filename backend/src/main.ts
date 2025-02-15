import 'reflect-metadata';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './libs/logger';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { INestApplication } from '@nestjs/common';
import { sleep } from './libs/utils';
import morgan from 'morgan';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import multiPart from '@fastify/multipart';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './modules/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { WsAdapter } from './modules/ws/ws.adapter';
import { CorsMiddleware } from './cors/cors.middlewares';
import fastifyCookie from '@fastify/cookie';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';
import { PageMetaDto } from '@dto/page/dto/page-meta.dto';
import { join } from 'path';

function initializeSwaggerDocumentation(
  app: NestFastifyApplication,
  swaggerPath: string,
) {
  const swaggerDocs = new DocumentBuilder()
    .setTitle('PBR test App')
    .setDescription('The PBR test API description')
    .setVersion('1.0')
    .addTag('PBR test App')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerDocs, {
    extraModels: [PageMetaDto],
  });

  if (!existsSync('./public')) {
    mkdirSync('./public');
  }
  writeFileSync('./public/swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup(swaggerPath, app, document);
}

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useStaticAssets({ root: join(__dirname, '..', 'public') });

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('gamma.back')
    .setDescription('Async Api gamma.back')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    // .addSecurity('user-password', { type: 'userPassword' })
    .addServer('gamma-ws', {
      url: 'ws://localhost:8082',
      protocol: 'socket.io',
    })
    .build();

  const asyncapiDocument = AsyncApiModule.createDocument(app, asyncApiOptions);

  await AsyncApiModule.setup('/api/asyncapi', app, asyncapiDocument);

  const config = app.get(ConfigService);
  const redis = app.get(RedisService);
  const jwt = app.get(JwtService);

  const globalPrefix = '/api';
  const swaggerPath = `${globalPrefix}/swagger`;

  app.useLogger(logger);

  app.use(cookieParser());
  app.use(morgan('tiny'));
  await app.register(multiPart);

  const httpAdapterHost = app.get(HttpAdapterHost);

  await app.register(fastifyCookie, {
    secret: 'my-secret',
  });
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api');

  app.use(cookieParser());

  const corsOptions = {
    allowed_origins: JSON.parse(
      config.getOrThrow<string>('CORS_ALLOWED_ORIGINS'),
    ),
    allowed_methods: JSON.parse(
      config.getOrThrow<string>('CORS_ALLOWED_METHODS'),
    ),
    allowed_paths: JSON.parse(config.getOrThrow<string>('CORS_ALLOWED_PATHS')),
    credentials: config.getOrThrow<boolean>('CORS_CREDENTIALS'),
  };

  app.enableCors(
    process.env.NODE_ENV === 'productions'
      ? CorsMiddleware(corsOptions)
      : corsOptions,
  );

  app.useWebSocketAdapter(new WsAdapter(app, config, redis, jwt));

  process.on('SIGTERM', async () => await shutdown(app));
  process.on('SIGINT', async () => await shutdown(app));

  if (process.env.NODE_ENV !== 'production') {
    initializeSwaggerDocumentation(app, swaggerPath);
  }

  await app.listen({ port: +process.env.PORT, host: '0.0.0.0' });

  return app;
}

const shutdown = async (app: INestApplication) => {
  logger.log('Gracefull shutdown');
  try {
    await sleep(1 * 1000);
    await app.close();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

bootstrap()
  .then(() => logger.log(`Server started on port = ${process.env.PORT}`))
  .catch(logger.log);
