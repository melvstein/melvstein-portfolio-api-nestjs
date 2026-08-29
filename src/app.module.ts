import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './core/auth/auth.module.js';
import { UserModule } from './modules/user/user.module.js';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { UserProfileController } from './modules/controller/user-profile/user-profile.controller';
import { UserModule } from './modules/user/user.module';
import { UsersModule } from './modules/users/users.module';
import { UserProfilesModule } from './modules/user-profiles/user-profiles.module';

@Module({
  imports: [AuthModule, UserModule, UserProfileModule, UsersModule, UserProfilesModule],
  controllers: [AppController, UserProfileController],
  providers: [AppService],
})
export class AppModule {}
