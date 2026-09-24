import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto.js';
import type { UpdateUserDto } from '../dto/update-user.dto.js';
import { runtime, Users } from '../../../database/prisma/db.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUserDto) {
    const query = Users.insert([
      {
        role_id: user.roleId,
        email: user.email,
        username: user.username,
        password: user.password,
      },
    ])
      .returning(
        'id',
        'email',
        'username',
        'password',
        'status',
        'role_id',
        'email_verified_at',
        'last_login_at',
        'password_changed_at',
        'failed_login_attempts',
        'locked_until',
        'created_at',
        'updated_at',
      )
      .build();

    return await runtime.query(query);
  }

  async update(id: string, user: UpdateUserDto) {
    const query = Users.update(user)
      .where((f, fns) => fns.eq(f.id, id))
      .returning(
        'id',
        'email',
        'username',
        'password',
        'status',
        'role_id',
        'email_verified_at',
        'last_login_at',
        'password_changed_at',
        'failed_login_attempts',
        'locked_until',
        'created_at',
        'updated_at',
      )
      .build();

    return await runtime.query(query);
  }

  async delete(id: string) {
    const query = Users.delete()
      .where((f, fns) => fns.eq(f.id, id))
      .returning(
        'id',
        'email',
        'username',
        'password',
        'status',
        'role_id',
        'email_verified_at',
        'last_login_at',
        'password_changed_at',
        'failed_login_attempts',
        'locked_until',
        'created_at',
        'updated_at',
      )
      .build();

    return await runtime.query(query);
  }

  async findAll() {
    const query = Users.select(
      'id',
      'email',
      'username',
      'password',
      'status',
      'role_id',
      'email_verified_at',
      'last_login_at',
      'password_changed_at',
      'failed_login_attempts',
      'locked_until',
      'created_at',
      'updated_at',
    ).build();

    return await runtime.query(query);
  }

  async findById(id: string) {
    const query = Users.select(
      'id',
      'email',
      'username',
      'password',
      'status',
      'role_id',
      'email_verified_at',
      'last_login_at',
      'password_changed_at',
      'failed_login_attempts',
      'locked_until',
      'created_at',
      'updated_at',
    )
      .where((f, fns) => fns.eq(f.id, id))
      .build();

    return await runtime.query(query);
  }

  async findByUsername(username: string) {
    const query = Users.select(
      'id',
      'email',
      'username',
      'password',
      'status',
      'role_id',
      'email_verified_at',
      'last_login_at',
      'password_changed_at',
      'failed_login_attempts',
      'locked_until',
      'created_at',
      'updated_at',
    )
      .where((f, fns) => fns.eq(f.username, username))
      .build();

    return await runtime.query(query);
  }
}
