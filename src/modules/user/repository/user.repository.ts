import { Injectable } from '@nestjs/common';
import { UserStatusEnum } from '../enum/user-status.enum.js';
import { Roles, runtime, Users } from '../../../database/prisma/db.js';
import { CreateUser } from '../type/create-user.type.js';
import { UpdateUser } from '../type/update-user.type.js';

@Injectable()
export class UserRepository {
  async create(user: CreateUser) {
    const insertData: {
      role_id: string;
      email: string;
      username: string;
      password: string;
      status: UserStatusEnum;
    } = {
      role_id: user.role_id,
      email: user.email,
      username: user.username,
      password: user.password,
      status: user.status,
    };

    const query = Users.insert([insertData]).returning('id').build();
    const [createdUser] = await runtime.query(query);

    return await this.getUserDetailsById(createdUser.id);
  }

  async update(id: string, user: UpdateUser) {
    const query = Users.update(user)
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
        status: f.users.status,
        roleId: f.users.role_id,
        role: f.roles.name,
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

  async getUserForAuthenticationByUsername(username: string) {
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
        role: f.roles.name,
      }))
      .where((f, fns) => fns.eq(f.users.username, username))
      .build();

    const [user] = await runtime.query(query);

    return user;
  }

  async getUserDetailsById(id: string) {
    const query = Users.outerLeftJoin(Roles, (f, fns) =>
      fns.eq(f.users.role_id, f.roles.id),
    )
      .select((f) => ({
        id: f.users.id,
        email: f.users.email,
        username: f.users.username,
        status: f.users.status,
        roleId: f.users.role_id,
        role: f.roles.name,
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

  async getUserDetailsByUsername(username: string) {
    const query = Users.outerLeftJoin(Roles, (f, fns) =>
      fns.eq(f.users.role_id, f.roles.id),
    )
      .select((f) => ({
        id: f.users.id,
        email: f.users.email,
        username: f.users.username,
        status: f.users.status,
        roleId: f.users.role_id,
        role: f.roles.name,
        emailVerifiedAt: f.users.email_verified_at,
        lastLoginAt: f.users.last_login_at,
        passwordChangedAt: f.users.password_changed_at,
        failedLoginAttempts: f.users.failed_login_attempts,
        lockedUntil: f.users.locked_until,
        createdAt: f.users.created_at,
        updatedAt: f.users.updated_at,
      }))
      .where((f, fns) => fns.eq(f.users.username, username))
      .build();

    const [userDetails] = await runtime.query(query);

    return userDetails;
  }
}
