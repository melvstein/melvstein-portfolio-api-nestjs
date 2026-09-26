import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto.js';
import { UpdateRoleDto } from '../dto/update-role.dto.js';
import { ApiResponse } from '../../../common/response/api.response.js';
import { ApiException } from '../../../common/exception/api.exception.js';
import { ResponseCode } from '../../../common/constant/response-code.js';
import { isUniqueViolation } from '../../../shared/utils/error.util.js';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RoleRepository } from '../repository/role.repository.js';
import { RoleMapper } from '../mapper/role.mapper.js';
import { UserDetails } from 'src/modules/user/type/user-details.type.js';

@Injectable()
export class RoleService {
  constructor(
    @InjectPinoLogger(RoleService.name)
    private readonly logger: PinoLogger,
    private readonly roleRepository: RoleRepository,
  ) {}

  async create(request: CreateRoleDto, authenticatedUser: UserDetails) {
    const methodName = this.create.name;

    console.log('authenticatedUser---', authenticatedUser);

    try {
      const [createdRole] = await this.roleRepository.create(request);

      if (!createdRole) {
        this.logger.error({
          method: methodName,
          message: 'Failed to create role',
          request,
        });

        throw new ApiException(
          ResponseCode.INTERNAL_SERVER_ERROR,
          'Failed to create role',
        );
      }

      return ApiResponse.success(
        RoleMapper.toDto(createdRole),
        'Role created successfully',
      );
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        this.logger.error({
          method: methodName,
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

  async findAll() {
    const roles = await this.roleRepository.findAll();

    return ApiResponse.success(
      roles.map(RoleMapper.toDto),
      'Roles retrieved successfully',
    );
  }

  async findOne(id: string) {
    const methodName = this.findOne.name;
    const [role] = await this.roleRepository.findById(id);

    if (!role) {
      this.logger.error({
        method: methodName,
        message: 'Role not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
    }

    return ApiResponse.success(
      RoleMapper.toDto(role),
      'Role retrieved successfully',
    );
  }

  async update(id: string, request: UpdateRoleDto) {
    const methodName = this.update.name;

    try {
      const [role] = await this.roleRepository.findById(id);

      if (!role) {
        this.logger.error({
          method: methodName,
          message: 'Role not found',
          paramId: id,
          request,
        });

        throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
      }

      const [updatedRole] = await this.roleRepository.update(id, request);

      return ApiResponse.success(
        RoleMapper.toDto(updatedRole),
        'Role updated successfully',
      );
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        this.logger.error({
          method: methodName,
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

  async remove(id: string) {
    const methodName = this.remove.name;
    const [deletedRole] = await this.roleRepository.delete(id);

    if (!deletedRole) {
      this.logger.error({
        method: methodName,
        message: 'Role not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
    }

    return ApiResponse.success(
      RoleMapper.toDto(deletedRole),
      'Role removed successfully',
    );
  }
}
