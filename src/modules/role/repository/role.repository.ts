import { Injectable } from '@nestjs/common';
import { Roles, runtime } from '../../../database/prisma/db.js';
import type { CreateRoleDto } from '../dto/create-role.dto.js';
import type { UpdateRoleDto } from '../dto/update-role.dto.js';

@Injectable()
export class RoleRepository {
  async create(role: CreateRoleDto) {
    const query = Roles.insert([role])
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async update(id: string, role: UpdateRoleDto) {
    const query = Roles.update(role)
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async delete(id: string) {
    const query = Roles.delete()
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findAll() {
    const query = Roles.select(
      'id',
      'name',
      'description',
      'created_at',
      'updated_at',
    ).build();

    return await runtime.query(query);
  }

  async findById(id: string) {
    const query = Roles.select(
      'id',
      'name',
      'description',
      'created_at',
      'updated_at',
    )
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }
}
