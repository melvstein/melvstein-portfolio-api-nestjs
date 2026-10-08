import { Injectable } from '@nestjs/common';
import { db } from '../../../database/prisma/db.js';
import { CreateUser } from '../type/create-user.type.js';
import { UpdateUser } from '../type/update-user.type.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUser) {
    const createdUser = await db.orm.public.User.create(user);
    return await this.getUserDetailsById(createdUser.id as string);
  }

  async update(id: string, user: UpdateUser) {
    return await db.orm.public.User.where({ id })
      .select(
        'id',
        'email',
        'username',
        'status',
        'emailVerifiedAt',
        'lastLoginAt',
        'passwordChangedAt',
        'failedLoginAttempts',
        'lockedUntil',
        'createdAt',
        'updatedAt',
      )
      .include('role')
      .update(user);
  }

  async delete(id: string) {
    return await db.orm.public.User.where({ id }).include('role').delete();
  }

  async findAll() {
    return await db.orm.public.User.select(
      'id',
      'email',
      'username',
      'status',
      'emailVerifiedAt',
      'lastLoginAt',
      'passwordChangedAt',
      'failedLoginAttempts',
      'lockedUntil',
      'createdAt',
      'updatedAt',
    )
      .include('role')
      .all();
  }

  async getUserForAuthenticationByUsername(username: string) {
    return await db.orm.public.User.where({ username }).include('role').first();
  }

  async getUserDetailsById(id: string) {
    return await db.orm.public.User.where({ id })
      .select(
        'id',
        'email',
        'username',
        'status',
        'emailVerifiedAt',
        'lastLoginAt',
        'passwordChangedAt',
        'failedLoginAttempts',
        'lockedUntil',
        'createdAt',
        'updatedAt',
      )
      .include('role')
      .first();
  }

  async getUserDetailsByUsername(username: string) {
    return await db.orm.public.User.where({ username })
      .select(
        'id',
        'email',
        'username',
        'status',
        'emailVerifiedAt',
        'lastLoginAt',
        'passwordChangedAt',
        'failedLoginAttempts',
        'lockedUntil',
        'createdAt',
        'updatedAt',
      )
      .include('role')
      .first();
  }
}
