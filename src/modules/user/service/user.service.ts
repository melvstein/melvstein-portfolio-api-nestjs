import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto.js';
import { UpdateUserDto } from '../dto/update-user.dto.js';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import * as bcrypt from 'bcrypt';
import { isUniqueViolation } from '../../../shared/utils/error.util.js';
import { UserRepository } from '../repository/user.repository.js';
import { ApiResponse } from '../../../common/response/api.response.js';
import { ApiException } from '../../../common/exception/api.exception.js';
import { ResponseCode } from '../../../common/constant/response-code.js';
import { RoleRepository } from '../../../modules/role/repository/role.repository.js';

@Injectable()
export class UserService {
  private readonly saltRounds = 12;

  constructor(
    @InjectPinoLogger(UserService.name)
    private readonly logger: PinoLogger,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
  ) {}

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }

  async create(request: CreateUserDto) {
    const methodName = this.create.name;

    request.password = await this.hashPassword(request.password);

    try {
      const [roleExists] = await this.roleRepository.findById(request.roleId);

      if (!roleExists) {
        this.logger.error({
          method: methodName,
          message: 'Role not found',
          request,
        });

        throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
      }

      const createdUser = await this.userRepository.create(request);

      if (!createdUser) {
        this.logger.error({
          method: methodName,
          message: 'Failed to create user',
          request,
        });

        throw new ApiException(
          ResponseCode.INTERNAL_SERVER_ERROR,
          'Failed to create user',
        );
      }

      return ApiResponse.success(createdUser, 'User created successfully');
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
          'User already exists',
        );
      }

      throw error;
    }
  }

  async findAll() {
    const users = await this.userRepository.findAll();

    return ApiResponse.success(users, 'Users retrieved successfully');
  }

  async findOne(id: string) {
    const methodName = this.findOne.name;

    const user = await this.userRepository.getUserDetailsById(id);

    if (!user) {
      this.logger.error({
        methodName,
        message: 'User not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'User not found');
    }

    return ApiResponse.success(user, 'User retrieved successfully');
  }

  async update(id: string, request: UpdateUserDto) {
    const methodName = this.update.name;

    try {
      if (request.roleId) {
        const [roleExists] = await this.roleRepository.findById(request.roleId);

        if (!roleExists) {
          this.logger.error({
            method: methodName,
            message: 'Role not found',
            request,
          });

          throw new ApiException(ResponseCode.NOT_FOUND, 'Role not found');
        }
      }

      const [user] = await this.userRepository.findById(id);

      if (!user) {
        this.logger.error({
          methodName,
          message: 'User not found',
          paramId: id,
          request,
        });

        throw new ApiException(ResponseCode.NOT_FOUND, 'User not found');
      }

      const updatedUser = await this.userRepository.update(id, request);

      return ApiResponse.success(updatedUser, 'User updated successfully');
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
          'User already exists',
        );
      }

      throw error;
    }
  }

  async remove(id: string) {
    const methodName = this.remove.name;
    const deletedUser = await this.userRepository.delete(id);

    if (!deletedUser) {
      this.logger.error({
        methodName,
        message: 'User not found',
        request: { id },
      });

      throw new ApiException(ResponseCode.NOT_FOUND, 'User not found');
    }

    return ApiResponse.success(deletedUser, 'User removed successfully');
  }
}
