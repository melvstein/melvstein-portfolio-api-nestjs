import { Module } from '@nestjs/common';
import { UserProfilesService } from './service/user-profiles.service';
import { UserProfilesController } from './controller/user-profiles.controller';

@Module({
  providers: [UserProfilesService],
  controllers: [UserProfilesController]
})
export class UserProfilesModule {}
