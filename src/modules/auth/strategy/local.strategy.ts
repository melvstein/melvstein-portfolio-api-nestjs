import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../service/auth.service.js';
import { ApiException } from '../../../common/exception/api.exception.js';
import { ResponseCode } from '../../../common/constant/response-code.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new ApiException(
        ResponseCode.UNAUTHORIZED,
        'Invalid username or password',
      );
    }

    return user;
  }
}
