import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { type Request } from 'express';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard.js';
import { UserService } from '../service/user.service.js';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { RoleEnum } from '../../../modules/role/enum/role.enum.js';
import { Roles } from '../../../modules/role/decorator/roles.decorator.js';
import { RoleGuard } from '../../role/guard/role.guard.js';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  create(@Req() request: Request) {
    return this.userService.create(request.body as CreateUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  update(@Param('id') id: string, @Body() request: UpdateUserDto) {
    return this.userService.update(id, request);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
