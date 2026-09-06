import { Module } from '@nestjs/common';
import { AuthModule } from './core/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { RolesModule } from './modules/roles/roles.module.js';
import { z } from 'zod';
import { Environment } from './common/enums/environment.enum.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UserProfilesModule } from './modules/user-profiles/user-profiles.module.js';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import applicationConfig from './config/application.config.js';

const validationSchema = z.object({
  APP_NAME: z.string().trim().min(1, 'APP_NAME is required'),
  NODE_ENV: z.enum(Environment),
  PORT: z.coerce.number(),
});

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
    AuthModule,
    UsersModule,
    UserProfilesModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
