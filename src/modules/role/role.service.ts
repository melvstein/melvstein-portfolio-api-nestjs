import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from './dto/update-role.request.dto.js';
import { ApiResponse } from '../../common/responses/ApiResponse.js';
import { db } from '../../database/prisma/db.js';
import { Role } from './types/role.type.js';
import { ApiException } from '../../common/exceptions/ApiException.js';
import { ResponseCode } from '../../common/constants/response-code.js';
import { isUniqueViolation } from '../../shared/utils/error.util.js';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class RoleService {
  constructor(
    @InjectPinoLogger(RoleService.name)
    private readonly logger: PinoLogger,
  ) {}

  async create(request: CreateRoleRequestDto): Promise<ApiResponse<Role>> {
    const methodName = this.create.name;

    try {
      const role = await db.orm.public.Role.create({
        name: request.name,
        description: request.description,
      });

      const response = ApiResponse.success(role, 'Role created successfully');

      this.logger.info({
        methodName,
        request,
        response,
      });

      return response;
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        this.logger.error({
          methodName,
          message: 'Duplicate entry error',
          request,
          error,
        });

        throw new ApiException(
          ResponseCode.DUPLICATE_ENTRY,
          'Role name already exists',
        );
      }

      this.logger.error({
        methodName,
        message: 'Unexpected error',
        request,
        error: error,
      });

      throw new ApiException(
        ResponseCode.INTERNAL_SERVER_ERROR,
        'An unexpected error occurred',
      );
    }
  }

  async findAll(): Promise<ApiResponse<Role[]>> {
    const methodName = this.findAll.name;

    try {
      const roles = await db.orm.public.Role.all();
      const response = ApiResponse.success(
        roles,
        'Roles retrieved successfully',
      );

      this.logger.info({
        methodName,
        response,
      });

      return response;
    } catch (error: unknown) {
      this.logger.error({
        methodName,
        message: 'Unexpected error',
        error,
      });

      throw new ApiException(ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  update(id: string, request: UpdateRoleRequestDto) {
    return `This action updates a #${id} role with name ${request.name}`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
