import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/service/user.service.js';
import type { JwtPayload } from '../interface/jwt-payload.interface.js';
import { ApiException } from '../../../common/exception/api.exception.js';
import { ResponseCode } from '../../../common/constant/response-code.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.getUserDetailsById(payload.sub);

    if (!user) {
      throw new ApiException(ResponseCode.NOT_FOUND, 'User not found');
    }

    return user;
  }
}
