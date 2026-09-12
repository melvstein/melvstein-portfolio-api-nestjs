import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { loggerConfig } from './config/logger.config.js';
import { NativeLogger } from 'nestjs-pino';
import { ResponseCode } from './common/constant/response-code.js';
import { ApiException } from './common/exception/api.exception.js';
import { AuthGuard } from './common/guard/auth.guard.js';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter.js';

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

  const logger = app.get(NativeLogger);
  app.useLogger(logger);

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalGuards(new AuthGuard());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        const firstError = errors[0];

        const message = firstError?.constraints
          ? Object.values(firstError.constraints)[0]
          : 'Validation failed';

        logger.error({
          methodName: bootstrap.name,
          errors,
        });

        return new ApiException(ResponseCode.BAD_REQUEST, message);
      },
    }),
  );

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
