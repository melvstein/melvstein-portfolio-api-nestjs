import { Module } from '@nestjs/common';
import { UserProfilesService } from './service/user-profiles.service.js';
import { UserProfilesController } from './controller/user-profiles.controller.js';

@Module({
  providers: [UserProfilesService],
  controllers: [UserProfilesController],
})
export class UserProfilesModule {}
