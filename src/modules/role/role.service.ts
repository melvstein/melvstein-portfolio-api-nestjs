import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from './dto/update-role.request.dto.js';
import { ApiResponse } from '../../common/responses/api.response.js';
import { db } from '../../database/prisma/db.js';
import { Role } from './types/role.type.js';
import { ApiException } from '../../common/exceptions/api.exception.js';
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

  async findOne(id: string): Promise<ApiResponse<Role | null>> {
    const methodName = this.findOne.name;

    try {
      const role = await db.orm.public.Role.where({ id }).first();

      if (!role) {
        return new ApiResponse(ResponseCode.NOT_FOUND, 'Role not found');
      }

      const response = ApiResponse.success(role, 'Role retrieved successfully');

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

      throw new ApiException(
        ResponseCode.INTERNAL_SERVER_ERROR,
        'An unexpected error occurred',
      );
    }
  }

  update(id: string, request: UpdateRoleRequestDto) {
    return `This action updates a #${id} role with name ${request.name}`;
  }

  async remove(id: string): Promise<ApiResponse<Role>> {
    const methodName = this.remove.name;

    try {
      const deletedRole = await db.orm.public.Role.where({ id }).delete();

      if (!deletedRole) {
        return new ApiResponse(ResponseCode.NOT_FOUND, 'Role not found');
      }

      const response = ApiResponse.success(
        deletedRole,
        'Role removed successfully',
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

      throw new ApiException(
        ResponseCode.INTERNAL_SERVER_ERROR,
        'An unexpected error occurred',
      );
    }
  }
}
