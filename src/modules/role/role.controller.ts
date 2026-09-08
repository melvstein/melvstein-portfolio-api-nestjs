import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RoleService } from './role.service.js';
import { CreateRoleRequestDto } from './dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from './dto/update-role.request.dto.js';
import { AppParseUUIDPipe } from '../../common/pipes/app-parse-uuid.pipe.js';
import { ResponseCode } from '../../common/constants/response-code.js';

@Controller('roles')
export class RoleController {
  constructor(
    @InjectPinoLogger(RoleController.name)
    private readonly logger: PinoLogger,
    private readonly roleService: RoleService,
  ) {}

  @Post()
  create(@Body() request: CreateRoleRequestDto) {
    this.logger.info({
      message: 'melvstein24',
      request,
    });
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
  async remove(
    @Param('id', AppParseUUIDPipe) id: string,
    @Response() response,
  ): Promise<Response> {
    const result = await this.roleService.remove(id);

    const responseCode =
      ResponseCode.find(result.getCode()) ?? ResponseCode.INTERNAL_SERVER_ERROR;

    return response.status(responseCode.getHttpStatus()).json(result);
  }
}
