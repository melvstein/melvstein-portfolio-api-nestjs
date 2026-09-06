import { Injectable } from '@nestjs/common';
import { CreateRoleRequestDto } from '../dto/create-role.request.dto.js';
import { UpdateRoleRequestDto } from '../dto/update-role.request.dto.js';
import { ApiResponse } from 'src/common/ApiResponse.js';
import { db } from '../../../database/prisma/db.js';

@Injectable()
export class RolesService {
  create(request: CreateRoleRequestDto) {
    return db.orm.public.Role.create({
      name: request.name,
      description: request.description,
    });
  }

  findAll() {
    return db.orm.public.Role.all();
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
