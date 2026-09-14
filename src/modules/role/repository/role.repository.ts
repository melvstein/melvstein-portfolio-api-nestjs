import { Injectable } from '@nestjs/common';
import { db } from '../../../database/prisma/db.js';
import type { CreateRoleDto } from '../dto/create-role.dto.js';
import type { UpdateRoleDto } from '../dto/update-role.dto.js';

@Injectable()
export class RoleRepository {
  async create(role: CreateRoleDto) {
    return await db.orm.public.Role.create(role);
  }

  async update(id: string, role: UpdateRoleDto) {
    return await db.orm.public.Role.where({ id }).update(role);
  }

  async delete(id: string) {
    return await db.orm.public.Role.where({ id }).delete();
  }

  async findAll() {
    return await db.orm.public.Role.all();
  }

  async findById(id: string) {
    return await db.orm.public.Role.where({ id }).first();
  }
}
