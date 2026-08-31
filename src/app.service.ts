import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import applicationConfig, {
  type ApplicationConfig,
} from './config/application.config.js';
import databaseConfig, {
  type DatabaseConfig,
} from './config/database.config.js';

@Injectable()
export class AppService {
  constructor(
    @Inject(applicationConfig.KEY)
    private readonly appConfig: ApplicationConfig,

    @Inject(databaseConfig.KEY)
    private readonly dbConfig: DatabaseConfig,
  ) {}

  getHello(): string {
    return this.appConfig.name;
  }
}
