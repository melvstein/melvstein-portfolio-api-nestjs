import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RoleEnum } from '../enum/role.enum.js';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard.js';
import { RoleService } from '../service/role.service.js';
import { CreateRoleDto } from '../dto/create-role.dto.js';
import { UpdateRoleDto } from '../dto/update-role.dto.js';
import { AppParseUUIDPipe } from '../../../common/pipe/app-parse-uuid.pipe.js';
import { type Request } from 'express';
import { Roles } from '../decorator/roles.decorator.js';
import { RoleGuard } from '../guard/role.guard.js';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  async create(@Req() request: Request) {
    return await this.roleService.create(request.body as CreateRoleDto);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', AppParseUUIDPipe) id: string) {
    return await this.roleService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  async update(
    @Param('id', AppParseUUIDPipe) id: string,
    @Body() request: UpdateRoleDto,
  ) {
    return await this.roleService.update(id, request);
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(RoleEnum.SUPERADMIN, RoleEnum.ADMIN)
  @Delete(':id')
  async remove(@Param('id', AppParseUUIDPipe) id: string) {
    return await this.roleService.remove(id);
  }
}
