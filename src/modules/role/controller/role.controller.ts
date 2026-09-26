import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard.js';
import { RoleService } from '../service/role.service.js';
import { CreateRoleDto } from '../dto/create-role.dto.js';
import { UpdateRoleDto } from '../dto/update-role.dto.js';
import { AppParseUUIDPipe } from '../../../common/pipe/app-parse-uuid.pipe.js';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() request: CreateRoleDto) {
    return await this.roleService.create(request);
  }

  @Get()
  async findAll() {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', AppParseUUIDPipe) id: string) {
    return await this.roleService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', AppParseUUIDPipe) id: string,
    @Body() request: UpdateRoleDto,
  ) {
    return await this.roleService.update(id, request);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', AppParseUUIDPipe) id: string) {
    return await this.roleService.remove(id);
  }
}
