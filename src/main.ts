import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common';
import { loggerConfig } from './config/logger.config.js';
import { NativeLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: loggerConfig,
    instrument: ObserveInstrument,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('application.port', 3000);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useLogger(app.get(NativeLogger));

  console.log(
    `Application is running on: http://localhost:${port}`,
    configService,
  );

  await app.listen(port);
}

bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
  process.exit(1);
});
