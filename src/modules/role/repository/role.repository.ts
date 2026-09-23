import { Injectable } from '@nestjs/common';
import { roles, runtime } from '../../../database/prisma/db.js';
import type { CreateRoleDto } from '../dto/create-role.dto.js';
import type { UpdateRoleDto } from '../dto/update-role.dto.js';

@Injectable()
export class RoleRepository {
  async create(role: CreateRoleDto) {
    const query = roles
      .insert([role])
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    const [createdRole] = await runtime.query(query);

    if (!createdRole) {
      throw new Error('Failed to create role');
    }

    return createdRole;
  }

  async update(id: string, role: UpdateRoleDto) {
    const query = roles
      .update(role)
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async delete(id: string) {
    const query = roles
      .delete()
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findAll() {
    const query = roles
      .select('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findById(id: string) {
    const query = roles
      .select('id', 'name', 'description', 'created_at', 'updated_at')
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }
}
