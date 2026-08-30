import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './core/auth/auth.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { UserProfilesModule } from './modules/user-profiles/user-profiles.module.js';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config.js';
import applicationConfig from './config/application.config.js';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    UserProfilesModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
      load: [applicationConfig, databaseConfig],
      expandVariables: true,
      // cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
