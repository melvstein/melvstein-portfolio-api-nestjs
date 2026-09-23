import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto.js';
import { runtime, users } from '../../../database/prisma/db.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUserDto) {
    const query = users.insert([user]).build();
    return await runtime.query(query);
  }

  async update(id: string, user: CreateUserDto) {
    const query = users
      .update(user)
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }

  async delete(id: string) {
    const query = users
      .delete()
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }

  async findAll() {
    const query = users
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .build();

    return await runtime.query(query);
  }

  async findById(id: string) {
    const query = users
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }

  async findByUsername(username: string) {
    const query = users
      .select('id', 'username', 'email', 'created_at', 'updated_at')
      .where((f, fns) => fns.eq(f.username, username))
      .build();

    return await runtime.query(query);
  }
}
