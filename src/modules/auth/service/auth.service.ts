import { UserService } from './../../user/service/user.service.js';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from '../../../common/response/api.response.js';
import { User } from 'src/modules/user/type/user.type.js';
import type { JwtPayload } from '../interface/jwt-payload.interface.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const [user] = await this.userService.findByUsername(username);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = { sub: user.id, username: user.username };

    const data = {
      accessToken: await this.jwtService.signAsync(payload),
    };

    return ApiResponse.success(data);
  }
}
