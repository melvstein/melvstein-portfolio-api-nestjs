import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto.js';
import { UpdateRoleDto } from '../dto/update-role.dto.js';
import { ApiResponse } from '../../../common/response/api.response.js';
import { Role } from '../type/role.type.js';
import { ApiException } from '../../../common/exception/api.exception.js';
import { ResponseCode } from '../../../common/constant/response-code.js';
import { isUniqueViolation } from '../../../shared/utils/error.util.js';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RoleRepository } from '../repository/role.repository.js';

@Injectable()
export class RoleService {
  constructor(
    @InjectPinoLogger(RoleService.name)
    private readonly logger: PinoLogger,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(request: CreateRoleDto): Promise<ApiResponse<Role>> {
    const methodName = this.create.name;

    try {
      const role = await this.roleRepository.create(request);

      return ApiResponse.success(role, 'Role created successfully');
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

      throw error;
    }
  }

  async findAll(): Promise<ApiResponse<Role[]>> {
    const roles = await this.roleRepository.findAll();
    return ApiResponse.success(roles, 'Roles retrieved successfully');
  }

  async findOne(id: string): Promise<ApiResponse<Role | null>> {
    const methodName = this.findOne.name;
    const role = await this.roleRepository.findById(id);

    if (!role) {
      this.logger.error({
        methodName,
        message: 'Role not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
    }

    return ApiResponse.success(role, 'Role retrieved successfully');
  }

  async update(
    id: string,
    request: UpdateRoleDto,
  ): Promise<ApiResponse<Role | null>> {
    const methodName = this.update.name;

    try {
      const role = await this.roleRepository.findById(id);

      if (!role) {
        this.logger.error({
          methodName,
          message: 'Role not found',
          paramId: id,
          request,
        });

        throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
      }

      const updatedRole = await this.roleRepository.update(id, request);

      return ApiResponse.success(updatedRole, 'Role updated successfully');
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

      throw error;
    }
  }

  async remove(id: string): Promise<ApiResponse<Role>> {
    const methodName = this.remove.name;
    const deletedRole = await this.roleRepository.delete(id);

    if (!deletedRole) {
      this.logger.error({
        methodName,
        message: 'Role not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
    }

    return ApiResponse.success(deletedRole, 'Role removed successfully');
  }
}
