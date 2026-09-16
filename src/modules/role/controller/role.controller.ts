import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../service/role.service.js';
import { CreateRoleDto } from '../dto/create-role.dto.js';
import { UpdateRoleDto } from '../dto/update-role.dto.js';
import { AppParseUUIDPipe } from '../../../common/pipe/app-parse-uuid.pipe.js';
import { Role } from '../type/role.type.js';
import { ApiResponse } from '../../../common/response/api.response.js';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() request: CreateRoleDto): Promise<ApiResponse<Role>> {
    return await this.roleService.create(request);
  }

  @Get()
  async findAll(): Promise<ApiResponse<Role[]>> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', AppParseUUIDPipe) id: string): Promise<ApiResponse<Role | null>> {
    return await this.roleService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', AppParseUUIDPipe) id: string,
    @Body() request: UpdateRoleDto,
  ): Promise<ApiResponse<Role | null>> {
    return await this.roleService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id', AppParseUUIDPipe) id: string): Promise<ApiResponse<Role>> {
    return await this.roleService.remove(id);
  }
}
