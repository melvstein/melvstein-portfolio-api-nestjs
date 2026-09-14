import { Module } from '@nestjs/common';
import { UserService } from './service/user.service.js';
import { UserController } from './controller/user.controller.js';
import { UserRepository } from './repository/user.repository.js';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
