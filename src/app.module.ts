import {
  Module,
  DynamicModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { z } from 'zod';
import { Environment } from './common/enums/environment.enum.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import applicationConfig from './config/application.config.js';
import { AuthModule } from './core/auth/auth.module.js';
import { RoleModule } from './modules/role/role.module.js';
import { UserModule } from './modules/user/user.module.js';
import { AppLoggerModule } from './core/app-logger/app-logger.module.js';
import { createObserveModule } from '@nestjs/observe';
import { LoggerModule } from 'nestjs-pino';
import { LoggerMiddleware } from './common/middlewares/logger.middleware.js';
import { RoleController } from './modules/role/role.controller.js';

const validationSchema = z.object({
  APP_NAME: z.string().trim().min(1, 'APP_NAME is required'),
  NODE_ENV: z.enum(Environment),
  PORT: z.coerce.number(),
});

const imports: DynamicModule[] = [];

export const { ObserveModule, ObserveInstrument } = createObserveModule();

if (process.env.OBSERVE_ENABLED === 'true') {
  const { ObserveModule } = createObserveModule();

  imports.push(
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY!,
      appSecret: process.env.OBSERVE_APP_SECRET!,
      serviceId: 'melvstein-portfolio-api',
    }),
  );
}

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      envFilePath:
        '.env' + (process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''),
      isGlobal: true,
      load: [applicationConfig, databaseConfig],
      expandVariables: true,
      // cache: true,
    }),

    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const fileEnabled = configService.get<string>(
          'LOGGER_FILE_ENABLED',
          'false',
        );

        const isFileEnabled = fileEnabled === 'true';

        const filePath = configService.get<string>(
          'LOGGER_FILE_PATH',
          'logs/app.log',
        );

        const fileErrorPath = configService.get<string>(
          'LOGGER_FILE_ERROR_PATH',
          'logs/error.log',
        );

        return {
          pinoHttp: {
            level: 'info',
            ...(isFileEnabled
              ? {
                  transport: {
                    targets: [
                      {
                        target: 'pino/file',
                        level: 'info',
                        options: {
                          destination: filePath,
                          mkdir: true,
                        },
                      },
                      {
                        target: 'pino/file',
                        level: 'error',
                        options: {
                          destination: fileErrorPath,
                          mkdir: true,
                        },
                      },
                    ],
                  },
                }
              : {
                  transport: {
                    target: 'pino-pretty',
                    options: {
                      colorize: true,
                      singleLine: true,
                      translateTime: 'yyyy-mm-dd HH:MM:ss',
                    },
                  },
                }),
          },
        };
      },
    }),

    ...imports,

    AuthModule,
    RoleModule,
    UserModule,
    AppLoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(RoleController);
  }
}
