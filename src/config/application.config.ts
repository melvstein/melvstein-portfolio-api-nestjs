import { registerAs } from '@nestjs/config';
import { Environment } from '../common/enums/environment.enum.js';

export interface ApplicationConfig {
  environment: string;
  name: string;
  port: number;
}

export default registerAs('application', (): ApplicationConfig => ({
  environment: process.env.NODE_ENV || Environment.DEVELOPMENT,
  name: process.env.APP_NAME || 'melvstein-portfolio-api-nestjs1234',
  port: parseInt(process.env.PORT ?? '3000', 10) || 3000,
}));
