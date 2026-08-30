import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service.js';
import { AuthController } from './controller/auth.controller.js';

@Module({
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
