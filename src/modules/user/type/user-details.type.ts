import { Roles, Users } from '../../../database/prisma/db';
import type { ResultType } from '@prisma/orm-postgres/components/runtime';

export const userDetailsQuery = Users.outerLeftJoin(Roles, (f, fns) =>
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

export type UserDetails = ResultType<typeof userDetailsQuery>;