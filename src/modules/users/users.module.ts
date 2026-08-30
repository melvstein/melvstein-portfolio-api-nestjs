import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service.js';
import { UsersController } from './controller/users.controller.js';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
