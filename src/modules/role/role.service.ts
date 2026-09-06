import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from './dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from './dto/update-role.request.dto.js';
import { ApiResponse } from '../../common/responses/ApiResponse.js';
import { db } from '../../database/prisma/db.js';
import { Role } from './types/role.type.js';
import { ApiException } from '../../common/exceptions/ApiException.js';
import { ResponseCode } from '../../common/constants/response-code.js';
import { isUniqueViolation } from '../../shared/utils/error.util.js';

@Injectable()
export class RoleService {
  async create(request: CreateRoleRequestDto): Promise<ApiResponse<Role>> {
    try {
      const role = await db.orm.public.Role.create({
        name: request.name,
        description: request.description,
      });

      return ApiResponse.success(role);
    } catch (error: unknown) {
      if (isUniqueViolation(error)) {
        throw new ApiException(ResponseCode.DUPLICATE_ENTRY);
      }

      throw new ApiException(ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<ApiResponse<Role[]>> {
    try {
      const roles = await db.orm.public.Role.all();
      return ApiResponse.success(roles);
    } catch (error: unknown) {
      console.log(error);
      throw new ApiException(ResponseCode.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, request: UpdateRoleRequestDto) {
    return `This action updates a #${id} role with name ${request.name}`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
