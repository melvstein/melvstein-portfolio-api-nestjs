import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  console.log(`Application is running on: http://localhost:${port}`, configService);

    next step is to add Zod validation for app module

  await app.listen(port);
}
bootstrap();
