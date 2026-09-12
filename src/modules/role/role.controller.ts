import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RoleService } from './role.service.js';
import { CreateRoleRequestDto } from './dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from './dto/update-role.request.dto.js';
import { AppParseUUIDPipe } from '../../common/pipe/app-parse-uuid.pipe.js';

@Controller('roles')
export class RoleController {
  constructor(
    @InjectPinoLogger(RoleController.name)
    private readonly logger: PinoLogger,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  create(@Body() request: CreateRoleRequestDto) {
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
    @Body() request: UpdateRoleRequestDto,
  ) {
    return this.roleService.update(id, request);
  }

  @Delete(':id')
  remove(@Param('id', AppParseUUIDPipe) id: string) {
    return this.roleService.remove(id);
  }
}
