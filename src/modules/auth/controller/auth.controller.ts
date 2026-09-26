import {
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard.js';
import { AuthService } from '../service/auth.service.js';
import { type Request } from 'express';
import { User } from 'src/modules/user/type/user.type.js';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() request: Request) {
    return await this.authService.login(request.user as User);
  }
}
