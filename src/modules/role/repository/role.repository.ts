import { Injectable } from '@nestjs/common';
import { db, runtime } from '../../../database/prisma/db.js';
import type { CreateRoleDto } from '../dto/create-role.dto.js';
import type { UpdateRoleDto } from '../dto/update-role.dto.js';

@Injectable()
export class RoleRepository {
  async create(role: CreateRoleDto) {
    const query = db.sql.public.roles
      .insert([role])
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async update(id: string, role: UpdateRoleDto) {
    const query = db.sql.public.roles
      .update(role)
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async delete(id: string) {
    const query = db.sql.public.roles
      .delete()
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findAll() {
    const query = db.sql.public.roles
      .select('id', 'name', 'description', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findById(id: string) {
    const query = db.sql.public.roles
      .select('id', 'name', 'description', 'created_at', 'updated_at')
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }

  async findByName(name: string) {
    const query = db.sql.public.roles
      .select('id', 'name', 'description', 'created_at', 'updated_at')
      .where((f, fns) => fns.eq(f.name, name))
      .build();

    return await runtime.query(query);
  }
}
