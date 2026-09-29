import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service.js';
import { AuthController } from './controller/auth.controller.js';
import { UserModule } from '../user/user.module.js';
import { LocalStrategy } from './strategy/local.strategy.js';
import { JwtStrategy } from './strategy/jwt.strategy.js';
import { JwtModule } from '@nestjs/jwt';
import type { StringValue } from 'ms';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: (process.env.JWT_EXPIRES_IN as StringValue) || '60s',
      },
    }),
  ],
})
export class AuthModule {}
