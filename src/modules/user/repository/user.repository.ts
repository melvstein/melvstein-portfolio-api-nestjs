import { Injectable } from '@nestjs/common';
import type { CreateUserDto } from '../dto/create-user.dto.js';
import type { UpdateUserDto } from '../dto/update-user.dto.js';
import type { UserStatusEnum } from '../enum/user-status.enum.js';
import { Roles, runtime, Users } from '../../../database/prisma/db.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUserDto) {
    const insertData: {
      role_id: string;
      email: string;
      username: string;
      password: string;
      status?: UserStatusEnum;
    } = {
      role_id: user.roleId,
      email: user.email,
      username: user.username,
      password: user.password,
    };

    if (user.status !== undefined) {
      insertData.status = user.status;
    }

    const query = Users.insert([insertData]).returning('id').build();
    const [createdUser] = await runtime.query(query);

    return await this.getUserDetailsById(createdUser.id);
  }

  async update(id: string, user: UpdateUserDto) {
    const updateData: {
      role_id?: string;
      email?: string;
      username?: string;
      password?: string;
      status?: UserStatusEnum;
    } = {};

    if (user.roleId !== undefined) {
      updateData.role_id = user.roleId;
    }

    if (user.email !== undefined) {
      updateData.email = user.email;
    }

    if (user.username !== undefined) {
      updateData.username = user.username;
    }

    if (user.password !== undefined) {
      updateData.password = user.password;
    }

    if (user.status !== undefined) {
      updateData.status = user.status;
    }

    const query = Users.update(updateData)
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id')
      .build();

    const [updatedUser] = await runtime.query(query);

    return await this.getUserDetailsById(updatedUser.id);
  }

  async delete(id: string) {
    const query = Users.delete()
      .where((f, fns) => fns.eq(f.id, id))
      .returning('id')
      .build();

    const [deletedUser] = await runtime.query(query);

    return await this.getUserDetailsById(deletedUser.id);
  }

  async findAll() {
    const query = Users.outerLeftJoin(Roles, (f, fns) =>
      fns.eq(f.users.role_id, f.roles.id),
    )
      .select((f) => ({
        id: f.users.id,
        email: f.users.email,
        username: f.users.username,
        password: f.users.password,
        status: f.users.status,
        roleId: f.users.role_id,
        roleName: f.roles.name,
        emailVerifiedAt: f.users.email_verified_at,
        lastLoginAt: f.users.last_login_at,
        passwordChangedAt: f.users.password_changed_at,
        failedLoginAttempts: f.users.failed_login_attempts,
        lockedUntil: f.users.locked_until,
        createdAt: f.users.created_at,
        updatedAt: f.users.updated_at,
      }))
      .build();

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

  async getUserDetailsById(id: string) {
    const query = Users.outerLeftJoin(Roles, (f, fns) =>
      fns.eq(f.users.role_id, f.roles.id),
    )
      .select((f) => ({
        id: f.users.id,
        email: f.users.email,
        username: f.users.username,
        password: f.users.password,
        status: f.users.status,
        roleId: f.users.role_id,
        roleName: f.roles.name,
        emailVerifiedAt: f.users.email_verified_at,
        lastLoginAt: f.users.last_login_at,
        passwordChangedAt: f.users.password_changed_at,
        failedLoginAttempts: f.users.failed_login_attempts,
        lockedUntil: f.users.locked_until,
        createdAt: f.users.created_at,
        updatedAt: f.users.updated_at,
      }))
      .where((f, fns) => fns.eq(f.users.id, id))
      .build();

    const [userDetails] = await runtime.query(query);

    return userDetails;
  }
}
