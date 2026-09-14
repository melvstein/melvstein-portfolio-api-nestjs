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

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() request: CreateRoleDto) {
    return this.roleService.create(request);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', AppParseUUIDPipe) id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', AppParseUUIDPipe) id: string,
    @Body() request: UpdateRoleDto,
  ) {
    return this.roleService.update(id, request);
  }

  @Delete(':id')
  remove(@Param('id', AppParseUUIDPipe) id: string) {
    return this.roleService.remove(id);
  }
}
