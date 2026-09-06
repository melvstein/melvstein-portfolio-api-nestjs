import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from '../dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from '../dto/update-role.request.dto.js';
import { ApiResponse } from 'src/common/ApiResponse.js';
import { db } from '../../../database/prisma/db.js';
import { Role } from '../interfaces/role.interface.js';

@Injectable()
export class RolesService {
  create(request: CreateRoleRequestDto): Promise<Role> {
    return db.orm.public.Role.create({
      name: request.name,
      description: request.description,
    }) as Promise<Role>;
  }

  findAll() {
    return null;
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
