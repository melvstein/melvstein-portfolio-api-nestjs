import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN', '60s') as StringValue,
        },
      }),
    }),
  ],
})
export class AuthModule {}
