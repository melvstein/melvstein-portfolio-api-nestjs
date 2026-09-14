import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service.js';
import { AuthController } from './controller/auth.controller.js';
import { UserModule } from '../user/user.module.js';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule],
})
export class AuthModule {}
